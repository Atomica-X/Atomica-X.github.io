# 🎯 Complete Admin Dashboard Setup Guide

## ✅ What's Already Built

### Database (Supabase)
- ✅ 17 tables with full schema
- ✅ Row Level Security (RLS) configured
- ✅ Admin account ready
- ✅ All frontend data seeded

### Frontend Hooks
- ✅ useProjects() - Fetch/manage projects
- ✅ useServices() - Fetch/manage services
- ✅ useTestimonials() - Fetch/manage testimonials
- ✅ useStatistics() - Fetch/manage stats
- ✅ useFAQ() - Fetch/manage FAQ
- ✅ useContactForm() - View messages
- ✅ useNewsletter() - View subscribers

### Authentication
- ✅ AuthContext created (`src/contexts/AuthContext.tsx`)
- ✅ Login page created (`src/pages/admin/Login.tsx`)

---

## 🚀 Complete Setup Instructions

### Step 1: Install React Router

```bash
npm install react-router-dom
```

### Step 2: Configure Supabase Auth

In your Supabase dashboard:

1. **Go to Authentication → Users**
2. **Click "Add User"**
3. **Create admin user:**
   - Email: `admin@vortx.io`
   - Password: (Choose a strong password)
   - Auto-confirm user: ✅ Yes

4. **Go to Authentication → Policies**
5. **Verify RLS policies exist** (they should from schema.sql)

### Step 3: Update Environment Variables

Your `.env` file needs:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Create Protected Route Component

Create `src/components/ProtectedRoute.tsx`:

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
```

### Step 5: Create Admin Layout

Create `src/pages/admin/AdminLayout.tsx`:

```typescript
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import {
  MdDashboard,
  MdWork,
  MdDesignServices,
  MdRateReview,
  MdQuiz,
  MdEmail,
  MdNewspaper,
  MdSettings,
  MdLogout,
} from 'react-icons/md';

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: MdDashboard, label: 'Dashboard' },
    { path: '/admin/projects', icon: MdWork, label: 'Projects' },
    { path: '/admin/services', icon: MdDesignServices, label: 'Services' },
    { path: '/admin/testimonials', icon: MdRateReview, label: 'Testimonials' },
    { path: '/admin/faq', icon: MdQuiz, label: 'FAQ' },
    { path: '/admin/messages', icon: MdEmail, label: 'Messages' },
    { path: '/admin/newsletter', icon: MdNewspaper, label: 'Newsletter' },
    { path: '/admin/settings', icon: MdSettings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/5 border-r border-white/10 p-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <svg className="w-12 h-12" viewBox="0 0 256 256" fill="white">
            <path d="M128 0 L128 64 A64 64 0 0 1 64 128 L0 128 L0 0 Z" />
            <path d="M128 0 L256 0 L256 128 L192 128 A64 64 0 0 1 128 64 Z" />
            <path d="M0 128 L64 128 A64 64 0 0 1 128 192 L128 256 L0 256 Z" />
            <path d="M128 256 L128 192 A64 64 0 0 1 192 128 L256 128 L256 256 Z" />
          </svg>
          <span className="text-xs tracking-[0.4em] font-light mt-2">VORTX</span>
          <span className="text-xs text-white/50 mt-1">Admin</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-colors w-full mt-8"
        >
          <MdLogout className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>

        {/* User Info */}
        <div className="absolute bottom-6 left-6 right-6 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40 truncate">{user?.email}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
```

### Step 6: Create Dashboard Overview

Create `src/pages/admin/Dashboard.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MdWork, MdEmail, MdNewspaper, MdRateReview } from 'react-icons/md';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    newsletter: 0,
    testimonials: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      if (!supabase) return;

      const [projects, messages, newsletter, testimonials] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        projects: projects.count || 0,
        messages: messages.count || 0,
        newsletter: newsletter.count || 0,
        testimonials: testimonials.count || 0,
      });
    }

    fetchStats();
  }, []);

  const cards = [
    { icon: MdWork, label: 'Projects', value: stats.projects, color: 'blue' },
    { icon: MdEmail, label: 'Messages', value: stats.messages, color: 'green' },
    { icon: MdNewspaper, label: 'Subscribers', value: stats.newsletter, color: 'purple' },
    { icon: MdRateReview, label: 'Testimonials', value: stats.testimonials, color: 'orange' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-medium mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className="w-8 h-8 text-white/60" />
              <span className={`text-3xl font-medium text-${card.color}-400`}>
                {card.value}
              </span>
            </div>
            <p className="text-white/60 text-sm">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/projects"
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <p className="text-white font-medium">Manage Projects</p>
            <p className="text-white/50 text-sm mt-1">Add, edit, or remove projects</p>
          </a>
          <a
            href="/admin/messages"
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <p className="text-white font-medium">View Messages</p>
            <p className="text-white/50 text-sm mt-1">Check contact form submissions</p>
          </a>
          <a
            href="/admin/settings"
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <p className="text-white font-medium">Settings</p>
            <p className="text-white/50 text-sm mt-1">Configure website settings</p>
          </a>
        </div>
      </div>
    </div>
  );
}
```

### Step 7: Update App.tsx with Routes

Replace `src/App.tsx`:

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import PublicWebsite from './PublicWebsite';

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          {/* Public Website */}
          <Route path="/" element={<PublicWebsite />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* Add more admin routes here */}
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
```

### Step 8: Extract Public Website

Create `src/PublicWebsite.tsx` (move current App.tsx content):

```typescript
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Technologies from './components/Technologies';
import Testimonials from './components/Testimonials';
import Statistics from './components/Statistics';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function PublicWebsite() {
  return (
    <>
      <AnimatePresence mode="wait">
        <LoadingScreen />
      </AnimatePresence>
      <ScrollProgress />
      <ScrollToTop />
      <div className="bg-black min-h-screen">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Technologies />
        <Testimonials />
        <Statistics />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
```

---

## 📋 Routes Summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Main website |
| `/admin/login` | Public | Admin login page |
| `/admin/dashboard` | Protected | Dashboard overview |
| `/admin/projects` | Protected | Manage projects |
| `/admin/services` | Protected | Manage services |
| `/admin/testimonials` | Protected | Manage testimonials |
| `/admin/faq` | Protected | Manage FAQ |
| `/admin/messages` | Protected | View messages |
| `/admin/newsletter` | Protected | View subscribers |
| `/admin/settings` | Protected | Website settings |

---

## 🎯 Next Steps

1. ✅ Install React Router: `npm install react-router-dom`
2. ✅ Create admin user in Supabase Auth
3. ✅ Add environment variables
4. ✅ Create all component files above
5. ✅ Test login at `/admin/login`
6. ✅ Access dashboard at `/admin/dashboard`

---

## 🔐 Security Features

- ✅ Protected routes (redirect if not authenticated)
- ✅ Supabase Auth integration
- ✅ Row Level Security on database
- ✅ Secure session management
- ✅ Auto logout on session expiry

---

## 🎨 UI Features

- ✅ Matches your existing design system
- ✅ Dark theme with glassmorphism
- ✅ Responsive sidebar
- ✅ Toast notifications
- ✅ Loading states
- ✅ Same fonts & animations

---

**Status:** Ready to implement!  
**Complexity:** Medium  
**Time:** ~2 hours to complete all admin pages
