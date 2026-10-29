import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, AlertTriangle, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-sm">
                AI Workshop Growth Engine
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A comprehensive growth marketing simulation designed for the NxtWave challenge:
              "Build Your First AI Project in 60 Minutes" — zero to 500 registrations in 7 days on a ₹2,000 budget.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-amber-400/90 bg-amber-950/30 border border-amber-900/40 p-2.5 rounded-lg max-w-md">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>Academic / Interview Simulation Notice:</strong> Demo data is purely illustrative.
                Actual campaign results depend on authorized college community access and verified peer distribution.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Campaign Navigation
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors">
                  Workshop Landing Page
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand-400 transition-colors">
                  Student Registration Form
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-400 transition-colors">
                  Campaign Manager Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/planner" className="hover:text-brand-400 transition-colors">
                  7-Day Campaign Planner
                </Link>
              </li>
              <li>
                <Link to="/dashboard/budget" className="hover:text-brand-400 transition-colors">
                  ₹2,000 Budget Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Deliverables & Deliverable Docs */}
          <div className="space-y-2">
            <p className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Interview Assets
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link to="/growth-plan" className="hover:text-brand-400 transition-colors">
                  Two-Page Growth Plan Report (PDF/Print)
                </Link>
              </li>
              <li>
                <Link to="/presentation" className="hover:text-brand-400 transition-colors">
                  3-Minute Presentation Outline
                </Link>
              </li>
              <li>
                <Link to="/dashboard/ai-decisions" className="hover:text-brand-400 transition-colors">
                  AI Decisions & Learning Log
                </Link>
              </li>
              <li>
                <Link to="/dashboard/channels" className="hover:text-brand-400 transition-colors">
                  Acquisition Channel Analytics
                </Link>
              </li>
              <li>
                <Link to="/dashboard/registrations" className="hover:text-brand-400 transition-colors">
                  De-duplicated Registrations (CSV)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NxtWave Growth Marketing Simulation. Built for final-year engineering students in India.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Zero Synthetic Exaggeration</span>
            <span>•</span>
            <span>Ethical Attribution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
