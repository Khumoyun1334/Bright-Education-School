import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCheck, FiClock, FiEdit3, FiLayers, FiMessageCircle, FiUserCheck, FiUsers } from "react-icons/fi";
import { courses } from "../data/courses";
import { useSitePreferences } from "../context/sitePreferencesContext";

const CourseDetail = () => {
  const { id } = useParams();
  const { tr } = useSitePreferences();
  const course = courses.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!course) {
    return (
      <main className="not-found">
        <span>404</span>
        <h1>{tr("Kurs topilmadi")}</h1>
        <p>{tr("Siz izlayotgan kurs mavjud emas yoki manzili o‘zgargan.")}</p>
        <Link className="button button--dark" to="/#courses"><FiArrowLeft /> {tr("Kurslarga qaytish")}</Link>
      </main>
    );
  }

  return (
    <main className={`course-detail course-detail--${course.accent}`}>
      <section className="course-detail-hero">
        <div className="container">
          <Link className="back-link" to="/#courses"><FiArrowLeft /> {tr("Barcha kurslar")}</Link>
          <div className="detail-hero-grid">
            <div className="detail-copy">
              <span className="detail-eyebrow">{tr(course.eyebrow)}</span>
              <h1>{tr(course.title)}</h1>
              <p>{tr(course.description)}</p>
              <div className="detail-meta">
                <div><FiClock /><span><small>{tr("Davomiyligi")}</small><b>{tr(course.duration)}</b></span></div>
                <div><FiLayers /><span><small>{tr("Darslar")}</small><b>{tr(course.lessons)}</b></span></div>
                <div><FiUsers /><span><small>{tr("Format")}</small><b>{tr(course.classSize)}</b></span></div>
              </div>
              <Link className="button button--primary" to={`/?course=${course.id}#aloqa`}>{tr("Kursga yozilish")} <FiArrowRight /></Link>
            </div>
            <div className="detail-image">
              <img src={course.img} alt={tr(course.title)} />
              <div className="detail-price"><small>{tr("Oylik to‘lov")}</small><strong>{tr(course.price)}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section detail-content">
        <div className="container detail-content-grid">
          <div>
            <span className="section-kicker">{tr("Kimlar uchun?")}</span>
            <h2>{tr("Sizga mos bo‘lishi mumkin, agar...")}</h2>
            <p className="detail-audience">{tr(course.audience)}</p>
            <div className="skill-list">
              {course.skills.map((skill) => <div key={skill}><span><FiCheck /></span>{tr(skill)}</div>)}
            </div>
          </div>
          <div className="program-card">
            <span className="section-kicker">{tr("Kurs dasturi")}</span>
            <h2>{tr("Qadam-baqadam reja")}</h2>
            <ol>
              {course.program.map((step, index) => <li key={step}><span>0{index + 1}</span><b>{tr(step)}</b></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section course-learning-section">
        <div className="container course-learning-grid">
          <article className="teacher-card">
            <div className="teacher-card__icon"><FiUserCheck /></div>
            <span className="section-kicker">{tr("Kim dars o‘tadi?")}</span>
            <h2>{tr(course.teacher.name)}</h2>
            <strong>{tr(course.teacher.role)}</strong>
            <p>{tr(course.teacher.note)}</p>
            <Link to={`/?course=${course.id}#aloqa`} className="text-link">{tr("Ustoz haqida so‘rash")} <span>↗</span></Link>
          </article>
          <div className="lesson-process">
            <span className="section-kicker">{tr("Dars jarayoni")}</span>
            <h2>{tr("Har bir mashg‘ulot 4 qismdan iborat.")}</h2>
            <div className="lesson-process__grid">
              <div><span><FiMessageCircle /></span><b>{tr("Qisqa takrorlash")}</b><p>{tr("Oldingi mavzu va vazifa savol-javob orqali tekshiriladi.")}</p></div>
              <div><span><FiBookOpen /></span><b>{tr("Yangi mavzu")}</b><p>{tr("Ustoz mavzuni sodda misollar bilan tushuntiradi.")}</p></div>
              <div><span><FiEdit3 /></span><b>{tr("Ko‘proq amaliyot")}</b><p>{tr("O‘quvchi vazifa va mashqlarni mustaqil bajaradi.")}</p></div>
              <div><span><FiCheck /></span><b>{tr("Fikr va vazifa")}</b><p>{tr("Xatolar tushuntiriladi va keyingi vazifa belgilanadi.")}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-cta">
        <div className="container">
          <div><span>{tr("Keyingi qadam")}</span><h2>{tr("Savollaringizga javob beramiz.")}</h2></div>
          <Link className="button button--light" to={`/?course=${course.id}#aloqa`}>{tr("Bepul maslahat olish")} <FiArrowRight /></Link>
        </div>
      </section>
    </main>
  );
};

export default CourseDetail;
