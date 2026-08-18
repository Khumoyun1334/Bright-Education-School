import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelector = [
  ".section-heading",
  ".stat-card",
  ".news-card",
  ".course-card",
  ".benefit-card",
  ".team-card",
  ".result-card",
  ".rule-card",
  ".trust-proof__item",
  ".video-story",
  ".gallery-item",
].join(",");

const ScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = [...document.querySelectorAll(revealSelector)];

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("reveal-ready", "is-revealed"));
      return undefined;
    }

    elements.forEach((element, index) => {
      element.classList.add("reveal-ready");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default ScrollReveal;
