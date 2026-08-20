import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiCalendar, FiClock, FiUsers } from "react-icons/fi";
import { useSitePreferences } from "../context/sitePreferencesContext";
import { useContent } from "../context/contentContext";

const Courses = () => {
  const { t, tr } = useSitePreferences();
  const { content: { courses } } = useContent();
  return (
  <section id="courses" className="section courses-section">
    <div className="container">
      <div className="section-heading section-heading--split">
        <div><span className="section-kicker">{t("courses.kicker")}</span><h2>{t("courses.title")}</h2></div>
        <p>{t("courses.intro")}</p>
      </div>

      <div className="course-grid">
        {courses.map((course, index) => (
          <article className={`course-card course-card--${course.accent}`} key={course.id}>
            <Link to={`/courses/${course.id}`} className="course-image-link" aria-label={tr(course.title)}>
              <img src={course.img} alt={tr(course.title)} loading="lazy" />
              <span className="course-number">0{index + 1}</span>
              <span className="course-pill">{tr(course.eyebrow)}</span>
            </Link>
            <div className="course-body">
              <h3>{tr(course.title)}</h3>
              <p>{tr(course.description)}</p>
              <div className="course-meta">
                <span><FiClock /> {tr(course.duration)}</span>
                <span><FiUsers /> {tr(course.lessons)}</span>
              </div>
              {course.groups?.[0] && <div className="course-next-group"><span><FiCalendar /> {tr("Yaqin guruh")}</span><b>{tr(course.groups[0].startDate)}</b><small>{tr(course.groups[0].seats)}</small></div>}
              <div className="course-footer">
                <div><small>{t("courses.price")}</small><b>{tr(course.price)}</b></div>
              </div>
              <Link className="course-detail-link" to={`/courses/${course.id}`}>{t("courses.detail")} <FiArrowRight /></Link>
            </div>
          </article>
        ))}
      </div>
      <div className="courses-note"><span>{t("courses.question")}</span><Link to="/#aloqa">{t("courses.consult")} <FiArrowUpRight /></Link></div>
    </div>
  </section>
  );
};

export default Courses;
