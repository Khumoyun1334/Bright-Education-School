import { useEffect, useMemo, useState } from "react";
import { SitePreferencesContext } from "./sitePreferencesContext";
import { contentTranslations } from "../i18n/contentTranslations";

const copy = {
  uz: {
    "hero.admission": "2026 qabul ochiq", "hero.practice": "Amaliy dars",
    "nav.home": "Bosh sahifa", "nav.courses": "Kurslar", "nav.news": "Yangiliklar", "nav.results": "Natijalar", "nav.team": "Jamoamiz", "nav.contact": "Kontakt", "nav.consultation": "Bepul maslahat",
    "controls.search": "Saytdan qidirish", "controls.light": "Yorug‘ rejim", "controls.dark": "Tungi rejim", "controls.language": "Tilni tanlash", "controls.openMenu": "Menyuni ochish", "controls.closeMenu": "Menyuni yopish", "controls.backTop": "Sahifa tepasiga qaytish",
    "search.title": "Nimani izlayapsiz?", "search.subtitle": "Kurslar, o‘qituvchilar, xodimlar va yangiliklar bo‘yicha qidiring.", "search.placeholder": "Masalan: ingliz tili, matematika yoki o‘qituvchi", "search.close": "Qidiruvni yopish", "search.empty": "So‘rovingiz bo‘yicha ma’lumot topilmadi.", "search.hint": "Qidirishni boshlash uchun kamida 2 ta harf kiriting.", "search.results": "ta natija", "search.course": "Kurs", "search.team": "Jamoa", "search.news": "Yangilik", "search.section": "Bo‘lim", "search.open": "Ochish",
    "hero.eyebrow": "Farzandingiz kelajagi uchun", "hero.titleStart": "Mustahkam bilim,", "hero.titleAccent": "ishonchli", "hero.titleEnd": "kelajak.", "hero.lead": "Farzandingiz tajribali ustozlar, tartibli muhit va aniq o‘quv rejasi bilan o‘z salohiyatini to‘liq namoyon qilsin.", "hero.choose": "Kursni tanlash", "hero.how": "Qanday o‘qiymiz?", "hero.order": "Tartibli muhit", "hero.noPhone": "Telefonlarsiz dars", "hero.parent": "Ota-ona bilan aloqa", "hero.directions": "6 yo‘nalish", "hero.rightCourse": "Farzandingizga mos kurs", "hero.trust": "Ishonchli muhit", "hero.promise": "Bilim, odob va natija bir joyda",
    "courses.kicker": "Yo‘nalishlar", "courses.title": "Maqsadingizga mos kursni tanlang", "courses.intro": "Har bir kurs tushunarli dastur, amaliy mashg‘ulot va muntazam tahlil asosida tashkil etilgan.", "courses.price": "Kurs narxi", "courses.detail": "Kurs haqida batafsil", "courses.question": "Qaysi kurs mosligini bilmaysizmi?", "courses.consult": "Bepul maslahat oling",
    "news.kicker": "E’lon va yangiliklar", "news.title": "Markazdagi eng so‘nggi yangiliklardan xabardor bo‘ling", "news.intro": "Yangi guruhlar, imtihon va mandat natijalari hamda markaz hayotidagi muhim voqealar shu yerda e’lon qilinadi.", "news.subscribe": "Yangi guruh ochilganda birinchilardan bo‘lib biling", "news.subscribeText": "Administrator farzandingizga mos guruh va dars vaqti haqida xabar beradi.", "news.notify": "Xabardor bo‘lish",
    "team.kicker": "Xodimlar va o‘qituvchilar", "team.title": "Farzandingiz bilan ishlaydigan jamoa", "team.intro": "Ta’lim natijasi dasturga ham, bolaning yonida turgan jamoaga ham bog‘liq.", "team.demo": "Namuna profil", "team.note": "Har bir guruhga mos ustoz", "team.noteText": "O‘quvchining yoshi, darajasi va maqsadiga qarab ustoz va guruh tanlanadi.", "team.action": "Jamoa bilan tanishish",
    "results.kicker": "O‘quvchilar natijalari", "results.title": "Raqamdan ham muhim — boladagi o‘zgarish", "results.intro": "Ota-ona uchun eng kuchli dalil — farzandining bilimida, ishonchida va intizomida ko‘rinadigan o‘sish.", "results.demo": "Namuna natija", "results.analytics": "Natijalar tahlili", "results.analyticsTitle": "O‘sishni raqamlarda kuzating", "results.analyticsIntro": "Sinovlar va amaliy vazifalar asosidagi rivojlanish dinamikasi.", "results.monthly": "Oylik umumiy o‘sish", "results.byCourse": "Kurslar bo‘yicha o‘zlashtirish", "results.start": "Boshlang‘ich", "results.current": "Hozirgi", "results.sample": "Namunaviy ma’lumot",
    "rules.kicker": "Markaz qoidalari", "rules.title": "Bilim uchun tartibli va sokin muhit", "rules.intro": "Qoidalar har bir o‘quvchining vaqti, diqqati va natijasini himoya qiladi.", "rules.important": "Qat’iyan taqiqlanadi",
  },
  ru: {
    "hero.admission": "Набор 2026 открыт", "hero.practice": "Практический урок",
    "nav.home": "Главная", "nav.courses": "Курсы", "nav.news": "Новости", "nav.results": "Результаты", "nav.team": "Команда", "nav.contact": "Контакты", "nav.consultation": "Бесплатная консультация",
    "controls.search": "Поиск по сайту", "controls.light": "Светлая тема", "controls.dark": "Тёмная тема", "controls.language": "Выбрать язык", "controls.openMenu": "Открыть меню", "controls.closeMenu": "Закрыть меню", "controls.backTop": "Вернуться наверх",
    "search.title": "Что вы ищете?", "search.subtitle": "Ищите курсы, преподавателей, сотрудников и новости.", "search.placeholder": "Например: английский язык, математика или преподаватель", "search.close": "Закрыть поиск", "search.empty": "По вашему запросу ничего не найдено.", "search.hint": "Введите не менее 2 букв, чтобы начать поиск.", "search.results": "результатов", "search.course": "Курс", "search.team": "Команда", "search.news": "Новость", "search.section": "Раздел", "search.open": "Открыть",
    "hero.eyebrow": "Для будущего вашего ребёнка", "hero.titleStart": "Прочные знания,", "hero.titleAccent": "уверенное", "hero.titleEnd": "будущее.", "hero.lead": "Помогите ребёнку раскрыть свой потенциал с опытными преподавателями, дисциплиной и понятным учебным планом.", "hero.choose": "Выбрать курс", "hero.how": "Как мы учим?", "hero.order": "Дисциплина", "hero.noPhone": "Уроки без телефонов", "hero.parent": "Связь с родителями", "hero.directions": "6 направлений", "hero.rightCourse": "Курс для вашего ребёнка", "hero.trust": "Надёжная среда", "hero.promise": "Знания, воспитание и результат",
    "courses.kicker": "Направления", "courses.title": "Выберите курс для своей цели", "courses.intro": "Каждый курс построен на понятной программе, практике и регулярном анализе.", "courses.price": "Стоимость курса", "courses.detail": "Подробнее о курсе", "courses.question": "Не знаете, какой курс выбрать?", "courses.consult": "Получить консультацию",
    "news.kicker": "Объявления и новости", "news.title": "Будьте в курсе последних новостей центра", "news.intro": "Здесь публикуются новые группы, результаты экзаменов и мандата, а также важные события центра.", "news.subscribe": "Узнавайте первыми об открытии новых групп", "news.subscribeText": "Администратор сообщит о подходящей группе и времени занятий.", "news.notify": "Получать новости",
    "team.kicker": "Сотрудники и преподаватели", "team.title": "Команда, которая работает с вашим ребёнком", "team.intro": "Результат обучения зависит и от программы, и от команды рядом с ребёнком.", "team.demo": "Пример профиля", "team.note": "Подходящий преподаватель для каждой группы", "team.noteText": "Преподаватель и группа подбираются по возрасту, уровню и цели ученика.", "team.action": "Познакомиться с командой",
    "results.kicker": "Результаты учеников", "results.title": "Важнее цифр — изменения в ребёнке", "results.intro": "Главное доказательство для родителей — рост знаний, уверенности и дисциплины ребёнка.", "results.demo": "Пример результата", "results.analytics": "Аналитика результатов", "results.analyticsTitle": "Отслеживайте рост в цифрах", "results.analyticsIntro": "Динамика развития по тестам и практическим заданиям.", "results.monthly": "Общий рост по месяцам", "results.byCourse": "Успеваемость по курсам", "results.start": "Начальный", "results.current": "Текущий", "results.sample": "Пример данных",
    "rules.kicker": "Правила центра", "rules.title": "Спокойная и дисциплинированная среда для знаний", "rules.intro": "Правила защищают время, внимание и результат каждого ученика.", "rules.important": "Строго запрещено",
  },
  en: {
    "hero.admission": "2026 admission open", "hero.practice": "Practical lesson",
    "nav.home": "Home", "nav.courses": "Courses", "nav.news": "News", "nav.results": "Results", "nav.team": "Our team", "nav.contact": "Contact", "nav.consultation": "Free consultation",
    "controls.search": "Search the site", "controls.light": "Light mode", "controls.dark": "Dark mode", "controls.language": "Choose language", "controls.openMenu": "Open menu", "controls.closeMenu": "Close menu", "controls.backTop": "Back to top",
    "search.title": "What are you looking for?", "search.subtitle": "Search courses, teachers, staff and news.", "search.placeholder": "For example: English, mathematics or teacher", "search.close": "Close search", "search.empty": "No information matched your search.", "search.hint": "Enter at least 2 letters to start searching.", "search.results": "results", "search.course": "Course", "search.team": "Team", "search.news": "News", "search.section": "Section", "search.open": "Open",
    "hero.eyebrow": "For your child’s future", "hero.titleStart": "Strong knowledge,", "hero.titleAccent": "confident", "hero.titleEnd": "future.", "hero.lead": "Let your child reach their full potential with experienced teachers, a focused environment and a clear learning plan.", "hero.choose": "Choose a course", "hero.how": "How do we teach?", "hero.order": "Focused environment", "hero.noPhone": "Phone-free lessons", "hero.parent": "Parent communication", "hero.directions": "6 directions", "hero.rightCourse": "The right course for your child", "hero.trust": "Trusted environment", "hero.promise": "Knowledge, character and results",
    "courses.kicker": "Directions", "courses.title": "Choose the course that fits your goal", "courses.intro": "Every course is built around a clear program, practical lessons and regular progress reviews.", "courses.price": "Course fee", "courses.detail": "Course details", "courses.question": "Not sure which course is right?", "courses.consult": "Get a free consultation",
    "news.kicker": "Announcements and news", "news.title": "Stay up to date with the latest centre news", "news.intro": "New groups, exam and mandate results, and important centre events are published here.", "news.subscribe": "Be the first to know when a new group opens", "news.subscribeText": "An administrator will tell you about the right group and lesson time.", "news.notify": "Keep me informed",
    "team.kicker": "Staff and teachers", "team.title": "The team working with your child", "team.intro": "Learning outcomes depend on both the program and the team supporting the child.", "team.demo": "Sample profile", "team.note": "The right teacher for every group", "team.noteText": "Teachers and groups are selected by the student’s age, level and goal.", "team.action": "Meet the team",
    "results.kicker": "Student results", "results.title": "More important than numbers — a child’s growth", "results.intro": "The strongest proof for parents is visible growth in knowledge, confidence and discipline.", "results.demo": "Sample result", "results.analytics": "Results analytics", "results.analyticsTitle": "Track progress in numbers", "results.analyticsIntro": "Progress trends based on tests and practical assignments.", "results.monthly": "Overall monthly growth", "results.byCourse": "Progress by course", "results.start": "Starting", "results.current": "Current", "results.sample": "Sample data",
    "rules.kicker": "Centre rules", "rules.title": "A calm, focused environment for learning", "rules.intro": "The rules protect every student’s time, attention and results.", "rules.important": "Strictly prohibited",
  },
};

const getInitialTheme = () => {
  const saved = window.localStorage.getItem("bright-theme");
  if (saved === "light" || saved === "dark") return saved;
  return "light";
};

export const SitePreferencesProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => window.localStorage.getItem("bright-language") || "uz");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("bright-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("bright-theme", theme);
  }, [theme]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    theme,
    toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
    t: (key) => copy[language]?.[key] ?? copy.uz[key] ?? key,
    tr: (text) => contentTranslations[language]?.[text] ?? text,
  }), [language, theme]);

  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
};
