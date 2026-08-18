import { FiArrowRight, FiAward, FiBookOpen, FiBriefcase, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { team } from "../data/team";
import { useSitePreferences } from "../context/sitePreferencesContext";

const Team = () => {
  const { t, tr } = useSitePreferences();
  return (
  <section id="team" className="section team-section">
    <div className="container">
      <div className="section-heading section-heading--split">
        <div>
          <span className="section-kicker">{t("team.kicker")}</span>
          <h2>{t("team.title")}</h2>
        </div>
        <div className="team-heading-copy">
          <p>{t("team.intro")}</p>
          <div><span><FiBookOpen /> {tr("4 ta ustozlar yo‘nalishi")}</span><span><FiUsers /> {tr("2 ta xizmat bo‘limi")}</span></div>
        </div>
      </div>

      <div className="team-grid">
        {team.map((member, index) => (
          <article className={`team-card team-card--${member.type}`} key={member.name}>
            <div className="team-card__media">
              <img src={member.photo} alt={`${member.name} — ${tr(member.role)}`} loading="lazy" />
              <span className="team-index">0{index + 1}</span>
              {member.demo && <span className="team-demo">{t("team.demo")}</span>}
            </div>
            <div className="team-card__body">
              <span className="team-role">{tr(member.role)}</span>
              <h3>{member.name}</h3>
              <div className="team-facts">
                <span><FiBriefcase /> {tr(member.experience)}</span>
                <span><FiAward /> {tr(member.qualification)}</span>
              </div>
              <p>{tr(member.description)}</p>
              <div className="team-card__footer"><span>{tr(member.tag)}</span><Link to="/#aloqa" aria-label={member.name}><FiArrowRight /></Link></div>
            </div>
          </article>
        ))}
      </div>

      <div className="team-note">
        <div><strong>{t("team.note")}</strong><p>{t("team.noteText")}</p></div>
        <Link className="button button--dark" to="/#aloqa">{t("team.action")} <FiArrowRight /></Link>
      </div>
    </div>
  </section>
  );
};

export default Team;
