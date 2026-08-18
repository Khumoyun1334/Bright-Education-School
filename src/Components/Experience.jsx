import { FiCheck, FiMessageSquare, FiTarget, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const Experience = () => {
  const { tr } = useSitePreferences();
  return (
  <section className="section experience-section">
    <div className="container experience-grid">
      <div className="experience-media">
        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85" alt={tr("Dars jarayoni")} loading="lazy" />
        <div className="experience-badge"><strong>{tr("Har bir dars")}</strong><span>{tr("maqsadga yaqinlashtiradi")}</span></div>
        <div className="experience-dots" aria-hidden="true">••••<br />••••<br />••••</div>
      </div>
      <div className="experience-copy">
        <span className="section-kicker">{tr("Qulay muhit")}</span>
        <h2>{tr("Savol berishdan tortinmaydigan darslar.")}</h2>
        <p className="experience-lead">{tr("O‘quvchi o‘zini erkin his qilganida tezroq o‘rganadi. Shu sababli darslarimiz muloqot, amaliyot va doimiy fikr-mulohaza asosida quriladi.")}</p>
        <div className="experience-list">
          <div><span><FiUsers /></span><p><b>{tr("Kichik va mos guruhlar")}</b><small>{tr("Ustoz har bir o‘quvchiga e’tibor bera oladi.")}</small></p></div>
          <div><span><FiMessageSquare /></span><p><b>{tr("Ochiq muloqot")}</b><small>{tr("Savollar va xatolar o‘rganishning tabiiy qismi.")}</small></p></div>
          <div><span><FiTarget /></span><p><b>{tr("Maqsadga yo‘naltirilgan reja")}</b><small>{tr("Keraksiz mavzularda vaqt yo‘qotmaysiz.")}</small></p></div>
        </div>
        <Link className="button button--dark" to="/#aloqa">{tr("Maslahat olish")} <FiCheck /></Link>
      </div>
    </div>
  </section>
  );
};

export default Experience;
