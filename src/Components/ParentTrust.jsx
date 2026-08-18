import { FiBarChart2, FiCheckCircle, FiMessageCircle, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const parentBenefits = [
  { icon: <FiBarChart2 />, title: "Natija ko‘rinib turadi", text: "Sinov va amaliy vazifalar orqali bolaning o‘sishi muntazam tahlil qilinadi." },
  { icon: <FiMessageCircle />, title: "Ota-ona bilan aloqa", text: "Davomat, intizom va rivojlanish bo‘yicha kerakli ma’lumot ota-onaga yetkaziladi." },
  { icon: <FiShield />, title: "Xavfsiz va tartibli muhit", text: "Dars vaqtida telefon ishlatilmaydi, e’tibor faqat bilim va mashg‘ulotda bo‘ladi." },
  { icon: <FiCheckCircle />, title: "Mos guruh va ustoz", text: "Farzandingiz yoshi, darajasi va maqsadiga mos guruhga joylashtiriladi." },
];

const ParentTrust = () => {
  const { tr } = useSitePreferences();
  return (
  <section id="parents" className="section parent-section">
    <div className="container parent-shell">
      <div className="parent-copy">
        <span className="section-kicker">{tr("Ota-onalar uchun")}</span>
        <h2>{tr("Farzandingiz shunchaki darsga emas, natijaga keladi.")}</h2>
        <p>{tr("Biz uchun ota-onaning ishonchi — katta mas’uliyat. Har bir bola e’tibor, tartib va tushunarli reja asosida ta’lim oladi.")}</p>
        <Link className="button button--dark" to="/#aloqa">{tr("Farzandim uchun maslahat olish")}</Link>
      </div>
      <div className="parent-benefits">
        {parentBenefits.map((item) => (
          <article key={item.title}>
            <span>{item.icon}</span>
            <div><h3>{tr(item.title)}</h3><p>{tr(item.text)}</p></div>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ParentTrust;
