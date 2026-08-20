import { FiLock, FiMail, FiShield } from "react-icons/fi";
import Seo from "../Components/Seo";
import { useSitePreferences } from "../context/sitePreferencesContext";

const PrivacyPage = () => {
  const { tr } = useSitePreferences();
  return (
    <main className="legal-page">
      <Seo title={tr("Maxfiylik siyosati")} description={tr("Bright Education shaxsiy ma’lumotlarni qanday yig‘ishi va ishlatishi haqida ma’lumot.")} path="/privacy" />
      <header className="legal-hero"><div className="container"><span><FiLock /></span><p>{tr("Huquqiy ma’lumot")}</p><h1>{tr("Maxfiylik siyosati")}</h1></div></header>
      <section className="section legal-content"><div className="container legal-layout">
        <aside><FiShield /><strong>{tr("Ma’lumotlaringiz himoyalanadi")}</strong><p>{tr("Arizadagi ma’lumotlar faqat siz bilan bog‘lanish va mos kursni tavsiya qilish uchun ishlatiladi.")}</p></aside>
        <article>
          <p className="legal-updated">{tr("Oxirgi yangilanish: 19-avgust, 2026")}</p>
          <h2>{tr("Qanday ma’lumotlarni olamiz?")}</h2><p>{tr("Ariza yuborilganda ismingiz, telefon raqamingiz, tanlangan kurs va bog‘lanish uchun qulay vaqt olinadi.")}</p>
          <h2>{tr("Ma’lumotlardan qanday foydalanamiz?")}</h2><p>{tr("Ma’lumotlar konsultatsiya berish, guruh va jadvalni tavsiya qilish hamda arizangiz holati bo‘yicha bog‘lanish uchun ishlatiladi.")}</p>
          <h2>{tr("Ma’lumotlar kimga beriladi?")}</h2><p>{tr("Ma’lumotlar reklama uchun uchinchi shaxslarga sotilmaydi. Texnik xizmat ko‘rsatuvchilar faqat xizmatni bajarish uchun zarur doirada foydalanishi mumkin.")}</p>
          <h2>{tr("Ma’lumotni o‘chirish")}</h2><p>{tr("Ma’lumotlaringizni yangilash yoki o‘chirish uchun markaz administratoriga murojaat qilishingiz mumkin.")}</p>
          <div className="legal-contact"><FiMail /><span><strong>{tr("Savolingiz bormi?")}</strong><p>{tr("Kontakt sahifasidagi administrator raqamlari orqali bog‘laning.")}</p></span></div>
        </article>
      </div></section>
    </main>
  );
};

export default PrivacyPage;
