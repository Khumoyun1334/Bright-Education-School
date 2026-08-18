import { useEffect, useState } from "react";
import { FiArrowUpRight, FiMessageCircle, FiPlay, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSitePreferences } from "../context/sitePreferencesContext";

const stories = [
  {
    name: "Madina onasi",
    result: "Ingliz tili · 8 oy",
    quote: "Farzandim darsga o‘zi xursand bo‘lib boradi, natijalarini esa har oy ko‘rib turamiz.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Javohirning otasi",
    result: "Matematika · 6 oy",
    quote: "Eng yoqqan tomoni — tartib va ustozning ota-ona bilan doimiy aloqasi.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Sarvinoz",
    result: "IELTS · 7.0",
    quote: "Reja aniq bo‘lgani uchun qayerda xato qilayotganimni va qanday o‘sayotganimni bildim.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
  },
];

const VideoStories = () => {
  const [activeStory, setActiveStory] = useState(null);
  const { tr } = useSitePreferences();

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
            <div className="story-modal__media"><img src={activeStory.image} alt={tr(activeStory.name)} /><span><FiPlay /></span></div>
            <div className="story-modal__copy"><small>{tr("VIDEO UCHUN TAYYOR JOY")}</small><h3 id="story-person">{tr(activeStory.name)}</h3><q>{tr(activeStory.quote)}</q><p>{tr("Haqiqiy video fayl yoki YouTube havolasini ma’lumotlar qismiga qo‘shganingizda shu oynada video ochiladi.")}</p></div>
          </article>
        </div>
      )}
    </section>
  );
};

export default VideoStories;
