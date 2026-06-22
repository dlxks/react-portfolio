import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

// Portfolio
import NavbarContainer from "./components/NavbarContainer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Resume from "./pages/Resume.jsx";
import Certificates from "./pages/Certificates.jsx";
import Projects from "./pages/Projects.jsx";
import Footer from "./pages/Footer.jsx";
import useAOS from "./hooks/useAOS";
import usePortfolioData from "./hooks/usePortfolioData";

// Admin
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const SECTIONS = ["home", "about", "resume", "certificates", "projects"];

function Portfolio() {
  const { data, loading } = usePortfolioData();
  useAOS();

  if (loading) {
    return (
      <div className="page-loader" role="status" aria-live="polite">
        <span className="spinner" />
        <span className="visually-hidden">Loading…</span>
      </div>
    );
  }

  const { profile, experience, education, certificates, projects, socialLinks } =
    data;

  return (
    <>
      <NavbarContainer sections={SECTIONS} />

      <main>
        <section id="home">
          <Home profile={profile} socialLinks={socialLinks} />
        </section>
        <section id="about">
          <About profile={profile} />
        </section>
        <section id="resume">
          <Resume
            experience={experience}
            education={education}
            resumeUrl={profile.resume_url}
          />
        </section>
        <section id="certificates">
          <Certificates certificates={certificates} />
        </section>
        <section id="projects">
          <Projects projects={projects} />
        </section>
      </main>

      <Footer profile={profile} socialLinks={socialLinks} sections={SECTIONS} />
      <BackToTop />
    </>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
