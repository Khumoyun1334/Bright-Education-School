import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/navbar";
import Hero from "./Components/Hero";
import WhyUs from "./Components/WhyUs";
import StatsCards from "./Components/StatsCards";
import Courses from "./Components/Courses";
import LearningPath from "./Components/LearningPath";
import Experience from "./Components/Experience";
import Faq from "./Components/Faq";
import Aloqa from "./Components/Aloqa";
import ParentTrust from "./Components/ParentTrust";
import Rules from "./Components/Rules";
import Team from "./Components/Team";
import Results from "./Components/Results";
import News from "./Components/News";
import Gallery from "./Components/Gallery";
import Footer from "./Components/Futter";
import BackToTop from "./Components/BackToTop";
import TrustProof from "./Components/TrustProof";
import VideoStories from "./Components/VideoStories";
import ScrollReveal from "./Components/ScrollReveal";
import Seo from "./Components/Seo";
import PushPermissionPrompt from "./Components/PushPermissionPrompt";
import { useSitePreferences } from "./context/sitePreferencesContext";

const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const MandatePage = lazy(() => import("./pages/MandatePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const DocumentsPage = lazy(() => import("./pages/DocumentsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

const HomePage = () => {
  const { tr } = useSitePreferences();
  const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, "");
  return (
  <main>
    <Seo
      title="Bright Education — bilimdan natijagacha"
      description={tr("Farzandingiz uchun tartibli muhit, kuchli ustozlar va aniq natijaga yo‘naltirilgan o‘quv markaz.")}
      jsonLd={{ "@context": "https://schema.org", "@type": "EducationalOrganization", name: "Bright Education School", url: siteUrl, logo: `${siteUrl}/favicon.svg`, address: { "@type": "PostalAddress", addressLocality: "Rishton", addressCountry: "UZ" }, sameAs: [import.meta.env.VITE_TELEGRAM_URL, import.meta.env.VITE_INSTAGRAM_URL].filter(Boolean) }}
    />
    <Hero />
    <News />
    <StatsCards />
    <ParentTrust />
    <TrustProof />
    <Courses />
    <Results />
    <VideoStories />
    <WhyUs />
    <Team />
    <LearningPath />
    <Rules />
    <Experience />
    <Gallery />
    <Faq />
    <Aloqa />
  </main>
  );
};

const PageLoader = () => <div className="page-loader" role="status"><span /><p>Bright Education</p></div>;

const App = () => {
  const { tr } = useSitePreferences();
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) return <Suspense fallback={<PageLoader />}><Routes><Route path="/admin/*" element={<AdminPage />} /></Routes></Suspense>;
  return (
  <div className="site-shell">
    <ScrollManager />
    <ScrollReveal />
    <Link className="skip-link" to="#main-content">{tr("Asosiy qismga o‘tish")}</Link>
    <Navbar />
    <div id="main-content">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mandate" element={<MandatePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
    <Footer />
    <PushPermissionPrompt />
    <BackToTop />
  </div>
  );
};

export default App;
