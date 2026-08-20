import { useEffect, useRef, useState } from "react";
import { FiAward, FiBookOpen, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const icons = { users: <FiUsers />, award: <FiAward />, book: <FiBookOpen />, trend: <FiTrendingUp /> };

const AnimatedValue = ({ value }) => {
  const ref = useRef(null);
  const [visibleValue, setVisibleValue] = useState(value.match(/\d/) ? "0" : value);

  useEffect(() => {
    const match = value.match(/([\d\s]+)(.*)/);
    if (!match || !ref.current) return undefined;
    const target = Number(match[1].replace(/\s/g, ""));
    const suffix = match[2];
    const formatter = new Intl.NumberFormat("uz-UZ");
    let animationFrame;
    let startTime;

    const start = () => {
      const tick = (time) => {
        startTime ??= time;
        const progress = Math.min((time - startTime) / 1200, 1);
        const eased = 1 - (1 - progress) ** 3;
        setVisibleValue(`${formatter.format(Math.round(target * eased))}${suffix}`);
        if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
      };
      animationFrame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      start();
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return <strong ref={ref}>{visibleValue}</strong>;
};

export default function StatsCards() {
  const { tr } = useSitePreferences();
  const { content: { stats } } = useContent();
  return (
    <section id="numbers" className="stats-section" aria-label="Bright Education">
      <div className="container stats-grid">
        {stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <div className="stat-icon">{icons[item.icon] || <FiTrendingUp />}</div>
            <div><AnimatedValue value={tr(item.value)} /><b>{tr(item.label)}</b><span>{tr(item.note)}</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}
