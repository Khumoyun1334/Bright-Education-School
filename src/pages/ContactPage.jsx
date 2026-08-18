import { FiArrowRight, FiClock, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import Aloqa from "../Components/Aloqa";
import { admins, phoneHref } from "../data/contacts";
import { useSitePreferences } from "../context/sitePreferencesContext";

const ContactPage = () => {
  const { tr } = useSitePreferences();
  return (
  <main className="contact-page">
    <section className="contact-page-hero">
      <div className="container contact-page-hero__grid">
        <div>
          <span className="section-kicker section-kicker--light">{tr("Bog‘lanish")}</span>
          <h1>{tr("Savolingiz bo‘lsa, biz doim aloqadamiz.")}</h1>
          <p>{tr("Kurs tanlashdan boshlab dars jadvaligacha — administratorlar sizga kerakli ma’lumotni sodda va tushunarli qilib beradi.")}</p>
        </div>
        <div className="contact-page-note">
          <span><FiClock /></span>
          <div><b>{tr("Javob berish vaqti")}</b><p>{tr("Ish vaqtida murojaatlarga imkon qadar tez javob beramiz.")}</p></div>
        </div>
      </div>
    </section>

    <section className="section admin-section">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div><span className="section-kicker">{tr("Administratorlar")}</span><h2>{tr("Kerakli bo‘lim bilan to‘g‘ridan-to‘g‘ri bog‘laning.")}</h2></div>
          <p>{tr("Qo‘ng‘iroq qilishdan oldin qaysi kurs va o‘quvchining yoshini aytsangiz, sizga tezroq yordam bera olamiz.")}</p>
        </div>
        <div className="admin-grid">
          {admins.map((admin, index) => (
            <article className="admin-card" key={admin.role}>
              <div className="admin-avatar">{String(index + 1).padStart(2, "0")}</div>
              <div className="admin-card__copy">
                <span>{tr(admin.role)}</span>
                <h3>{tr(admin.name)}</h3>
                <p><FiClock /> {tr(admin.schedule)}</p>
              </div>
              {admin.phone ? (
                <Link to={phoneHref(admin.phone)}><FiPhoneCall /> {admin.phone} <FiArrowRight /></Link>
              ) : (
                <span className="admin-phone-missing">{tr("Telefon raqami kiritilmoqda")}</span>
              )}
            </article>
          ))}
        </div>
        <div className="location-card">
          <div className="location-copy">
            <span className="location-icon"><FiMapPin /></span>
            <span className="section-kicker">{tr("Manzilimiz")}</span>
            <h2>{tr("Rishton shahrida sizni kutamiz.")}</h2>
            <p>{tr("Markazga tashrif buyurib, o‘quv muhiti bilan yaqindan tanishing va bepul maslahat oling.")}</p>
            <Link className="button button--dark" to="https://www.google.com/maps?q=Rishton%20Tibbiyot%20Texnikumi" target="_blank" rel="noreferrer">{tr("Xaritada ochish")} <FiArrowRight /></Link>
          </div>
          <iframe title="Bright Education manzili" src="https://www.google.com/maps?q=Rishton%20Tibbiyot%20Texnikumi&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>

    <Aloqa />
  </main>
  );
};

export default ContactPage;
