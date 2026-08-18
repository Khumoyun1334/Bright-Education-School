import { FiArrowUpRight, FiBarChart2, FiCheckCircle, FiFileText, FiShield, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const proofItems = [
  { icon: <FiFileText />, title: "Rasmiy hujjatlar", text: "Markaz hujjatlari va shartnoma shartlari ota-onaga ochiq ko‘rsatiladi." },
  { icon: <FiBarChart2 />, title: "Oylik rivojlanish hisoboti", text: "Davomat, o‘zlashtirish va ustoz tavsiyasi bir joyda jamlanadi." },
  { icon: <FiUsers />, title: "Ota-ona bilan doimiy aloqa", text: "Muhim o‘zgarishlar va bolaning o‘sishi muntazam yetkaziladi." },
];

const TrustProof = () => {
  const { tr } = useSitePreferences();

  return (
    <section className="section trust-proof-section" aria-labelledby="trust-proof-title">
      <div className="container trust-proof">
        <div className="trust-proof__visual">
          <span className="trust-proof__label"><FiShield /> {tr("Ishonch markazi")}</span>
          <div className="document-card document-card--back" aria-hidden="true" />
          <article className="document-card">
            <div className="document-card__top"><span>BE</span><small>{tr("OTA-ONA UCHUN")}</small></div>
            <FiCheckCircle className="document-card__seal" aria-hidden="true" />
            <h3>{tr("Ochiq va shaffof ta’lim")}</h3>
            <p>{tr("Hujjatlar, o‘quv rejasi, to‘lov va ichki tartib bo‘yicha ma’lumotlar qabulxonada taqdim etiladi.")}</p>
            <div className="document-card__lines"><i /><i /><i /></div>
          </article>
          <div className="trust-proof__score"><strong>4</strong><span>{tr("nazorat bosqichi")}</span></div>
        </div>

        <div className="trust-proof__content">
          <span className="section-kicker">{tr("Ishonch dalillari")}</span>
          <h2 id="trust-proof-title">{tr("Ota-ona qarorini taxmin bilan emas, aniq ma’lumot bilan qabul qiladi.")}</h2>
          <p>{tr("Farzandingiz kim bilan, qanday reja asosida va qanday muhitda o‘qishini boshlashdan oldin bilib olasiz.")}</p>
          <div className="trust-proof__list">
            {proofItems.map((item) => (
              <article className="trust-proof__item" key={item.title}>
                <span>{item.icon}</span>
                <div><h3>{tr(item.title)}</h3><p>{tr(item.text)}</p></div>
              </article>
            ))}
          </div>
          <Link className="button button--dark" to="/contact">{tr("Hujjatlar va shartlarni so‘rash")} <FiArrowUpRight /></Link>
        </div>
      </div>
    </section>
  );
};

export default TrustProof;
