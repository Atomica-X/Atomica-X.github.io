import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import FreightCalculator from './pages/FreightCalculator';
import ParcelTracker from './pages/ParcelTracker';
import CurrencyConverter from './pages/CurrencyConverter';
import SupplierSearch from './pages/SupplierSearch';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Technologies from './components/Technologies';
import Statistics from './components/Statistics';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/admin/Login';
import DashboardHome from './pages/admin/DashboardHome';
import AdminProjects from './pages/admin/AdminProjects';
import AdminServices from './pages/admin/AdminServices';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminStatistics from './pages/admin/AdminStatistics';
import AdminMessages from './pages/admin/AdminMessages';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminSettings from './pages/admin/AdminSettings';

function LandingPage() {
  return (
    <>
      <AnimatePresence mode="wait">
        <LoadingScreen />
      </AnimatePresence>
      <ScrollProgress />
      <ScrollToTop />
      <main id="top" className="relative min-h-screen overflow-x-hidden bg-black">
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(143,185,255,0.12),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_32%)]" />
        <div className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Projects />
          <Process />
          <Technologies />
          <Statistics />
          <FAQ />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route path="statistics" element={<AdminStatistics />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/freight" element={<FreightCalculator />} />
          <Route path="/tracking" element={<ParcelTracker />} />
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/suppliers" element={<SupplierSearch />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
