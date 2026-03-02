// =============================================
// NobelHub – Main Application Component
// =============================================
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/Home/Home';
import LaureatePage from './pages/Laureates/Laureates';
import LaureateDetailPage from './pages/Laureates/LaureateDetail';
import LecturesPage from './pages/Lectures/Lectures';
import ResearchPage from './pages/Research/Research';
import AnalyticsPage from './pages/Analytics/Analytics';
import SearchPage from './pages/Search/Search';
import PricingPage from './pages/Pricing/Pricing';
import LegalPage from './pages/Legal/Legal';
import NotFoundPage from './pages/NotFound/NotFound';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />

        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/laureates" element={<LaureatePage />} />
          <Route path="/laureates/:id" element={<LaureateDetailPage />} />
          <Route path="/lectures" element={<LecturesPage />} />
          <Route path="/lectures/:id" element={<div className="container" style={{ paddingTop: 120 }}>Lecture Details Page (WIP)</div>} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:id" element={<div className="container" style={{ paddingTop: 120 }}>Research Details Page (WIP)</div>} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/legal" element={<LegalPage />} />

          {/* Auth Pages */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />

          {/* Fallbacks */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}
