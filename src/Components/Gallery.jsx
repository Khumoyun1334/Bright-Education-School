import { useEffect, useState } from "react";
import { FiMaximize2, FiX } from "react-icons/fi";
import { gallery } from "../data/gallery";
import { useSitePreferences } from "../context/sitePreferencesContext";

const Gallery = () => {
  const [selected, setSelected] = useState(null);
  const { tr } = useSitePreferences();

  useEffect(() => {
    if (!selected) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setSelected(null);
    document.body.classList.add("gallery-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("gallery-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section className="section gallery-section">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div><span className="section-kicker">{tr("Markaz hayoti")}</span><h2>{tr("Darsdan tashqarida ham rivojlanadigan muhit.")}</h2></div>
          <div className="gallery-heading"><p>{tr("Ota-onalar markazdagi muhitni ko‘rishi uchun darslar, tadbirlar va o‘quvchilar hayotidan lavhalar.")}</p><span>{tr("Hozircha namunaviy rasmlar")}</span></div>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button type="button" className={`gallery-item gallery-item--${index + 1}`} onClick={() => setSelected(item)} key={item.title}>
              <img src={item.image} alt={tr(item.title)} loading="lazy" />
              <span>{tr(item.title)}</span><FiMaximize2 />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={tr(selected.title)} onClick={() => setSelected(null)}>
          <button type="button" onClick={() => setSelected(null)} aria-label={tr("Rasmni yopish")}><FiX /></button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={selected.image} alt={tr(selected.title)} />
            <figcaption>{tr(selected.title)}<span>Bright Education School</span></figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Gallery;
