import { FiArrowUp, FiInstagram, FiMapPin, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const Footer = () => {
  const { tr } = useSitePreferences();
  const telegramUrl = import.meta.env.VITE_TELEGRAM_URL || "/#aloqa";
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || "/#aloqa";
  return (
  <footer className="footer">
    <div className="container footer-top">
      <div className="footer-brand">
        <Link className="brand brand--footer" to="/#home"><span className="brand-mark"><img src="/favicon.svg" alt="" /></span><span className="brand-copy">Bright <b>Education</b></span></Link>
        <p>{tr("Bilim, tartib va doimiy qo‘llab-quvvatlash orqali maqsadingizga yaqinlashtiradigan o‘quv markaz.")}</p>
        <div className="footer-socials" aria-label="Ijtimoiy tarmoqlar">
          <Link to={telegramUrl} aria-label="Telegram"><FiSend /></Link>
          <Link to={instagramUrl} aria-label="Instagram"><FiInstagram /></Link>
        </div>
      </div>
      <div className="footer-nav">
        <div><b>{tr("Sahifalar")}</b><Link to="/#courses">{tr("Kurslar")}</Link><Link to="/#news">{tr("Yangiliklar")}</Link><Link to="/#results">{tr("Natijalar")}</Link><Link to="/#team">{tr("Jamoamiz")}</Link><Link to="/#rules">{tr("Markaz qoidalari")}</Link><Link to="/contact">{tr("Kontakt")}</Link></div>
        <div><b>{tr("Kurslar")}</b><Link to="/courses/english">{tr("Ingliz tili")}</Link><Link to="/courses/math">{tr("Matematika")}</Link><Link to="/courses/preschool">{tr("Maktabga tayyorlov")}</Link><Link to="/#courses">{tr("Barcha kurslar")}</Link></div>
        <div><b>{tr("Manzil")}</b><span><FiMapPin /> {tr("Rishton shahri")}</span><Link to="/contact">{tr("Kontakt va xarita")}</Link></div>
      </div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Bright Education School</span><span>{tr("Bilimdan natijagacha.")}</span><Link to="/#home" aria-label="Top"><FiArrowUp /></Link></div>
  </footer>
  );
};

export default Footer;
