import { useEffect, useState } from "react";
import { FiArrowUpRight, FiBell, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";
import { getPushErrorMessage, getPushStatus, subscribeToNewsPush, unsubscribeFromNewsPush } from "../services/pushService";

const News = () => {
  const { t, tr } = useSitePreferences();
  const { content: { news } } = useContent();
  const [pushStatus, setPushStatus] = useState("checking");
  const [pushMessage, setPushMessage] = useState("");

  useEffect(() => { let active = true; const refresh = () => { void getPushStatus().then((status) => { if (active) setPushStatus(status); }); }; refresh(); window.addEventListener("bright-push-change", refresh); return () => { active = false; window.removeEventListener("bright-push-change", refresh); }; }, []);

  const togglePush = async () => {
    setPushMessage(""); setPushStatus("loading");
    try {
      const wasSubscribed = await getPushStatus() === "subscribed";
      if (wasSubscribed) { await unsubscribeFromNewsPush(); setPushStatus("idle"); setPushMessage(tr("Bildirishnomalar o‘chirildi.")); }
      else { await subscribeToNewsPush(); setPushStatus("subscribed"); setPushMessage(tr("Tayyor! Yangi yangilik chiqqanda bildirishnoma olasiz.")); }
    } catch (error) {
      const nextStatus = await getPushStatus();
      setPushStatus(nextStatus);
      setPushMessage(tr(getPushErrorMessage(error)));
    }
  };

  const pushLabel = {
    checking: "Tekshirilmoqda...", loading: "Kutilmoqda...", subscribed: "Bildirishnomalar yoqilgan", denied: "Ruxsat bloklangan",
    insecure: "HTTPS orqali oching", unsupported: "Qurilma qo‘llamaydi", "not-configured": "Push sozlanmagan", idle: t("news.notify"),
  }[pushStatus];
  const pushDisabled = ["checking", "loading", "denied", "insecure", "unsupported", "not-configured"].includes(pushStatus);
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
        <div className="push-subscribe-action"><button className={`button button--dark ${pushStatus === "subscribed" ? "push-active" : ""}`} type="button" onClick={togglePush} disabled={pushDisabled}>{pushLabel} <FiBell aria-hidden="true" /></button>{pushMessage && <small role="status">{pushMessage}</small>}</div>
      </div>
    </div>
  </section>
  );
};

export default News;
