import { FiBookOpen, FiClock, FiHeart, FiHome, FiSmartphone } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";

const rules = [
  { icon: <FiSmartphone />, title: "Telefon ishlatish taqiqlanadi", text: "Dars davomida telefon o‘chiriladi va mashg‘ulot yakunigacha ishlatilmaydi.", important: true },
  { icon: <FiClock />, title: "Darsga o‘z vaqtida kelish", text: "O‘quvchi dars boshlanishidan 5–10 daqiqa oldin markazda bo‘lishi kerak." },
  { icon: <FiBookOpen />, title: "Vazifalarni bajarish", text: "Uyga berilgan topshiriqlar keyingi mavzuni yaxshi o‘zlashtirish uchun bajariladi." },
  { icon: <FiHeart />, title: "Hurmatli muomala", text: "Ustozlar va boshqa o‘quvchilarga hurmat bilan munosabatda bo‘lish shart." },
  { icon: <FiHome />, title: "Tozalik va tartib", text: "Xona, jihozlar va o‘quv qurollariga ehtiyotkorlik bilan munosabat qilinadi." },
];

const Rules = () => {
  const { t, tr } = useSitePreferences();
  return (
  <section id="rules" className="section rules-section">
    <div className="container">
      <div className="section-heading section-heading--split">
        <div><span className="section-kicker section-kicker--light">{t("rules.kicker")}</span><h2>{t("rules.title")}</h2></div>
        <p>{t("rules.intro")}</p>
      </div>
      <div className="rules-grid">
        {rules.map((rule, index) => (
          <article className={rule.important ? "rule-card rule-card--important" : "rule-card"} key={rule.title}>
            <span className="rule-number">0{index + 1}</span>
            <div className="rule-icon">{rule.icon}</div>
            <h3>{tr(rule.title)}</h3>
            <p>{tr(rule.text)}</p>
            {rule.important && <strong>{t("rules.important")}</strong>}
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Rules;
