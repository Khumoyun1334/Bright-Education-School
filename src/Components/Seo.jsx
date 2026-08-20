import { useEffect } from "react";

const setMeta = (selector, attribute, value) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    const [name, content] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) || [];
    if (name && content) element.setAttribute(name, content);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
};

const Seo = ({ title, description, path = "/", jsonLd }) => {
  const jsonLdValue = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
    const url = `${siteUrl}${path}`;
    const fullTitle = title.includes("Bright Education") ? title : `${title} — Bright Education`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", `${siteUrl}/bright-hero-classroom.png`);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", `${siteUrl}/bright-hero-classroom.png`);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    document.getElementById("page-json-ld")?.remove();
    if (jsonLdValue) {
      const script = document.createElement("script");
      script.id = "page-json-ld";
      script.type = "application/ld+json";
      script.textContent = jsonLdValue;
      document.head.appendChild(script);
    }
  }, [description, jsonLdValue, path, title]);

  return null;
};

export default Seo;
