import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import Hero from "./Components/Hero"
import WhyUs from "./Components/WhyUs";
import Courses from "./Components/Courses";
// import Contact from "./components/Contact";
import Footer from "./Components/Futter";
import CourseDetail from "./pages/CourseDetail";
import Aloqa from "./Components/Aloqa";
import SocialSection from "./Components/SocialSection";
import StatsCards from "./Components/StatsCards";

const App = () => {
  return (
    <>
      <Navbar /> {/* 🔥 har doim ko‘rinadi */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <WhyUs />
              <StatsCards/>
              <Courses />
              {/* <Contact /> */}
              <SocialSection/>
            </>
          }
        />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
      <Aloqa/>

      <Footer />
    </>
  );
};

export default App;


