import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sparkles,
  LayoutDashboard,
  Presentation,
  FileText,
  UserPlus,
  Database,
  ArrowRight,
  Menu,
  X,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { Storage } from '../../lib/storage';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const syncSettings = () => {
      const s = Storage.getSettings();
      setIsDemoMode(s.isDemoMode);
    };
    syncSettings();
    window.addEventListener('nxt_storage_updated', syncSettings);
    return () => window.removeEventListener('nxt_storage_updated', syncSettings);
  }, []);

  const handleToggleDemo = () => {
    const next = !isDemoMode;
    Storage.toggleDemoMode(next);
    setIsDemoMode(next);
  };

  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-[4rem] gap-2 lg:gap-4">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0 py-1">
            <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-accent p-0.5 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-navy-950 rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white tracking-tight text-sm sm:text-base md:text-lg whitespace-nowrap leading-tight">
                  AI Workshop <span className="text-brand-400">Growth Engine</span>
                </span>
                <span className="hidden 2xl:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-navy-800 text-brand-300 border border-brand-500/30 whitespace-nowrap">
                  NxtWave Challenge
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden 2xl:block leading-tight truncate mt-0.5">
                From Zero to 500 Registrations — One Smart Campaign
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 flex-shrink-0">
            <Link
              to="/"
              className={`px-2.5 xl:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === '/'
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              Workshop
            </Link>
            <Link
              to="/register"
              className={`px-2.5 xl:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === '/register'
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <span className="hidden xl:inline">Registration </span>Funnel
            </Link>
            <Link
              to="/dashboard"
              className={`px-2.5 xl:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                isDashboardRoute
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span><span className="hidden xl:inline">Campaign </span>Dashboard</span>
            </Link>
            <Link
              to="/growth-plan"
              className={`px-2.5 xl:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                location.pathname === '/growth-plan'
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span><span className="hidden xl:inline">2-Page </span>Growth Plan</span>
            </Link>
            <Link
              to="/presentation"
              className={`px-2.5 xl:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-colors whitespace-nowrap ${
                location.pathname === '/presentation'
                  ? 'text-brand-400 bg-brand-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span><span className="hidden xl:inline">3-Min </span>Pitch</span>
            </Link>
          </nav>

          {/* Right CTAs & Demo Switch */}
          <div className="hidden sm:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            {/* Dark / Light Mode Switch */}
            <ThemeToggle showLabel={false} />

            {/* Demo Mode Toggle Badge */}
            <button
              onClick={handleToggleDemo}
              title="Click to toggle between Demo Simulation Data and Live Clean Data"
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                isDemoMode
                  ? 'bg-amber-950/50 text-amber-300 border-amber-600/40 hover:bg-amber-900/50'
                  : 'bg-emerald-950/50 text-emerald-300 border-emerald-600/40 hover:bg-emerald-900/50'
              }`}
            >
              <Database className="w-3 h-3 flex-shrink-0" />
              <span className="hidden xl:inline">{isDemoMode ? 'Demo Data (206 Sim)' : 'Live Data (Clean)'}</span>
              <span className="xl:hidden">{isDemoMode ? 'Demo (206)' : 'Live'}</span>
            </button>

            <Link
              to="/register"
              className="inline-flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md shadow-brand-600/30 transition-all hover:shadow-brand-600/50 active:scale-95 whitespace-nowrap"
            >
              <span>Register Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center space-x-2">
            <ThemeToggle showLabel={false} />
            <button
              onClick={handleToggleDemo}
              className="text-[10px] px-2 py-1 rounded bg-navy-800 border border-slate-700 text-amber-300"
            >
              {isDemoMode ? 'Demo' : 'Live'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-navy-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-navy-800 bg-navy-950/98 px-4 pt-2 pb-4 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
          >
            Workshop Landing
          </Link>
          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
          >
            Registration Funnel
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
          >
            Campaign Dashboard
          </Link>
          <Link
            to="/dashboard/planner"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
          >
            7-Day Planner
          </Link>
          <Link
            to="/growth-plan"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
          >
            2-Page Growth Plan
          </Link>
          <Link
            to="/presentation"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-navy-800"
          >
            3-Min Presentation Pitch
          </Link>
          <div className="pt-2">
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-medium py-2 rounded-md"
            >
              <span>Reserve My Free Seat</span>
            </Link>
          </div>
          <div className="pt-3 border-t border-navy-800 flex items-center justify-between px-3">
            <span className="text-xs text-slate-400">Theme</span>
            <ThemeToggle showLabel={true} />
          </div>
        </div>
      )}
    </header>
  );
};
