import { FiArrowRight, FiFileText, FiShield } from "react-icons/fi";
import { Link } from "react-router-dom";
import Seo from "../Components/Seo";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const DocumentsPage = () => {
  const { tr } = useSitePreferences();
  const { content: { documents } } = useContent();
  return (
    <main className="documents-page">
      <Seo title={tr("Rasmiy hujjatlar")} description={tr("Bright Education markazining hujjatlari, shartnoma namunasi va ichki qoidalari.")} path="/documents" />
      <header className="documents-hero"><div className="container"><span className="section-kicker section-kicker--light">{tr("Ishonch va shaffoflik")}</span><h1>{tr("Markaz hujjatlari bir joyda.")}</h1><p>{tr("Ota-ona ta’lim shartlari va markaz qoidalari bilan ro‘yxatdan o‘tishdan oldin tanishishi mumkin.")}</p></div></header>
      <section className="section documents-section"><div className="container documents-grid">
        {documents.map((document, index) => <article className="document-item" key={document.id}><div><FiFileText /><span>0{index + 1}</span></div><h2>{tr(document.title)}</h2><p>{tr(document.description)}</p><small>{tr(document.number)}</small>{document.url ? <Link to={document.url}>{tr("Hujjatni ochish")} <FiArrowRight /></Link> : <Link to="/contact">{tr("Nusxasini so‘rash")} <FiArrowRight /></Link>}</article>)}
      </div><div className="container documents-note"><FiShield /><p><strong>{tr("Muhim eslatma")}</strong><span>{tr("Namunaviy raqam va fayllarni haqiqiy hujjatlar bilan almashtiring.")}</span></p></div></section>
    </main>
  );
};

export default DocumentsPage;
