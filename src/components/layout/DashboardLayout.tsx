import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  CalendarDays,
  Wallet,
  Sparkles,
  BookOpenCheck,
  Presentation,
  FileSpreadsheet,
  FileText,
  AlertCircle,
  Database,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Storage } from '../../lib/storage';
import { ThemeToggle } from './ThemeToggle';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [liveCount, setLiveCount] = useState<number>(0);
  const [simCount, setSimCount] = useState<number>(0);

  const loadData = () => {
    const s = Storage.getSettings();
    setIsDemoMode(s.isDemoMode);
    setLiveCount(Storage.getLiveRegistrations().length);
    setSimCount(Storage.getSimulatedRegistrations().length);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('nxt_storage_updated', loadData);
    return () => window.removeEventListener('nxt_storage_updated', loadData);
  }, []);

  const handleToggleMode = () => {
    const next = !isDemoMode;
    Storage.toggleDemoMode(next);
    setIsDemoMode(next);
  };

  const handleResetData = () => {
    if (window.confirm('Reset demo data and campaign plan to initial defaults?')) {
      Storage.resetToInitial();
    }
  };

  const navItems = [
    { name: 'Campaign Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Registrations Table', path: '/dashboard/registrations', icon: Users, badge: isDemoMode ? `${simCount}` : `${liveCount}` },
    { name: 'Acquisition Channels', path: '/dashboard/channels', icon: GitBranch },
    { name: '7-Day Planner', path: '/dashboard/planner', icon: CalendarDays },
    { name: '₹2,000 Budget Planner', path: '/dashboard/budget', icon: Wallet },
    { name: 'Target Growth Model', path: '/dashboard/target-model', icon: TrendingUp },
    { name: 'AI Campaign Copilot', path: '/dashboard/copilot', icon: Sparkles, highlight: true },
    { name: 'AI Decision Log', path: '/dashboard/ai-decisions', icon: BookOpenCheck },
  ];

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      {/* Top Warning/Simulation Banner */}
      <div className={`px-4 py-2 border-b text-xs flex flex-wrap items-center justify-between gap-2 ${
        isDemoMode
          ? 'bg-amber-950/60 border-amber-800/40 text-amber-200'
          : 'bg-emerald-950/60 border-emerald-800/40 text-emerald-200'
      }`}>
        <div className="flex items-center space-x-2">
          <AlertCircle className={`w-4 h-4 flex-shrink-0 ${isDemoMode ? 'text-amber-400' : 'text-emerald-400'}`} />
          <span>
            {isDemoMode ? (
              <>
                <strong className="font-semibold uppercase tracking-wider text-[11px] bg-amber-900/50 px-1.5 py-0.5 rounded border border-amber-600/30 mr-1.5">
                  Simulation Demo Mode Active
                </strong>
                Showing <strong>{simCount} simulated registrations</strong>. None of these represent real students.
              </>
            ) : (
              <>
                <strong className="font-semibold uppercase tracking-wider text-[11px] bg-emerald-900/50 px-1.5 py-0.5 rounded border border-emerald-600/30 mr-1.5">
                  Live Clean Data Mode
                </strong>
                Showing <strong>{liveCount} actual registrations</strong> captured via the form.
              </>
            )}
          </span>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <ThemeToggle showLabel={false} />
          <button
            onClick={handleToggleMode}
            className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              isDemoMode
                ? 'bg-navy-900 text-slate-100 hover:bg-navy-800 border-slate-700'
                : 'bg-amber-900/40 text-amber-300 hover:bg-amber-800/40 border-amber-700/50'
            }`}
          >
            {isDemoMode ? 'Switch to Clean Live Data' : 'Switch to Demo Showcase'}
          </button>
          {isDemoMode && (
            <button
              onClick={handleResetData}
              title="Reset sample metrics and decisions to baseline"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-navy-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-4">
          <div className="bg-navy-900/70 border border-navy-800 rounded-xl p-3 shadow-lg">
            <p className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Growth Engine
            </p>
            <nav className="space-y-1 mt-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-brand-600 text-white font-semibold shadow-md shadow-brand-600/30'
                          : item.highlight
                          ? 'text-brand-300 hover:bg-brand-950/40 hover:text-brand-200 border border-brand-500/20'
                          : 'text-slate-300 hover:bg-navy-800 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-brand-400' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isActive ? 'bg-navy-900/60 text-white' : 'bg-navy-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Interview Assets Box */}
          <div className="bg-navy-900/50 border border-navy-800/80 rounded-xl p-3.5 space-y-2.5">
            <p className="text-[11px] font-bold text-brand-400 uppercase tracking-wider flex items-center space-x-1">
              <span>Interview Presentation</span>
            </p>
            <div className="space-y-1.5">
              <Link
                to="/presentation"
                className="flex items-center justify-between p-2 rounded-lg text-xs bg-navy-850 hover:bg-navy-800 border border-navy-700/60 text-slate-200 transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <Presentation className="w-3.5 h-3.5 text-brand-400" />
                  <span className="font-medium">3-Min Pitch Outline</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/growth-plan"
                className="flex items-center justify-between p-2 rounded-lg text-xs bg-navy-850 hover:bg-navy-800 border border-navy-700/60 text-slate-200 transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-medium">2-Page Growth Plan</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Student Funnel Preview Link */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-brand-900/20 to-navy-900 border border-brand-500/20 text-xs space-y-2">
            <p className="font-semibold text-slate-200">Registration Testing</p>
            <p className="text-[11px] text-slate-400">
              Submit a test registration with your details to verify attribution & WhatsApp sharing.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-1.5 text-brand-400 hover:text-brand-300 font-medium"
            >
              <span>Open Registration Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
