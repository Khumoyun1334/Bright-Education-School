import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMessageCircle, FiPlay, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const youtubeEmbed = (url = "") => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

const VideoStories = () => {
  const [activeStory, setActiveStory] = useState(null);
  const { tr } = useSitePreferences();
  const { content: { stories } } = useContent();

  useEffect(() => {
    if (!activeStory) return undefined;
    const close = (event) => event.key === "Escape" && setActiveStory(null);
    document.body.classList.add("story-open");
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("story-open");
      window.removeEventListener("keydown", close);
    };
  }, [activeStory]);

  return (
    <section className="section video-stories-section" aria-labelledby="stories-title">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div><span className="section-kicker">{tr("Video fikrlar")}</span><h2 id="stories-title">{tr("Natijani ota-onalar va o‘quvchilar tilidan eshiting.")}</h2></div>
          <p>{tr("Bu blok haqiqiy video havolalarni qo‘shishga tayyor. Hozircha profillar namunaviy ko‘rinishda berilgan.")}</p>
        </div>
        <div className="video-stories-grid">
          {stories.map((story, index) => (
            <button className={`video-story video-story--${index + 1}`} type="button" key={story.name} onClick={() => setActiveStory(story)} aria-label={`${tr(story.name)} — ${tr("fikrni ko‘rish")}`}>
              <img src={story.image} alt={tr(story.name)} loading="lazy" />
              <span className="video-story__shade" />
              <span className="video-story__play"><FiPlay /></span>
              <span className="video-story__copy"><small>{tr(story.result)}</small><strong>{tr(story.name)}</strong><q>{tr(story.quote)}</q></span>
            </button>
          ))}
        </div>
        <div className="video-stories-cta"><FiMessageCircle /><p><strong>{tr("Farzandingiz uchun ham natijaga yo‘l oching")}</strong><span>{tr("Bepul diagnostika va mos guruh bo‘yicha administrator bilan gaplashing.")}</span></p><Link to="/#aloqa">{tr("Maslahat olish")} <FiArrowUpRight /></Link></div>
      </div>

      {activeStory && (
        <div className="story-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveStory(null)}>
          <article role="dialog" aria-modal="true" aria-labelledby="story-person">
            <button type="button" onClick={() => setActiveStory(null)} aria-label={tr("Yopish")}><FiX /></button>
            <div className="story-modal__media">{activeStory.video ? (youtubeEmbed(activeStory.video) ? <iframe src={youtubeEmbed(activeStory.video)} title={tr(activeStory.name)} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <video src={activeStory.video} controls autoPlay poster={activeStory.image} />) : <><img src={activeStory.image} alt={tr(activeStory.name)} /><span><FiPlay /></span></>}</div>
            <div className="story-modal__copy"><small>{tr(activeStory.video ? "VIDEO FIKR" : "VIDEO UCHUN TAYYOR JOY")}</small><h3 id="story-person">{tr(activeStory.name)}</h3><q>{tr(activeStory.quote)}</q>{!activeStory.video && <p>{tr("Haqiqiy video fayl yoki YouTube havolasini ma’lumotlar qismiga qo‘shganingizda shu oynada video ochiladi.")}</p>}</div>
          </article>
        </div>
      )}
    </section>
  );
};

export default VideoStories;
