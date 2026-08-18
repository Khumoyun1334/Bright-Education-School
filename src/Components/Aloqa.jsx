import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiMapPin } from "react-icons/fi";
import { courses } from "../data/courses";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { submitInquiry } from "../services/contactService";

const Aloqa = () => {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const { tr } = useSitePreferences();
  const selectedCourse = new URLSearchParams(window.location.search).get("course") || "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const phoneDigits = data.phone.replace(/\D/g, "");

    if (!data.name.trim() || phoneDigits.length < 9 || !data.course) {
      setStatus("error");
      setMessage("Ism, kurs va to‘g‘ri telefon raqamini kiriting.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const result = await submitInquiry(data);
      setStatus("success");
      setMessage(result.local
        ? "Ariza ushbu qurilmada saqlandi. Onlayn yuborish uchun administrator server manzilini ulashi kerak."
        : "Rahmat! Arizangiz qabul qilindi. Tez orada siz bilan bog‘lanamiz.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Arizani hozir yuborib bo‘lmadi. Iltimos, birozdan so‘ng qayta urinib ko‘ring.");
    }
  };

  return (
    <section id="aloqa" className="section contact-section">
      <div className="container contact-shell">
        <div className="contact-copy">
          <span className="section-kicker section-kicker--light">{tr("Birinchi qadam")}</span>
          <h2>{tr("Bugun boshlashga tayyormisiz?")}</h2>
          <p>{tr("Qisqa formani to‘ldiring. Maqsadingizni tushunib, sizga mos kurs va guruh bo‘yicha bepul maslahat beramiz.")}</p>
          <div className="contact-info">
            <div><span><FiClock /></span><p><b>{tr("Tezkor maslahat")}</b><small>{tr("Administrator siz bilan bog‘lanadi")}</small></p></div>
            <div><span><FiMapPin /></span><p><b>{tr("Rishton shahri")}</b><small>{tr("Markaz lokatsiyasi xaritada ko‘rsatilgan")}</small></p></div>
          </div>
          <div className="contact-mini-map">
            <iframe title="Bright Education manzili" src="https://www.google.com/maps?q=Rishton%20Tibbiyot%20Texnikumi&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-top"><span>01</span><p><b>{tr("Ma’lumotlaringiz")}</b><small>{tr("3 ta maydon, taxminan 1 daqiqa")}</small></p></div>
          <label>{tr("Ismingiz")}<input name="name" type="text" placeholder={tr("Masalan: Aziz")} autoComplete="name" required /></label>
          <label>{tr("Telefon raqamingiz")}<input name="phone" type="tel" placeholder="+998 90 123 45 67" autoComplete="tel" inputMode="tel" required /></label>
          <label>{tr("Qaysi kursga qiziqasiz?")}
            <select name="course" defaultValue={selectedCourse} required>
              <option value="" disabled>{tr("Kursni tanlang")}</option>
              {courses.map((course) => <option value={course.id} key={course.id}>{tr(course.title)}</option>)}
              <option value="consultation">{tr("Hali aniq emas — maslahat kerak")}</option>
            </select>
          </label>
          <label>{tr("Qulay vaqt")} <span className="optional">{tr("ixtiyoriy")}</span>
            <select name="time" defaultValue="any">
              <option value="any">{tr("Istalgan vaqtda")}</option>
              <option value="morning">{tr("Ertalab")}</option>
              <option value="afternoon">{tr("Kunduzi")}</option>
              <option value="evening">{tr("Kechqurun")}</option>
            </select>
          </label>
          <button className="form-submit" type="submit" disabled={status === "loading"}>
            {status === "loading" ? tr("Yuborilmoqda...") : tr("Bepul maslahat olish")} <FiArrowRight />
          </button>
          {message && <p className={`form-message form-message--${status}`} role="status">{status === "success" && <FiCheckCircle />} {tr(message)}</p>}
          <p className="form-privacy">{tr("Yuborish orqali ma’lumotlaringizdan bog‘lanish maqsadida foydalanishga rozilik bildirasiz.")}</p>
        </form>
      </div>
    </section>
  );
};

export default Aloqa;
