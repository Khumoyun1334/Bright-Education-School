import { useState } from "react";
import { FiAward, FiCheckCircle, FiSearch, FiShield } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";
import Seo from "../Components/Seo";
import { fetchMockResults } from "../services/mandateService";

const locales = { uz: "uz-UZ", ru: "ru-RU", en: "en-GB" };

const MandatePage = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle");
  const { tr, language } = useSitePreferences();

  const handleSearch = async (event) => {
    event.preventDefault();
    const normalized = query.trim();
    setStatus("loading");
    try {
      setResults(await fetchMockResults(normalized));
      setSearched(true);
      setStatus("success");
    } catch {
      setResults([]);
      setSearched(true);
      setStatus("error");
    }
  };

  const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString(locales[language] || locales.uz, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const latest = results[0];
  const percentage = latest ? Math.round((latest.correctAnswers / latest.totalQuestions) * 100) : 0;

  return (
    <main className="mandate-page">
      <Seo title={tr("Haftalik mock test natijalari")} description={tr("Bright Education School haftalik mock test natijalarini to‘liq ism-familiya orqali tekshiring.")} path="/mandate" />
      <section className="mandate-hero">
        <div className="container mandate-hero__grid">
          <div><span className="section-kicker section-kicker--light">{tr("Har shanba — mock test")}</span><h1>{tr("Haftalik natijangizni tekshiring.")}</h1><p>{tr("Ism va familiyangizni to‘liq, xatosiz kiriting. Eng so‘nggi natija va oldingi haftalardagi o‘sishingizni ko‘rasiz.")}</p></div>
          <div className="mandate-security"><FiShield /><div><strong>{tr("Aniq qidiruv")}</strong><span>{tr("Natijalar faqat to‘liq ism-familiya aniq mos kelganda ko‘rsatiladi.")}</span></div></div>
        </div>
      </section>
      <section className="section mandate-search-section">
        <div className="container mandate-search-shell">
          <form onSubmit={handleSearch} className="mandate-form">
            <label htmlFor="mandate-full-name">{tr("O‘quvchining to‘liq ism-familiyasi")}</label>
            <div><FiSearch /><input id="mandate-full-name" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tr("Masalan: Ali Valiyev")} minLength={5} maxLength={100} autoCapitalize="words" autoComplete="name" required /><button type="submit" disabled={status === "loading"}>{tr(status === "loading" ? "Tekshirilmoqda..." : "Natijani ko‘rish")}</button></div>
            <p>{tr("Namuna tekshiruv uchun: Ali Valiyev")}</p>
          </form>
          {latest ? <>
            <article className="mandate-result">
              <div className="mandate-result__top"><span><FiCheckCircle /></span><div><small>{tr("Eng so‘nggi mock natijasi")}</small><h2>{latest.fullName}</h2><p>{formatDate(latest.mockDate)}</p></div><strong>{latest.correctAnswers}<small>/{latest.totalQuestions} {tr("to‘g‘ri")}</small></strong></div>
              <div className="mandate-result__details"><div><small>{tr("Natija")}</small><b>{percentage}%</b></div><div><small>{tr("Yo‘nalish")}</small><b>{tr(latest.course)}</b></div><div><small>{tr("Guruh")}</small><b>{tr(latest.group)}</b></div></div>
              <p><FiAward /> {tr("Har shanba kungi mock test orqali haftalik o‘sishingizni kuzatib boring.")}</p>
            </article>
            {results.length > 1 && <section className="mock-history" aria-labelledby="mock-history-title"><div className="mock-history__heading"><small>{tr("Natijalar tarixi")}</small><h2 id="mock-history-title">{tr("Oldingi haftalardagi natijalar")}</h2></div><div>{results.slice(1).map((item) => { const itemPercentage = Math.round((item.correctAnswers / item.totalQuestions) * 100); return <article key={item.id || `${item.mockDate}-${item.course}`}><time>{formatDate(item.mockDate)}</time><strong>{item.correctAnswers}/{item.totalQuestions}</strong><span>{itemPercentage}%</span><small>{tr(item.course)} · {tr(item.group)}</small></article>; })}</div></section>}
          </> : searched ? <div className="mandate-empty"><FiSearch /><h2>{tr(status === "error" ? "Tekshiruvda xatolik yuz berdi" : "Natija topilmadi")}</h2><p>{tr(status === "error" ? "Birozdan so‘ng qayta urinib ko‘ring yoki administrator bilan bog‘laning." : "Ism va familiyani to‘liq, xatosiz yozib qayta urinib ko‘ring.")}</p></div> : null}
        </div>
      </section>
    </main>
  );
};

export default MandatePage;
