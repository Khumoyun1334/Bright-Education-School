import { useEffect, useState } from "react";
import { FiArrowRight, FiArrowUpRight, FiAward, FiBarChart2, FiChevronDown, FiMenu, FiMoon, FiPhone, FiSearch, FiSun, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import SearchDialog from "./SearchDialog";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  ["nav.home", "home"],
  ["nav.news", "news"],
  ["nav.courses", "courses"],
  ["nav.results", "results"],
  ["nav.team", "team"],
  ["nav.rules", "rules"],
  ["nav.contact", "contact", "/contact"],
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, t } = useSitePreferences();
  const currentActiveSection = location.pathname === "/"
    ? activeSection
    : location.pathname.startsWith("/courses/")
      ? "courses"
      : location.pathname.startsWith("/news/")
        ? "news"
        : location.pathname === "/mandate"
          ? "results"
          : location.pathname === "/documents"
            ? "rules"
      : location.pathname === "/contact"
        ? "contact"
        : "";
  const hrefFor = (id) => (
    location.pathname === "/" || (location.pathname === "/contact" && id === "aloqa")
      ? `#${id}`
      : `/#${id}`
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    const sectionIds = links.filter(([, , path]) => !path).map(([, id]) => id);
    let frameId;

    const updateActiveSection = () => {
      const marker = Math.min(140, window.innerHeight * 0.25);
      const currentSection = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });

      setActiveSection(currentSection ?? "");
    };

    const onPageMove = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    frameId = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener("scroll", onPageMove, { passive: true });
    window.addEventListener("resize", onPageMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onPageMove);
      window.removeEventListener("resize", onPageMove);
    };
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.toggle("menu-open", open);
    body.classList.toggle("menu-open", open);

    return () => {
      root.classList.remove("menu-open");
      body.classList.remove("menu-open");
    };
  }, [open]);

  const preferences = (mobile = false) => (
    <div className={mobile ? "mobile-preferences" : "nav-tools"}>
      <button className="nav-tool" type="button" onClick={() => { setSearchOpen(true); setOpen(false); }} aria-label={t("controls.search")} title={t("controls.search")}>
        <FiSearch />
      </button>
      <button className="nav-tool" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? t("controls.light") : t("controls.dark")} title={theme === "dark" ? t("controls.light") : t("controls.dark")}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>
      <LanguageSwitcher mobile={mobile} />
    </div>
  );

  return (
    <>
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} aria-label="Asosiy navigatsiya">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Bright Education bosh sahifasi" onClick={() => setOpen(false)}>
          <span className="brand-mark"><img src="/favicon.svg" alt="" /></span>
          <span className="brand-copy">Bright <b>Education</b></span>
        </Link>

        <div className="nav-links">
          {links.map(([labelKey, id, path]) => id === "results" ? (
            <div className="nav-dropdown" key={id}>
              <Link className={currentActiveSection === id ? "nav-link--active" : undefined} to={hrefFor(id)} aria-current={currentActiveSection === id ? "location" : undefined} aria-haspopup="true">
                {t(labelKey)} <FiChevronDown />
              </Link>
              <div className="nav-dropdown__menu">
                <Link to={hrefFor("results")}><span><FiBarChart2 /></span><div><strong>{t("nav.studentResults")}</strong><small>{t("nav.resultsHint")}</small></div><FiArrowRight /></Link>
                <Link className={location.pathname === "/mandate" ? "nav-dropdown__active" : undefined} to="/mandate"><span><FiAward /></span><div><strong>{t("nav.mandateCheck")}</strong><small>{t("nav.mandateHint")}</small></div><FiArrowRight /></Link>
              </div>
            </div>
          ) : (
            <Link className={currentActiveSection === id ? "nav-link--active" : undefined} to={path || hrefFor(id)} key={id} aria-current={currentActiveSection === id ? "location" : undefined}>{t(labelKey)}</Link>
          ))}
        </div>

        {preferences()}

        <Link className="nav-cta" to={hrefFor("aloqa")}>
          <FiPhone aria-hidden="true" /> {t("nav.consultation")} <FiArrowUpRight aria-hidden="true" />
        </Link>

        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? t("controls.closeMenu") : t("controls.openMenu")}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>
        {links.map(([labelKey, id, path]) => (
          <span className="mobile-menu__group" key={id}>
            <Link className={currentActiveSection === id ? "nav-link--active" : undefined} to={path || hrefFor(id)} onClick={() => setOpen(false)} aria-current={currentActiveSection === id ? "location" : undefined}>{t(labelKey)}</Link>
            {id === "results" && <Link className={`mobile-mandate-link ${location.pathname === "/mandate" ? "mobile-mandate-link--active" : ""}`} to="/mandate" onClick={() => setOpen(false)}><FiAward /> {t("nav.mandateCheck")} <FiArrowRight /></Link>}
          </span>
        ))}
        {preferences(true)}
        <Link className="mobile-menu__cta" to={hrefFor("aloqa")} onClick={() => setOpen(false)}>
          {t("nav.consultation")} <FiArrowUpRight />
        </Link>
      </div>
      {open && <button className="menu-backdrop" aria-label={t("controls.closeMenu")} onClick={() => setOpen(false)} />}
    </nav>
    <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
