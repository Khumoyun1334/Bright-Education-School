import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiBookOpen, FiSearch, FiUser, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { news } from "../data/news";
import { team } from "../data/team";
import { useSitePreferences } from "../context/sitePreferencesContext";

const normalize = (value) => value
  .toLocaleLowerCase()
  .replace(/[’‘`]/g, "'")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

const stopWords = new Set(["haqida", "uchun", "boyicha", "about", "the", "for", "про", "для"]);

const staticSections = [
  { title: "Markaz qoidalari", description: "Telefon, intizom, davomat va markazning ichki tartibi", href: "/#rules", keywords: "правила телефон дисциплина rules phone" },
  { title: "O‘quvchilar natijalari", description: "O‘quvchilar yutuqlari, sertifikatlar va mandat natijalari", href: "/#results", keywords: "natija mandat result результат сертификат" },
  { title: "Bog‘lanish va manzil", description: "Administratorlar telefon raqamlari, manzil va bepul maslahat", href: "/contact", keywords: "kontakt telefon admin manzil contact address контакты адрес" },
];

const SearchDialog = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { t, tr } = useSitePreferences();

  const searchIndex = useMemo(() => [
    ...courses.map((course) => ({ type: "course", title: tr(course.title), description: tr(course.description), href: `/courses/${course.id}`, keywords: `${course.title} ${tr(course.title)} ${course.eyebrow} ${tr(course.eyebrow)} ${course.teacher.name} ${course.skills.join(" ")} course courses курс курсы kurs kurslar` })),
    ...team.map((member) => ({ type: "team", title: member.name, description: tr(member.role), href: "/#team", keywords: `${member.role} ${tr(member.role)} ${member.description} ${tr(member.description)} ${member.tag} ${member.type} xodim xodimlar oqituvchi oqituvchilar o'qituvchi o'qituvchilar teacher teachers staff преподаватель преподаватели сотрудник сотрудники` })),
    ...news.map((item) => ({ type: "news", title: tr(item.title), description: tr(item.description), href: `/news/${item.id}`, keywords: `${item.title} ${tr(item.title)} ${item.category} ${tr(item.category)} ${item.status} ${item.date} yangilik mandat news новость группа` })),
    ...staticSections.map((item) => ({ ...item, title: tr(item.title), description: tr(item.description), type: "section" })),
  ], [tr]);

  const results = useMemo(() => {
    const terms = normalize(query).trim().split(/\s+/).filter((term) => term && !stopWords.has(term));
    if (terms.join("").length < 2) return [];
    return searchIndex.filter((item) => {
      const haystack = normalize(`${item.title} ${item.description} ${item.keywords}`);
      return terms.every((term) => haystack.includes(term));
    }).slice(0, 10);
  }, [query, searchIndex]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.documentElement.classList.add("search-open");
    document.body.classList.add("search-open");
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);

    return () => {
      window.clearTimeout(focusTimer);
      document.documentElement.classList.remove("search-open");
      document.body.classList.remove("search-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const typeIcons = { course: <FiBookOpen />, team: <FiUser />, news: <FiSearch />, section: <FiArrowUpRight /> };

  return (
    <div className="search-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div className="search-dialog__top">
          <div><span className="section-kicker">Bright Education</span><h2 id="search-title">{t("search.title")}</h2><p>{t("search.subtitle")}</p></div>
          <button type="button" onClick={onClose} aria-label={t("search.close")}><FiX /></button>
        </div>
        <label className="search-field">
          <FiSearch aria-hidden="true" />
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("search.placeholder")} autoComplete="off" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label={t("search.close")}><FiX /></button>}
        </label>
        <div className="search-results" aria-live="polite">
          {normalize(query).replace(/\s/g, "").length < 2 ? (
            <p className="search-state">{t("search.hint")}</p>
          ) : results.length ? (
            <>
              <div className="search-count"><strong>{results.length}</strong> {t("search.results")}</div>
              {results.map((item) => (
                <Link to={item.href} className="search-result" key={`${item.type}-${item.title}`} onClick={onClose}>
                  <span>{typeIcons[item.type]}</span>
                  <div><small>{t(`search.${item.type}`)}</small><strong>{item.title}</strong><p>{item.description}</p></div>
                  <FiArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </>
          ) : <p className="search-state search-state--empty">{t("search.empty")}</p>}
        </div>
      </section>
    </div>
  );
};

export default SearchDialog;
