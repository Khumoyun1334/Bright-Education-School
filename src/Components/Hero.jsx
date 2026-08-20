import { FiArrowDown, FiArrowRight, FiCheck, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const Hero = () => {
  const { t } = useSitePreferences();
  const { content: { settings } } = useContent();

  return (
  <header id="home" className="hero">
    <div className="hero-glow hero-glow--one" />
    <div className="hero-glow hero-glow--two" />
    <div className="container hero-grid">
      <div className="hero-copy">
        <div className="hero-status"><span>{settings.heroBadge || t("hero.admission")}</span><i /> {t("hero.eyebrow")}</div>
        <h1>{settings.heroTitleStart || t("hero.titleStart")} <em>{settings.heroTitleAccent || t("hero.titleAccent")}</em> {settings.heroTitleEnd || t("hero.titleEnd")}</h1>
        <p className="hero-lead">{settings.heroLead || t("hero.lead")}</p>
        <div className="hero-actions">
          <Link className="button button--primary" to="/#courses">{t("hero.choose")} <FiArrowRight /></Link>
          <Link className="button button--ghost" to="/#how-it-works"><span className="play-icon"><FiPlay /></span> {t("hero.how")}</Link>
        </div>
        <div className="hero-points" aria-label="Afzalliklar">
          <span><FiCheck /> {t("hero.order")}</span>
          <span><FiCheck /> {t("hero.noPhone")}</span>
          <span><FiCheck /> {t("hero.parent")}</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="Bright Educationdagi dars jarayoni">
        <div className="hero-image-wrap">
          <img src={settings.heroImage} alt="Ustoz bilan ta’lim olayotgan o‘quvchilar" fetchPriority="high" />
          <div className="hero-image-overlay" />
        </div>
        <div className="hero-side-photo" aria-hidden="true">
          <img src={settings.heroImage} alt="" />
          <span>{t("hero.practice")}</span>
        </div>
        <div className="floating-card floating-card--top">
          <span className="mini-icon">Aa</span>
          <div><b>{t("hero.directions")}</b><small>{t("hero.rightCourse")}</small></div>
        </div>
        <div className="floating-card floating-card--bottom">
          <div className="avatar-stack"><i>BE</i><i>7K</i><i>+</i></div>
          <div><b>{t("hero.trust")}</b><small>{t("hero.promise")}</small></div>
        </div>
        <div className="hero-scribble" aria-hidden="true">✦</div>
      </div>
    </div>
    <Link className="scroll-cue" to="/#numbers" aria-label="Pastga o‘tish"><FiArrowDown /></Link>
  </header>
  );
};

export default Hero;
