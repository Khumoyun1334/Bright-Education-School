import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiBarChart2, FiBookOpen, FiCheckCircle, FiClipboard, FiFileText, FiShield, FiTarget, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const proofItems = [
  { icon: <FiFileText />, title: "Rasmiy hujjatlar", text: "Markaz hujjatlari va shartnoma shartlari ota-onaga ochiq ko‘rsatiladi." },
  { icon: <FiBarChart2 />, title: "Oylik rivojlanish hisoboti", text: "Davomat, o‘zlashtirish va ustoz tavsiyasi bir joyda jamlanadi." },
  { icon: <FiUsers />, title: "Ota-ona bilan doimiy aloqa", text: "Muhim o‘zgarishlar va bolaning o‘sishi muntazam yetkaziladi." },
];

const controlStages = [
  {
    icon: <FiClipboard />,
    title: "Boshlang‘ich diagnostika",
    text: "O‘quvchining hozirgi bilimi, kuchli tomonlari va rivojlanishi kerak bo‘lgan mavzular aniqlanadi.",
    note: "Daraja va maqsad aniqlanadi",
  },
  {
    icon: <FiTarget />,
    title: "Individual o‘quv reja",
    text: "Natijaga olib boradigan mavzular, mashqlar va nazorat sanalari tushunarli rejaga joylanadi.",
    note: "Aniq yo‘l xaritasi tuziladi",
  },
  {
    icon: <FiBarChart2 />,
    title: "Oylik monitoring",
    text: "Davomat, topshiriqlar va sinov natijalari tahlil qilinib, ota-onaga qisqa hisobot beriladi.",
    note: "O‘sish muntazam kuzatiladi",
  },
  {
    icon: <FiCheckCircle />,
    title: "Yakuniy natija va tavsiya",
    text: "Erishilgan natija baholanadi va o‘quvchining keyingi maqsadi uchun ustoz tavsiyasi beriladi.",
    note: "Keyingi qadam belgilanadi",
  },
];

const TrustProof = () => {
  const { tr } = useSitePreferences();
  const [activeStage, setActiveStage] = useState(0);
  const [bookVisible, setBookVisible] = useState(false);
  const bookRef = useRef(null);

  useEffect(() => {
    if (!bookRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBookVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(bookRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!bookVisible || activeStage >= controlStages.length - 1) return undefined;
    const timer = window.setTimeout(() => setActiveStage((stage) => stage + 1), 3600);
    return () => window.clearTimeout(timer);
  }, [activeStage, bookVisible]);

  const showStage = (index) => setActiveStage(Math.max(0, Math.min(index, controlStages.length - 1)));

  return (
    <section id="trust-proof" className="section trust-proof-section" aria-labelledby="trust-proof-title">
      <div className="container trust-proof">
        <div className="trust-proof__visual" ref={bookRef}>
          <span className="trust-proof__label"><FiShield /> {tr("Ishonch markazi")}</span>
          <div className="document-book" aria-live="polite">
            <div className="document-book__cover" aria-hidden="true"><FiBookOpen /></div>
            {controlStages.map((stage, index) => (
              <article
                className={`document-page ${index < activeStage ? "document-page--turned" : ""} ${index === activeStage ? "document-page--active" : ""}`}
                style={{ "--page-offset": `${index * 3}px`, "--page-rotation": `${(index - 1) * 0.45}deg`, zIndex: controlStages.length - index }}
                aria-hidden={index !== activeStage}
                key={stage.title}
              >
                <div className="document-card__top"><span>BE</span><small>{tr("OTA-ONA UCHUN")}</small></div>
                <div className="document-page__stage"><span>{String(index + 1).padStart(2, "0")}</span><small>{tr("bosqich")}</small></div>
                <div className="document-page__icon">{stage.icon}</div>
                <h3>{tr(stage.title)}</h3>
                <p>{tr(stage.text)}</p>
                <div className="document-page__footer"><i /><strong>{tr(stage.note)}</strong><span>{index + 1} / {controlStages.length}</span></div>
              </article>
            ))}
          </div>
          <div className="document-book__controls">
            <button type="button" onClick={() => showStage(activeStage - 1)} disabled={activeStage === 0} aria-label={tr("Oldingi bosqich")}><FiArrowLeft /></button>
            <div>
              {controlStages.map((stage, index) => <button className={index === activeStage ? "is-active" : ""} type="button" onClick={() => showStage(index)} aria-label={`${index + 1} ${tr("bosqich")}`} key={stage.title} />)}
            </div>
            <button type="button" onClick={() => showStage(activeStage + 1)} disabled={activeStage === controlStages.length - 1} aria-label={tr("Keyingi bosqich")}><FiArrowRight /></button>
          </div>
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
