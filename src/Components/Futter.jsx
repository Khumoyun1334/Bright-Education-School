import { FiArrowUp, FiInstagram, FiMapPin, FiSend } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const Footer = () => {
  const { tr } = useSitePreferences();
  const { content: { settings } } = useContent();
  const telegramUrl = settings.telegramUrl || "/#aloqa";
  const instagramUrl = settings.instagramUrl || "/#aloqa";
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
        <div><b>{tr("Sahifalar")}</b><Link to="/#courses">{tr("Kurslar")}</Link><Link to="/#news">{tr("Yangiliklar")}</Link><Link to="/mandate">{tr("Mock natijalari")}</Link><Link to="/#team">{tr("Jamoamiz")}</Link><Link to="/documents">{tr("Hujjatlar")}</Link><Link to="/contact">{tr("Kontakt")}</Link></div>
        <div><b>{tr("Kurslar")}</b><Link to="/courses/english">{tr("Ingliz tili")}</Link><Link to="/courses/math">{tr("Matematika")}</Link><Link to="/courses/preschool">{tr("Maktabga tayyorlov")}</Link><Link to="/#courses">{tr("Barcha kurslar")}</Link></div>
        <div><b>{tr("Manzil")}</b><span><FiMapPin /> {tr(settings.address)}</span><Link to="/contact">{tr("Kontakt va xarita")}</Link><Link to="/privacy">{tr("Maxfiylik siyosati")}</Link></div>
      </div>
    </div>
    <div className="container footer-bottom"><span>© 2026 Bright Education School</span><span>{tr("Bilimdan natijagacha.")}</span><Link to="/#home" aria-label="Top"><FiArrowUp /></Link></div>
  </footer>
  );
};

export default Footer;
