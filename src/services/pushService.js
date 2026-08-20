const publicVapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

const toApplicationServerKey = (value) => {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((character) => character.charCodeAt(0)));
};

export const isPushSupported = () => Boolean(
  window.isSecureContext
  && "serviceWorker" in navigator
  && "PushManager" in window
  && "Notification" in window
  && publicVapidKey,
);

const getRegistration = async (create = false) => {
  const current = await navigator.serviceWorker.getRegistration("/");
  if (current) {
    if (create) await current.update().catch(() => undefined);
    return current;
  }
  if (!create) return undefined;
  await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  return navigator.serviceWorker.ready;
};

export const getPushErrorMessage = (error) => {
  const message = String(error?.message || "");
  if (message === "push-denied") return "Brauzer bildirishnoma ruxsatini blokladi. Sozlamalardan ruxsat bering.";
  if (message === "push-cancelled") return "Ruxsat oynasi yopildi. Qayta urinib, “Allow” yoki “Ruxsat berish”ni bosing.";
  if (message === "push-not-supported") return "Bu manzil yoki brauzer push-bildirishnomani qo‘llamaydi. Saytni HTTPS orqali oching.";
  if (message.startsWith("push-save-failed:")) return message.slice("push-save-failed:".length).trim();
  if (error?.name === "AbortError") return "Brauzer push xizmatiga ulana olmadi. Internetni tekshirib, qayta urinib ko‘ring.";
  if (error?.name === "InvalidStateError") return "Service worker hali tayyor emas. Sahifani yangilab, qayta urinib ko‘ring.";
  if (error?.name === "NotAllowedError") return "Bildirishnoma ruxsati berilmadi. Brauzer sozlamalaridan ruxsat bering.";
  if (error?.name === "TypeError") return "Push public kaliti noto‘g‘ri. VAPID kalitlarini qayta yarating.";
  return "Bildirishnomani yoqib bo‘lmadi. Birozdan so‘ng qayta urinib ko‘ring.";
};

export const getPushStatus = async () => {
  if (!window.isSecureContext) return "insecure";
  if (!publicVapidKey) return "not-configured";
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "denied") return "denied";
  const registration = await getRegistration(false);
  const subscription = await registration?.pushManager.getSubscription();
  return subscription ? "subscribed" : "idle";
};

export const subscribeToNewsPush = async () => {
  if (!isPushSupported()) throw new Error("push-not-supported");
  const permission = await Notification.requestPermission();
  if (permission !== "granted") throw new Error(permission === "denied" ? "push-denied" : "push-cancelled");
  const registration = await getRegistration(true);
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: toApplicationServerKey(publicVapidKey),
    });
  }
  const response = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription: subscription.toJSON() }),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    await subscription.unsubscribe().catch(() => undefined);
    throw new Error(`push-save-failed:${payload.message || "Obunani serverda saqlab bo‘lmadi."}`);
  }
  await registration.showNotification("Bright Education School", { body: "Bildirishnomalar muvaffaqiyatli yoqildi!", icon: "/favicon.svg", tag: "bright-push-enabled", data: { url: "/#news" } }).catch(() => undefined);
  window.dispatchEvent(new Event("bright-push-change"));
  return true;
};

export const unsubscribeFromNewsPush = async () => {
  const registration = await getRegistration(false);
  const subscription = await registration?.pushManager.getSubscription();
  if (!subscription) return true;
  await fetch("/api/push/subscribe", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint: subscription.endpoint }),
  });
  await subscription.unsubscribe();
  window.dispatchEvent(new Event("bright-push-change"));
  return true;
};

export const sendNewsPush = async (news, accessToken) => {
  const response = await fetch("/api/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      title: news.title,
      body: news.description,
      url: `/news/${encodeURIComponent(news.id)}`,
      newsId: news.id,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "Push yuborilmadi");
  return payload;
};
