import { FiArrowRight, FiCheckCircle, FiClipboard, FiFlag, FiLayers } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";

const steps = [
  { icon: <FiClipboard />, title: "Sizni tinglaymiz", text: "Maqsadingiz, vaqtingiz va hozirgi bilimingizni aniqlaymiz." },
  { icon: <FiLayers />, title: "Mos guruh tanlaymiz", text: "Daraja va jadvalga mos o‘quv guruhini tavsiya qilamiz." },
  { icon: <FiCheckCircle />, title: "Reja bilan o‘qiysiz", text: "Amaliy darslar va vazifalar orqali muntazam rivojlanasiz." },
  { icon: <FiFlag />, title: "Natijani tahlil qilamiz", text: "Sinovlar orqali o‘sishni ko‘rib, keyingi maqsadni belgilaymiz." },
];

const LearningPath = () => {
  const { tr } = useSitePreferences();
  return (
  <section id="how-it-works" className="section path-section">
    <div className="container">
      <div className="section-heading section-heading--center">
        <span className="section-kicker">{tr("Ta’lim jarayoni")}</span>
        <h2>{tr("Natijagacha 4 aniq qadam")}</h2>
        <p>{tr("Qayerdan boshlashni bilmasangiz ham xavotir olmang — yo‘lni birga belgilaymiz.")}</p>
      </div>
      <div className="path-grid">
        {steps.map((step, index) => (
          <article className="path-card" key={step.title}>
            <span className="path-index">0{index + 1}</span>
            <div className="path-icon">{step.icon}</div>
            <h3>{tr(step.title)}</h3>
            <p>{tr(step.text)}</p>
            {index < steps.length - 1 && <FiArrowRight className="path-arrow" aria-hidden="true" />}
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default LearningPath;
