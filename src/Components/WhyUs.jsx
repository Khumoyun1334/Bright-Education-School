import { FiBarChart2, FiCalendar, FiMessageCircle, FiUserCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const benefits = [
  { icon: <FiUserCheck />, number: "01", title: "Kuchli ustozlar", text: "Murakkab mavzuni sodda tushuntiradigan, natijani kuzatib boradigan ustozlar." },
  { icon: <FiBarChart2 />, number: "02", title: "Aniq o‘sish tizimi", text: "Boshlang‘ich diagnostikadan yakuniy sinovgacha rivojlanishingiz ko‘rinib turadi." },
  { icon: <FiMessageCircle />, number: "03", title: "Ko‘proq amaliyot", text: "Faqat nazariya emas — darsda savol, mashq va faol ishtirok uchun ko‘proq vaqt." },
  { icon: <FiCalendar />, number: "04", title: "Qulay o‘quv tartibi", text: "Maqsadingiz va darajangizga mos guruh hamda tushunarli dars rejasi." },
];

const WhyUs = () => {
  const { tr } = useSitePreferences();
  return (
  <section id="about" className="section why-section">
    <div className="container why-grid">
      <div className="why-intro">
        <span className="section-kicker section-kicker--light">{tr("Nega aynan biz?")}</span>
        <h2>{tr("O‘qish jarayoni siz uchun ishlasin.")}</h2>
        <p>{tr("Yaxshi ta’lim faqat dars o‘tish emas. Biz o‘quvchining maqsadini tushunish, mos reja tuzish va yo‘l davomida yordam berishga e’tibor qilamiz.")}</p>
        <Link to="/#aloqa" className="text-link text-link--light">{tr("Markaz bilan tanishish")} <span>↗</span></Link>
      </div>
      <div className="benefit-grid">
        {benefits.map((item) => (
          <article className="benefit-card" key={item.number}>
            <span className="benefit-number">{item.number}</span>
            <div className="benefit-icon">{item.icon}</div>
            <h3>{tr(item.title)}</h3>
            <p>{tr(item.text)}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
  );
};

export default WhyUs;
