import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Check,
  Share2,
  MessageCircle,
  Users,
  Trophy,
  ExternalLink,
  Tag,
  ArrowRight,
  Shield,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { Registration, LeaderboardEntry } from '../types';

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [registration, setRegistration] = useState<Registration | null>(null);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTemplate, setActiveTemplate] = useState<'A' | 'B' | 'C'>('A');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // safe fallback
    }

    // Try to get registration from router state or fallback to last registered ref code
    let reg = location.state?.registration as Registration | undefined;
    if (!reg) {
      const lastRef = localStorage.getItem('nxt_growth_last_registered_ref');
      if (lastRef) {
        const all = Storage.getRegistrations();
        reg = all.find((r) => r.referralCode === lastRef);
      }
    }

    if (reg) {
      setRegistration(reg);
      setReferralCount(Storage.getReferralCount(reg.referralCode));
    }

    setLeaderboard(Storage.getLeaderboard(5));
  }, [location.state]);

  const refreshReferralStats = () => {
    if (registration) {
      const count = Storage.getReferralCount(registration.referralCode);
      setReferralCount(count);
      setLeaderboard(Storage.getLeaderboard(5));
    }
  };

  const domain = typeof window !== 'undefined' ? window.location.origin : 'https://nxtwave-ai-growth.netlify.app';
  const refCode = registration?.referralCode || 'NX7K2P';
  const referralUrl = `${domain}/register?ref=${refCode}&utm_source=direct_referral`;
  const campaignUrl = `${domain}/register?utm_source=college_group`;

  // WhatsApp Templates from Section 5
  const templates = {
    A: {
      title: 'Template A: Personal Invitation',
      audience: 'Best for 1-on-1 chat with project partners or close classmates',
      text: `Hey! I'm joining a free online workshop called 'Build Your First AI Project in 60 Minutes.' It is designed for students who want practical AI project experience. Check it out here: ${referralUrl}`,
    },
    B: {
      title: 'Template B: College Group Message',
      audience: 'Best for Class / Department / Batch WhatsApp Groups',
      text: `Hey everyone! Sharing a free AI project-building workshop for final-year engineering students. The session is designed to help beginners explore practical AI projects in 60 minutes. Register here: ${referralUrl}`,
    },
    C: {
      title: 'Template C: Student Club Invitation',
      audience: 'Best for Technical Clubs, GDSC, CSI, and Student Societies',
      text: `Planning an AI or tech activity for your college community? Consider sharing this free beginner-friendly AI workshop with interested final-year engineering students: ${referralUrl}`,
    },
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(refCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // fallback
    }
  };

  const openWhatsAppShare = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-navy-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center radial-glow">
      <div className="max-w-3xl w-full space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-600/30">
            Registration Confirmed
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            You're In! Welcome to the AI Workshop.
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
            Your seat is reserved for <strong>"Build Your First AI Project in 60 Minutes."</strong>
            {registration?.fullName ? ` A confirmation record was saved for ${registration.fullName}.` : ''}
          </p>
        </div>

        {/* Personalized Registration Details Box */}
        {registration && (
          <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-5 sm:p-6 shadow-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Student Name</span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">
                {registration.fullName}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">College</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 truncate">
                {registration.collegeName}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Branch & Batch</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 truncate">
                {registration.branch} • {registration.graduationYear}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Unique Code</span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="text-xs sm:text-sm font-mono font-bold text-brand-400">
                  {registration.referralCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="text-slate-400 hover:text-white"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Referral Sharing Engine (Section 4 & 5) */}
        <div className="bg-navy-900/90 border border-brand-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-brand-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Invite Classmates & Project Partners
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Share your unique link. When fellow engineering students register, they get credited to your referral score.
              </p>
            </div>

            {/* Live Attributed Counter */}
            <div className="bg-navy-950 px-4 py-2.5 rounded-xl border border-navy-700 flex items-center space-x-3 self-start sm:self-auto">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Attributed Signups
                </span>
                <span className="text-xl font-extrabold text-brand-400 font-mono">
                  {referralCount}
                </span>
              </div>
              <button
                onClick={refreshReferralStats}
                title="Refresh referral metrics"
                className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Referral Link Copy Bar */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Your Unique Referral Link:</span>
              <span className="text-[11px] text-slate-400 font-mono">
                Code: {refCode}
              </span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={referralUrl}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-xs sm:text-sm text-slate-200 font-mono selection:bg-brand-500 truncate"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center space-x-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors active:scale-95"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* WhatsApp Message Templates Selector */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Choose Pre-Formatted WhatsApp Message:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(['A', 'B', 'C'] as const).map((tKey) => (
                <button
                  key={tKey}
                  onClick={() => setActiveTemplate(tKey)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeTemplate === tKey
                      ? 'bg-brand-950/60 border-brand-500/60 text-white shadow-md'
                      : 'bg-navy-950/60 border-navy-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <p className="text-xs font-bold text-brand-300">
                    Template {tKey}
                  </p>
                  <p className="text-[11px] mt-0.5 line-clamp-1 text-slate-400">
                    {tKey === 'A'
                      ? 'Personal Chat'
                      : tKey === 'B'
                      ? 'College Group'
                      : 'Student Club'}
                  </p>
                </button>
              ))}
            </div>

            {/* Template Preview and WhatsApp Button */}
            <div className="p-4 rounded-xl bg-navy-950 border border-navy-800 space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-300">
                  {templates[activeTemplate].title}
                </span>
                <span className="text-slate-400">
                  {templates[activeTemplate].audience}
                </span>
              </div>

              <div className="p-3 bg-navy-900 rounded-lg text-xs text-slate-200 font-mono leading-relaxed border border-navy-800 select-all">
                "{templates[activeTemplate].text}"
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Opens WhatsApp with prefilled message • No automated spam</span>
                </span>
                <button
                  onClick={() => openWhatsAppShare(templates[activeTemplate].text)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Share via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Privacy-Conscious Leaderboard (Section 5) */}
        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Student Referral Leaderboard
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">
              Privacy-Protected (Masked Identity)
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Top peer referrers helping classmates build their first AI project. No phone numbers or emails are ever published.
          </p>

          <div className="divide-y divide-navy-800 border border-navy-800 rounded-xl overflow-hidden bg-navy-950">
            {leaderboard.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400">
                Be the first to share your link and appear on the leaderboard!
              </div>
            ) : (
              leaderboard.map((entry) => (
                <div
                  key={entry.referralCode}
                  className={`p-3.5 flex items-center justify-between text-xs transition-colors ${
                    entry.referralCode === refCode
                      ? 'bg-brand-950/40 text-brand-200'
                      : 'hover:bg-navy-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                      entry.rank === 1
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : entry.rank === 2
                        ? 'bg-slate-400/20 text-slate-300 border border-slate-400/30'
                        : entry.rank === 3
                        ? 'bg-amber-700/20 text-amber-500 border border-amber-700/30'
                        : 'bg-navy-800 text-slate-400'
                    }`}>
                      #{entry.rank}
                    </span>
                    <div>
                      <p className="font-semibold text-white">
                        {entry.studentInitials}{' '}
                        {entry.referralCode === refCode && (
                          <span className="text-[10px] text-brand-400 ml-1 font-normal font-sans">
                            (You)
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {entry.collegeName} • {entry.branch.split('(')[1]?.replace(')', '') || entry.branch}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-brand-400 font-mono">
                      {entry.referralCount}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      peer signups
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dashboard Link for Campaign Evaluators */}
        <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-center space-y-2">
          <p className="text-xs text-slate-400">
            Are you reviewing this application for the growth marketing challenge?
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-1.5 text-xs text-brand-400 hover:text-brand-300 font-semibold"
          >
            <span>Open Campaign Manager Analytics Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
