import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Presentation,
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  AlertTriangle,
  ExternalLink,
  Target,
  Sparkles,
  Share2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const PresentationPage: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds < 180) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (seconds >= 180) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const sections = [
    {
      timeRange: '0:00 – 0:40',
      duration: '40 seconds',
      title: '1. The Problem & Growth Challenge',
      badge: 'Challenge Framing',
      summary:
        'Explain the core objective: acquire 500 final-year engineering students across India in 7 days with a total marketing budget of only ₹2,000 for a free 60-minute AI project-building workshop.',
      keyPoints: [
        'Objective: 500 verified final-year engineering student registrations within 7 days.',
        'Economic constraint: ₹2,000 total budget translates to an impossible paid CAC limit of ₹4 per student if using ads alone.',
        'Audience specificity: Final-year B.Tech / B.E. students (2025 batch) prioritizing practical capstone project leverage and interview readiness.',
        'Value proposition: "Build Your First AI Project in 60 Minutes" — zero theory, beginner-friendly hands-on implementation.',
      ],
      speakerScript:
        '"Hello everyone. Today I\'m presenting the growth strategy and working engine for NxtWave\'s AI workshop challenge. Our goal is aggressive yet precise: 500 final-year engineering student registrations in 7 days, on a strict ₹2,000 total budget. At just ₹4 per target registration, standard paid advertising is mathematically incapable of solving this. We needed a disciplined organic acquisition strategy built on high-trust campus distribution, peer-to-peer referral loops, and friction-minimized registration."',
    },
    {
      timeRange: '0:40 – 1:20',
      duration: '40 seconds',
      title: '2. Growth Strategy & Channel Model',
      badge: 'Channel Economics',
      summary:
        'Break down why college WhatsApp communities, coding clubs, Class Representatives (CRs), and student referrals form the backbone of the target model.',
      keyPoints: [
        'Channel Target Model: 200 from WhatsApp communities, 100 from coding clubs, 100 from Class Reps & ambassadors, 50 email, 50 LinkedIn.',
        'Organic distribution anchor: Class Reps and authorized college group admins provide zero-CAC placement with near-100% notification open rates.',
        'Viral Loop Mechanics: Final-year students work in teams of 3 to 4 for their capstone projects; inviting project partners drives natural peer multiplication.',
        'Budget Discipline: ₹1,000 reserved as an optional paid micro-experiment only after validating organic baselines.',
      ],
      speakerScript:
        '"Our growth hypothesis rests on bottom-up campus distribution. We modeled 5 core channels: 200 registrations from authorized college WhatsApp groups, 100 from technical coding clubs like GDSC and CSI, 100 from Class Representatives, and 100 between email and LinkedIn. Because final-year students build capstone projects in teams of three or four, we engineered a referral loop tailored to project partner invites. We kept the ₹2,000 budget intact: allocating ₹300 for Figma assets, ₹400 for ambassador perks, and holding ₹1,000 in reserve for an optional paid test only if needed."',
    },
    {
      timeRange: '1:20 – 2:20',
      duration: '60 seconds',
      title: '3. The Working Product & Funnel Assets',
      badge: 'Live Demonstration',
      summary:
        'Walk through the functional software: student landing page, friction-free registration, unique referral codes, WhatsApp templates, and real-time dashboard.',
      keyPoints: [
        'Landing Page: High-conversion hero, illustrative project previews, transparent FAQ, zero fake testimonials or false claims.',
        'Registration Form: Strict 5-field schema with email deduplication, self-referral rejection, and mobile-first validation.',
        'WhatsApp Engine: Unique referral links (NX7K2P), pre-filled encoded WhatsApp templates (Personal, College Group, Tech Club).',
        'Campaign Dashboard: Real-time KPIs, Recharts velocity analytics, channel attribution breakdown, and CSV export.',
      ],
      speakerScript:
        '"Here is the live application. Notice the conversion-focused landing page: no fake partner logos, clean 60-minute project previews, and clear eligibility. When a student registers, our engine normalizes their email to prevent duplicate counting and generates a unique referral code. On the confirmation screen, students receive one-click WhatsApp sharing buttons with 3 pre-written templates and a privacy-conscious leaderboard. On the campaign dashboard, managers track real-time target pacing, cost per registration, and export de-duplicated CSV records."',
      demoLinks: [
        { label: 'View Landing Page', url: '/' },
        { label: 'Test Registration Funnel', url: '/register' },
        { label: 'View Dashboard Analytics', url: '/dashboard' },
      ],
    },
    {
      timeRange: '2:20 – 3:00',
      duration: '40 seconds',
      title: '4. Critical Learning & Marketer Judgment',
      badge: 'Human vs AI',
      summary:
        'Explain a rejected AI recommendation, why independent marketer judgment was required, and what you would improve with 24 hours more.',
      keyPoints: [
        'AI Rejection 1: AI proposed offering Paytm cash rewards for referrals. Rejected because it violates the ₹2,000 budget and attracts fraudulent burner emails.',
        'AI Rejection 2: AI suggested a 10-field form asking for resumes and CGPA. Rejected to minimize mobile drop-off on WhatsApp traffic.',
        'What I would improve in 24 hours: Implement automated webhook delivery to campus ambassador Telegram bot and automated reminder sequences for show-up rate optimization.',
        'Ethics: Never present simulated demo registrations as real human signups.',
      ],
      speakerScript:
        '"Crucially, we used AI as an ideation sparring partner, not an autonomous pilot. When AI suggested offering ₹50 Paytm cash for referrals, I rejected it because it would bankrupt our ₹2,000 budget in 40 signups and trigger synthetic spam. Instead, we built non-monetary social capital into the peer loop. When AI suggested a 10-field form requiring resumes, I rejected it to protect conversion. With 24 more hours, I would build automated webhook alerts for Class Reps and an SMS fallback gateway. Thank you, and I look forward to your questions."',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center radial-glow">
      <div className="max-w-4xl w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <Presentation className="w-6 h-6 text-brand-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                3-Minute Growth Pitch Outline
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Structured verbal walkthrough for interview evaluation with built-in rehearsal timer.
            </p>
          </div>

          {/* Interactive Rehearsal Timer */}
          <div className="flex items-center space-x-3 bg-navy-900 border border-navy-800 px-4 py-2 rounded-2xl shadow-lg">
            <Clock className="w-4 h-4 text-brand-400" />
            <span className="font-mono text-xl font-extrabold text-white">
              {formatTimer(seconds)}
            </span>
            <span className="text-xs text-slate-500">/ 3:00</span>
            <div className="flex items-center space-x-1 pl-2 border-l border-navy-700">
              <button
                onClick={toggleTimer}
                className="p-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white"
                title={isActive ? 'Pause' : 'Start Timer'}
              >
                {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activeTab === idx
                  ? 'bg-brand-950/60 border-brand-500/60 text-white shadow-md shadow-brand-500/10'
                  : 'bg-navy-900/60 border-navy-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-mono text-brand-400 block font-bold">
                {sec.timeRange}
              </span>
              <p className="text-xs font-bold mt-0.5 line-clamp-1 text-white">
                {sec.title.split('. ')[1]}
              </p>
            </button>
          ))}
        </div>

        {/* Active Section Content Card */}
        <div className="bg-navy-900/80 border border-navy-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-0.5 rounded">
                  {sections[activeTab].timeRange} ({sections[activeTab].duration})
                </span>
                <span className="text-xs text-slate-400">
                  {sections[activeTab].badge}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {sections[activeTab].title}
              </h2>
            </div>
          </div>

          {/* Key Talking Points */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Core Strategic Talking Points:
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {sections[activeTab].keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start space-x-2.5">
                  <span className="text-brand-400 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Teleprompter / Speaker Script */}
          <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Suggested Rehearsal Teleprompter Script:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-serif">
              {sections[activeTab].speakerScript}
            </p>
          </div>

          {/* Quick Demo Links (for Section 3) */}
          {sections[activeTab].demoLinks && (
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Interactive Assets to Demonstrate:
              </span>
              <div className="flex flex-wrap gap-2">
                {sections[activeTab].demoLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.url}
                    target="_blank"
                    className="inline-flex items-center space-x-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-brand-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Presenter Integrity Checklist (Section 12 Requirement) */}
        <div className="bg-navy-900/60 border border-amber-600/30 rounded-2xl p-5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Presenter Ethical & Accuracy Checklist
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Ensure you address these four integrity guardrails during your presentation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="flex items-start space-x-2 bg-navy-950 p-2.5 rounded-lg border border-navy-800">
              <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">
                Explicitly label simulated registrations as demo data; never claim 500 students have already been acquired.
              </span>
            </div>
            <div className="flex items-start space-x-2 bg-navy-950 p-2.5 rounded-lg border border-navy-800">
              <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">
                Acknowledge the strict ₹2,000 ceiling and explain why paid advertising cannot scale this campaign alone.
              </span>
            </div>
            <div className="flex items-start space-x-2 bg-navy-950 p-2.5 rounded-lg border border-navy-800">
              <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">
                Mention WhatsApp opt-in consent and state that external messages require authorized API delivery.
              </span>
            </div>
            <div className="flex items-start space-x-2 bg-navy-950 p-2.5 rounded-lg border border-navy-800">
              <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300">
                Explain why you rejected cash referral incentives and high-friction registration forms suggested by AI.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
