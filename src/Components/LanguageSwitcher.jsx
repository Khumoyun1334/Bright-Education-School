import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";

const languages = [
  { code: "uz", short: "UZ", name: "O‘zbekcha", note: "O‘zbek tili" },
  { code: "ru", short: "RU", name: "Русский", note: "Русский язык" },
  { code: "en", short: "EN", name: "English", note: "English language" },
];

const LanguageSwitcher = ({ mobile = false }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const menuId = useId();
  const { language, setLanguage, t } = useSitePreferences();
  const selected = languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const chooseLanguage = (code) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div className={`language-switcher ${mobile ? "language-switcher--mobile" : ""} ${open ? "language-switcher--open" : ""}`} ref={wrapperRef}>
      <button
        className="language-switcher__trigger"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t("controls.language")}
        aria-expanded={open}
        aria-controls={menuId}
      >
        <FiGlobe aria-hidden="true" />
        <span>{selected.short}</span>
        <FiChevronDown className="language-switcher__chevron" aria-hidden="true" />
      </button>

      <div className="language-switcher__menu" id={menuId} role="listbox" aria-label={t("controls.language")}>
        <div className="language-switcher__title"><FiGlobe /><span>{t("controls.language")}</span></div>
        {languages.map((item) => (
          <button
            className={language === item.code ? "language-option language-option--active" : "language-option"}
            type="button"
            role="option"
            aria-selected={language === item.code}
            onClick={() => chooseLanguage(item.code)}
            key={item.code}
          >
            <span className="language-option__code">{item.short}</span>
            <span className="language-option__copy"><strong>{item.name}</strong><small>{item.note}</small></span>
            {language === item.code && <FiCheck aria-hidden="true" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
