import { FiArrowUpRight, FiBell, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { news } from "../data/news";
import { useSitePreferences } from "../context/sitePreferencesContext";

const News = () => {
  const { t, tr } = useSitePreferences();
  return (
  <section id="news" className="section news-section">
    <div className="container">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-kicker">{t("news.kicker")}</span>
          <h2>{t("news.title")}</h2>
        </div>
        <p>{t("news.intro")}</p>
      </div>

      <div className="news-grid">
        {news.map((item) => (
          <article className={`news-card ${item.featured ? "news-card--featured" : ""}`} key={item.id}>
            <div className="news-card__media">
              <img src={item.image} alt={tr(item.title)} loading="lazy" />
              <span className="news-card__category"><FiBell aria-hidden="true" /> {tr(item.category)}</span>
              <strong>{tr(item.status)}</strong>
            </div>
            <div className="news-card__body">
              <time dateTime={item.isoDate}><FiCalendar aria-hidden="true" /> {tr(item.date)}</time>
              <h3>{tr(item.title)}</h3>
              <p>{tr(item.description)}</p>
              <Link to={`/news/${item.id}`}>{tr("Batafsil o‘qish")} <FiArrowUpRight aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </div>

      <div className="news-subscribe">
        <span><FiBell aria-hidden="true" /></span>
        <div><strong>{t("news.subscribe")}</strong><p>{t("news.subscribeText")}</p></div>
        <Link className="button button--dark" to="/#aloqa">{t("news.notify")} <FiArrowUpRight aria-hidden="true" /></Link>
      </div>
    </div>
  </section>
  );
};

export default News;
