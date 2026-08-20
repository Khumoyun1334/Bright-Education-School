import { FiArrowLeft, FiArrowRight, FiBell, FiCalendar, FiCheck, FiShare2 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import Seo from "../Components/Seo";
import { useContent } from "../context/contentContext";

const NewsDetail = () => {
  const { id } = useParams();
  const { tr } = useSitePreferences();
  const { content: { news } } = useContent();
  const item = news.find((entry) => entry.id === id);

  if (!item) {
    return (
      <main className="not-found">
        <span>404</span>
        <h1>{tr("Yangilik topilmadi")}</h1>
        <p>{tr("Siz izlayotgan yangilik mavjud emas yoki manzili o‘zgargan.")}</p>
        <Link className="button button--dark" to="/#news"><FiArrowLeft /> {tr("Yangiliklarga qaytish")}</Link>
      </main>
    );
  }

  const related = news.filter((entry) => entry.id !== id).slice(0, 2);
  const actionHref = item.href?.startsWith("/") ? item.href : `/${item.href || "#aloqa"}`;

  return (
    <main className="news-detail-page">
      <Seo title={tr(item.title)} description={tr(item.description)} path={`/news/${item.id}`} jsonLd={{ "@context": "https://schema.org", "@type": "NewsArticle", headline: tr(item.title), datePublished: item.isoDate, image: item.image, publisher: { "@type": "EducationalOrganization", name: "Bright Education School" } }} />
      <header className="news-detail-hero">
        <div className="container">
          <Link className="back-link" to="/#news"><FiArrowLeft /> {tr("Barcha yangiliklar")}</Link>
          <div className="news-detail-hero__grid">
            <div className="news-detail-hero__copy">
              <div className="news-detail-meta"><span><FiBell /> {tr(item.category)}</span><time dateTime={item.isoDate}><FiCalendar /> {tr(item.date)}</time></div>
              <h1>{tr(item.title)}</h1>
              <p>{tr(item.description)}</p>
            </div>
            <div className="news-detail-hero__image"><img src={item.image} alt={tr(item.title)} /><strong>{tr(item.status)}</strong></div>
          </div>
        </div>
      </header>

      <section className="section news-article-section">
        <div className="container news-article-layout">
          <article className="news-article">
            <span className="section-kicker">Bright Education</span>
            {item.body.map((paragraph) => <p key={paragraph}>{tr(paragraph)}</p>)}
            <div className="news-facts">
              {item.facts.map((fact) => <div key={fact}><FiCheck /><span>{tr(fact)}</span></div>)}
            </div>
            <div className="news-article__action">
              <div><FiShare2 /><span><small>{tr("Keyingi qadam")}</small><strong>{tr(item.action)}</strong></span></div>
              <Link className="button button--dark" to={actionHref}>{tr(item.action)} <FiArrowRight /></Link>
            </div>
          </article>

          <aside className="related-news">
            <span className="section-kicker">{tr("Yana o‘qing")}</span>
            {related.map((entry) => (
              <Link to={`/news/${entry.id}`} key={entry.id}>
                <img src={entry.image} alt="" loading="lazy" />
                <span><small>{tr(entry.category)}</small><strong>{tr(entry.title)}</strong><i>{tr("O‘qish")} <FiArrowRight /></i></span>
              </Link>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default NewsDetail;
