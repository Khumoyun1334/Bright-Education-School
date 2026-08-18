import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useSitePreferences();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <button
      className={`back-to-top ${visible ? "back-to-top--visible" : ""}`}
      type="button"
      onClick={scrollToTop}
      aria-label={t("controls.backTop")}
      title={t("controls.backTop")}
      tabIndex={visible ? 0 : -1}
    >
      <FiArrowUp aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
