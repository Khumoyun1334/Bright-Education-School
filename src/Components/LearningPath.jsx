import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiCheck, FiCheckCircle, FiClipboard, FiFlag, FiLayers } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";

const steps = [
  { icon: <FiClipboard />, title: "Sizni tinglaymiz", text: "Maqsadingiz, vaqtingiz va hozirgi bilimingizni aniqlaymiz." },
  { icon: <FiLayers />, title: "Mos guruh tanlaymiz", text: "Daraja va jadvalga mos o‘quv guruhini tavsiya qilamiz." },
  { icon: <FiCheckCircle />, title: "Reja bilan o‘qiysiz", text: "Amaliy darslar va vazifalar orqali muntazam rivojlanasiz." },
  { icon: <FiFlag />, title: "Natijani tahlil qilamiz", text: "Sinovlar orqali o‘sishni ko‘rib, keyingi maqsadni belgilaymiz." },
];

const LearningPath = () => {
  const { tr } = useSitePreferences();
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return undefined;
    const timer = window.setInterval(() => setActiveStep((step) => (step + 1) % steps.length), 2400);
    return () => window.clearInterval(timer);
  }, [isVisible]);

  return (
  <section id="how-it-works" className="section path-section" ref={sectionRef}>
    <div className="container">
      <div className="section-heading section-heading--center">
        <span className="section-kicker">{tr("Ta’lim jarayoni")}</span>
        <h2>{tr("Natijagacha 4 aniq qadam")}</h2>
        <p>{tr("Qayerdan boshlashni bilmasangiz ham xavotir olmang — yo‘lni birga belgilaymiz.")}</p>
      </div>
      <div className="path-flow">
        <div className="path-progress" aria-hidden="true"><i style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }} /><span style={{ left: `${(activeStep / (steps.length - 1)) * 100}%` }} /></div>
      <div className="path-grid">
        {steps.map((step, index) => (
          <button
            className={`path-card ${index === activeStep ? "path-card--active" : ""} ${index < activeStep ? "path-card--done" : ""}`}
            type="button"
            onClick={() => setActiveStep(index)}
            aria-pressed={index === activeStep}
            key={step.title}
          >
            <span className="path-index">0{index + 1}</span>
            <div className="path-icon">{step.icon}</div>
            <h3>{tr(step.title)}</h3>
            <p>{tr(step.text)}</p>
            <span className="path-complete" aria-hidden="true"><FiCheck /></span>
            {index < steps.length - 1 && <FiArrowRight className={`path-arrow ${index < activeStep ? "path-arrow--active" : ""}`} aria-hidden="true" />}
          </button>
        ))}
      </div>
      </div>
    </div>
  </section>
  );
};

export default LearningPath;
