import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const questions = [
  ["Qaysi kurs menga mosligini qanday bilaman?", "Ariza qoldirganingizdan so‘ng maqsadingiz va hozirgi darajangizni aniqlaymiz. Shunga qarab sizga mos yo‘nalish va guruh tavsiya qilinadi."],
  ["Dars vaqtida telefon ishlatish mumkinmi?", "Yo‘q. Markazimizda dars davomida telefon ishlatish qat’iyan taqiqlanadi. Bu qoida o‘quvchining diqqati va dars sifatini himoya qiladi."],
  ["Ota-ona farzandining natijasini qanday biladi?", "Davomat, sinov natijalari va o‘quvchining umumiy rivojlanishi bo‘yicha ota-onaga muntazam ma’lumot beriladi."],
  ["Dars jadvalini tanlash mumkinmi?", "Guruhlar mavjudligiga qarab sizga qulay kun va vaqt variantlari taklif qilinadi. Aniq jadvalni administrator bilan kelishib olasiz."],
  ["Kursga yozilish uchun darajam bo‘lishi shartmi?", "Yo‘q. Ingliz tili kursida boshlang‘ich darajadan o‘qish mumkin. IELTS kabi maqsadli kurslarda esa avvalgi bilim darajasi aniqlanadi."],
  ["O‘qish davomida natijam qanday nazorat qilinadi?", "Amaliy vazifalar, mavzuli sinovlar va ustoz fikri orqali rivojlanish muntazam kuzatib boriladi."],
  ["Birinchi qadam nima?", "Quyidagi qisqa formani to‘ldiring. Administrator siz bilan bog‘lanib, savollaringizga javob beradi va mos kursni tanlashga yordam beradi."],
];

const Faq = () => {
  const { tr } = useSitePreferences();
  return (
  <section id="faq" className="section faq-section">
    <div className="container faq-grid">
      <div className="faq-intro">
        <span className="section-kicker">{tr("Ko‘p so‘raladi")}</span>
        <h2>{tr("Savolingiz qoldimi?")}</h2>
        <p>{tr("Kerakli javobni topmasangiz, bepul maslahat uchun ariza qoldiring.")}</p>
        <Link className="text-link" to="/#aloqa">{tr("Biz bilan bog‘lanish")} <span>↗</span></Link>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary><span>{tr(question)}</span><FiPlus /></summary>
            <p>{tr(answer)}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Faq;
