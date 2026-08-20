import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contactHandler from "./api/contact.js";
import mandateHandler from "./api/mandate.js";
import pushSubscribeHandler from "./api/push/subscribe.js";
import pushSendHandler from "./api/push/send.js";

const localApiPlugin = () => ({
  name: "bright-local-api",
  configureServer(server) {
    const handlers = new Map([
      ["/api/contact", contactHandler],
      ["/api/mandate", mandateHandler],
      ["/api/push/subscribe", pushSubscribeHandler],
      ["/api/push/send", pushSendHandler],
    ]);

    server.middlewares.use(async (request, response, next) => {
      const pathname = new URL(request.url, "http://localhost").pathname;
      const handler = handlers.get(pathname);
      if (!handler) return next();

      let body = "";
      for await (const chunk of request) {
        body += chunk;
        if (body.length > 100_000) {
          response.statusCode = 413;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify({ ok: false, message: "Request too large" }));
          return;
        }
      }
      request.body = body;

      const localResponse = {
        setHeader: (...args) => response.setHeader(...args),
        status(code) {
          response.statusCode = code;
          return this;
        },
        json(payload) {
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify(payload));
          return this;
        },
      };

      try {
        await handler(request, localResponse);
      } catch {
        if (!response.writableEnded) localResponse.status(500).json({ ok: false, message: "Local API error" });
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID;
  process.env.SUPABASE_URL = env.VITE_SUPABASE_URL;
  process.env.SUPABASE_SECRET_KEY = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.VITE_VAPID_PUBLIC_KEY = env.VITE_VAPID_PUBLIC_KEY;
  process.env.VAPID_PRIVATE_KEY = env.VAPID_PRIVATE_KEY;
  process.env.VAPID_SUBJECT = env.VAPID_SUBJECT;

  return {
    server: {
      host: "0.0.0.0",
    },
    plugins: [
      localApiPlugin(),
      react(),
      tailwindcss(),
    ],
  };
});
