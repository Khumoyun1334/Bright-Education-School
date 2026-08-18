import { useEffect } from "react";
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
import CourseDetail from "./pages/CourseDetail";
import ContactPage from "./pages/ContactPage";
import BackToTop from "./Components/BackToTop";
import TrustProof from "./Components/TrustProof";
import VideoStories from "./Components/VideoStories";
import ScrollReveal from "./Components/ScrollReveal";
import NewsDetail from "./pages/NewsDetail";
import { useSitePreferences } from "./context/sitePreferencesContext";

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

const HomePage = () => (
  <main>
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

const App = () => {
  const { tr } = useSitePreferences();
  return (
  <div className="site-shell">
    <ScrollManager />
    <ScrollReveal />
    <Link className="skip-link" to="#main-content">{tr("Asosiy qismga o‘tish")}</Link>
    <Navbar />
    <div id="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
    <Footer />
    <BackToTop />
  </div>
  );
};

export default App;
