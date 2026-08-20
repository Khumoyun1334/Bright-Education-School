import { FiArrowRight, FiClock, FiMessageCircle, FiTrendingUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const Results = () => {
  const { t, tr } = useSitePreferences();
  const { content: { courseProgress, monthlyProgress, parentQuotes, results } } = useContent();
  const linePoints = monthlyProgress.map((item, index) => {
    const x = 42 + index * (516 / Math.max(monthlyProgress.length - 1, 1));
    const y = 210 - item.value * 1.72;
    return { ...item, x, y };
  });
  return (
  <section id="results" className="section results-section">
    <div className="container">
      <div className="section-heading section-heading--split">
        <div><span className="section-kicker section-kicker--light">{t("results.kicker")}</span><h2>{t("results.title")}</h2></div>
        <p>{t("results.intro")}</p>
      </div>

      <div className="result-grid">
        {results.map((item) => (
          <article className="result-card" key={item.name}>
            <div className="result-card__media">
              <img src={item.image} alt={`${item.name} — ${tr(item.course)}`} loading="lazy" />
              <span>{tr(item.course)}</span>
              {item.demo && <small>{t("results.demo")}</small>}
            </div>
            <div className="result-card__body">
              <span className="result-label"><FiTrendingUp /> {tr(item.label)}</span>
              <strong>{tr(item.result)}</strong>
              <blockquote>“{tr(item.quote)}”</blockquote>
              <div><b>{item.name}</b><span><FiClock /> {tr(item.duration)}</span></div>
            </div>
          </article>
        ))}
      </div>

      <section className="result-analytics" aria-labelledby="result-analytics-title">
        <div className="result-analytics__heading">
          <div><span className="section-kicker section-kicker--light">{t("results.analytics")}</span><h3 id="result-analytics-title">{t("results.analyticsTitle")}</h3><p>{t("results.analyticsIntro")}</p></div>
          <small>{t("results.sample")}</small>
        </div>

        <div className="analytics-grid">
          <figure className="analytics-card analytics-card--line">
            <figcaption><strong>{t("results.monthly")}</strong><span><b>+40%</b> {tr("6 oyda")}</span></figcaption>
            <div className="line-chart">
              <svg viewBox="0 0 600 230" role="img" aria-label={t("results.monthly")}>
                <defs>
                  <linearGradient id="progress-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#bdeb78" stopOpacity=".38" />
                    <stop offset="100%" stopColor="#bdeb78" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[38, 81, 124, 167, 210].map((y, index) => <line key={y} x1="42" x2="558" y1={y} y2={y} className="chart-grid-line" data-label={`${100 - index * 25}%`} />)}
                <polygon points={`42,210 ${linePoints.map((point) => `${point.x},${point.y}`).join(" ")} 558,210`} fill="url(#progress-fill)" />
                <polyline points={linePoints.map((point) => `${point.x},${point.y}`).join(" ")} className="chart-line" />
                {linePoints.map((point) => <g key={point.month}><circle cx={point.x} cy={point.y} r="6" className="chart-point" /><text x={point.x} y={point.y - 14} textAnchor="middle">{point.value}%</text></g>)}
              </svg>
              <div className="chart-months">{monthlyProgress.map((item) => <span key={item.month}>{tr(item.month)}</span>)}</div>
            </div>
          </figure>

          <figure className="analytics-card analytics-card--bars">
            <figcaption><strong>{t("results.byCourse")}</strong><span className="chart-legend"><i /> {t("results.start")} <i /> {t("results.current")}</span></figcaption>
            <div className="course-bars">
              {courseProgress.map((item) => (
                <div className="course-bar" key={item.course}>
                  <div><strong>{tr(item.course)}</strong><span>{item.current}%</span></div>
                  <div className="bar-track bar-track--start"><i style={{ width: `${item.start}%` }} /></div>
                  <div className="bar-track bar-track--current"><i style={{ width: `${item.current}%` }} /></div>
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <Link className="mandate-check-link" to="/mandate"><span><FiTrendingUp /></span><div><small>{tr("Haftalik mock test")}</small><strong>{tr("Natijani to‘liq ism-familiya orqali tekshiring")}</strong></div><FiArrowRight /></Link>

      <div className="parent-voices">
        <div className="parent-voices__title"><span><FiMessageCircle /></span><div><small>{tr("Ota-onalar qadrlaydigan jihatlar")}</small><strong>{tr("Ishonch, tartib va doimiy aloqa.")}</strong></div></div>
        <div className="parent-voices__quotes">
          {parentQuotes.map((quote) => <p key={quote.text || quote}>“{tr(quote.text || quote)}”</p>)}
        </div>
        <Link to="/#aloqa" aria-label="Maslahat olish"><FiArrowRight /></Link>
      </div>
    </div>
  </section>
  );
};

export default Results;
