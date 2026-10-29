import React from 'react';
import { Printer, Download, Sparkles, CheckCircle2, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import { Storage } from '../lib/storage';
import { formatCurrencyINR } from '../lib/utils';

export const GrowthPlanReportPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-navy-950 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Top Controls Bar (hidden during printing) */}
      <div className="no-print max-w-4xl w-full mb-6 bg-navy-950 border border-navy-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
              Executive Deliverable
            </span>
            <span className="text-xs text-slate-400">Section 13 Compliance</span>
          </div>
          <h1 className="text-lg font-bold mt-1">Two-Page Growth Plan Report</h1>
          <p className="text-xs text-slate-400">
            Formatted specifically for print/PDF export. Page breaks are strictly calibrated.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all active:scale-95"
        >
          <Printer className="w-4 h-4" />
          <span>Print or Save as PDF</span>
        </button>
      </div>

      {/* Printable Document Container */}
      <div className="w-full max-w-[210mm] space-y-8">
        {/* ================= PAGE 1 ================= */}
        <div className="print-page bg-white p-8 md:p-12 rounded-xl shadow-2xl text-slate-900 font-sans text-xs leading-relaxed border border-slate-200">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 block">
                NxtWave Growth Marketing Strategy Document
              </span>
              <h1 className="text-2xl font-black text-slate-950 tracking-tight mt-0.5">
                AI Workshop Growth Engine: 0 to 500 Registrations
              </h1>
              <p className="text-[11px] text-slate-600 mt-1">
                Campaign: <em>Build Your First AI Project in 60 Minutes</em> • Target Audience: Final-Year Engineering Students • Budget: ₹2,000
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 block">EXECUTIVE BRIEF</span>
              <span className="text-xs font-bold text-slate-900">PAGE 1 OF 2</span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {/* 1. Objective & Positioning */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <h3 className="font-bold text-[11px] uppercase tracking-wider text-slate-950">
                  1. Core Campaign Objective
                </h3>
                <p className="text-[11px] text-slate-700">
                  Generate <strong>500 valid registrations</strong> from final-year engineering students across India in <strong>7 days</strong> with a total marketing expenditure of <strong>₹2,000</strong>. The workshop is free, 60 minutes, and 100% online.
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <h3 className="font-bold text-[11px] uppercase tracking-wider text-slate-950">
                  2. Core Positioning & Hook
                </h3>
                <p className="text-[11px] text-slate-700">
                  <strong>"Build Your First AI Project in 60 Minutes."</strong> Demystifies AI by moving students from passive video watching to real, working code. Hands-on, practical, and interview-ready.
                </p>
              </div>
            </div>

            {/* 2. Target Student Persona & Psychology */}
            <div className="border border-slate-200 rounded-lg p-3.5 space-y-2">
              <h3 className="font-bold text-[11px] uppercase tracking-wider text-blue-800">
                3. Target Student Persona & Behavioral Drivers
              </h3>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div>
                  <strong className="block text-slate-950">Target Persona:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Final-year B.Tech / B.E. students (2025 batch) across CSE, IT, AI/ML, ECE, and Data Science preparing for campus placements and capstone evaluations.
                  </p>
                </div>
                <div>
                  <strong className="block text-slate-950">Student Motivations:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Urgent need for a tangible, working AI project on their resume to stand out in technical interviews without needing advanced math or complex GPU clusters.
                  </p>
                </div>
                <div>
                  <strong className="block text-slate-950">Registration Barriers:</strong>
                  <p className="text-slate-600 mt-0.5">
                    Overwhelmed by theoretical 40-hour ML courses; fear of prerequisites; skepticism about spammy webinars; friction in long forms.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Priority Acquisition Channels */}
            <div className="border border-slate-200 rounded-lg p-3.5 space-y-1.5">
              <h3 className="font-bold text-[11px] uppercase tracking-wider text-slate-950">
                4. Priority Acquisition Channels (Organic Priority)
              </h3>
              <div className="grid grid-cols-5 gap-2 text-[10px] text-center pt-1">
                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                  <span className="font-bold text-blue-900 block text-xs">200 (40%)</span>
                  <span className="text-slate-600">College WhatsApp Groups</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                  <span className="font-bold text-blue-900 block text-xs">100 (20%)</span>
                  <span className="text-slate-600">Coding Clubs (GDSC/ACM)</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                  <span className="font-bold text-blue-900 block text-xs">100 (20%)</span>
                  <span className="text-slate-600">Class Reps & Amb.</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                  <span className="font-bold text-blue-900 block text-xs">50 (10%)</span>
                  <span className="text-slate-600">Targeted Email Outreach</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                  <span className="font-bold text-blue-900 block text-xs">50 (10%)</span>
                  <span className="text-slate-600">LinkedIn Communities</span>
                </div>
              </div>
            </div>

            {/* 4. Seven-Day Execution Plan */}
            <div className="border border-slate-200 rounded-lg p-3.5 space-y-2">
              <h3 className="font-bold text-[11px] uppercase tracking-wider text-slate-950">
                5. Seven-Day Operational Execution Plan (Proposed Sprint)
              </h3>
              <table className="w-full text-left border-collapse text-[10px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
                    <th className="p-1.5 w-12">Day</th>
                    <th className="p-1.5 w-44">Phase & Focus</th>
                    <th className="p-1.5">Key Tactics & Milestones</th>
                    <th className="p-1.5 w-16 text-right">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 1</td>
                    <td className="p-1.5 font-semibold">Prep & Foundation</td>
                    <td className="p-1.5">Launch mobile-optimized registration; test referral loop; draft WhatsApp templates.</td>
                    <td className="p-1.5 text-right font-mono font-bold">35</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 2</td>
                    <td className="p-1.5 font-semibold">College Distribution</td>
                    <td className="p-1.5">Engage 30 authorized college WhatsApp group admins; share Template B via Class Reps.</td>
                    <td className="p-1.5 text-right font-mono font-bold">65</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 3</td>
                    <td className="p-1.5 font-semibold">Ambassador Activation</td>
                    <td className="p-1.5">Onboard 15 student ambassadors; issue custom referral links; launch hostel poster blitz.</td>
                    <td className="p-1.5 text-right font-mono font-bold">85</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 4</td>
                    <td className="p-1.5 font-semibold">Demonstrate Project Value</td>
                    <td className="p-1.5">Publish sneak-peek teaser of the 3 beginner projects (Resume Assistant, Study Summarizer).</td>
                    <td className="p-1.5 text-right font-mono font-bold">90</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 5</td>
                    <td className="p-1.5 font-semibold">Targeted Follow-up</td>
                    <td className="p-1.5">Follow up with club leads; send reminder emails strictly to opted-in students; review CAC.</td>
                    <td className="p-1.5 text-right font-mono font-bold">80</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 6</td>
                    <td className="p-1.5 font-semibold">Referral Amplification</td>
                    <td className="p-1.5">Highlight privacy leaderboard; prompt registrants to invite final-year capstone partners.</td>
                    <td className="p-1.5 text-right font-mono font-bold">85</td>
                  </tr>
                  <tr>
                    <td className="p-1.5 font-bold font-mono">Day 7</td>
                    <td className="p-1.5 font-semibold">Final Push & Audit</td>
                    <td className="p-1.5">Last-call reminder; run automated email deduplication script; verify attribution integrity.</td>
                    <td className="p-1.5 text-right font-mono font-bold">60</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className="page-break print-page bg-white p-8 md:p-12 rounded-xl shadow-2xl text-slate-900 font-sans text-xs leading-relaxed border border-slate-200">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-3 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 block">
                NxtWave Growth Marketing Strategy Document
              </span>
              <h2 className="text-xl font-black text-slate-950 tracking-tight">
                Economics, Risk Matrix & Critical Judgment
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 block">EXECUTIVE BRIEF</span>
              <span className="text-xs font-bold text-slate-900">PAGE 2 OF 2</span>
            </div>
          </div>

          <div className="mt-4 space-y-3.5">
            {/* 1. Target Model & Budget Allocation */}
            <div className="grid grid-cols-2 gap-3.5">
              {/* Target Model Table */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-1.5">
                <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-950">
                  6. Registration Target Model
                </h3>
                <table className="w-full text-left text-[9.5px]">
                  <thead>
                    <tr className="border-b font-bold text-slate-700">
                      <th>Channel</th>
                      <th className="text-right">Reach</th>
                      <th className="text-right">Conv%</th>
                      <th className="text-right">Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td>College WhatsApp</td><td className="text-right font-mono">4,500</td><td className="text-right font-mono">4.4%</td><td className="text-right font-bold font-mono">200</td></tr>
                    <tr><td>Coding Clubs</td><td className="text-right font-mono">2,200</td><td className="text-right font-mono">4.5%</td><td className="text-right font-bold font-mono">100</td></tr>
                    <tr><td>Class Reps & Amb.</td><td className="text-right font-mono">2,000</td><td className="text-right font-mono">5.0%</td><td className="text-right font-bold font-mono">100</td></tr>
                    <tr><td>Email Outreach</td><td className="text-right font-mono">1,500</td><td className="text-right font-mono">3.3%</td><td className="text-right font-bold font-mono">50</td></tr>
                    <tr><td>LinkedIn Communities</td><td className="text-right font-mono">1,800</td><td className="text-right font-mono">2.8%</td><td className="text-right font-bold font-mono">50</td></tr>
                    <tr className="font-bold bg-slate-50"><td>Total Hypothesis</td><td className="text-right font-mono">12,000</td><td className="text-right font-mono">~4.1%</td><td className="text-right font-bold font-mono text-blue-700">500</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Budget Allocation Table */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-1.5">
                <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-950">
                  7. ₹2,000 Budget Allocation
                </h3>
                <table className="w-full text-left text-[9.5px]">
                  <thead>
                    <tr className="border-b font-bold text-slate-700">
                      <th>Line Item</th>
                      <th className="text-right">Budget</th>
                      <th className="text-right">Strategy Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr><td>Creative Assets</td><td className="text-right font-mono font-bold">₹300</td><td className="text-right">Figma & WhatsApp kits</td></tr>
                    <tr><td>Paid Experiment</td><td className="text-right font-mono font-bold">₹1,000</td><td className="text-right">Optional Meta/LinkedIn test</td></tr>
                    <tr><td>Ambassador Support</td><td className="text-right font-mono font-bold">₹400</td><td className="text-right">Posters & recognition</td></tr>
                    <tr><td>Contingency Buffer</td><td className="text-right font-mono font-bold">₹300</td><td className="text-right">Day 6 reserve</td></tr>
                    <tr className="font-bold bg-slate-50"><td>Total Hard Cap</td><td className="text-right font-mono font-bold text-blue-700">₹2,000</td><td className="text-right font-bold">₹4 / target signup</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Metrics & Measurement Approach */}
            <div className="border border-slate-200 rounded-lg p-3 space-y-1">
              <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-950">
                8. Metrics & Measurement Approach
              </h3>
              <p className="text-[10px] text-slate-700">
                Primary North Star: <strong>Valid Unique Registrations (500)</strong>. Supporting KPIs: <em>Cost Per Registration</em> (Spent / Valid), <em>Target Achievement %</em>, <em>Daily Registration Velocity</em>, and <em>Referral Viral Factor</em> (Attributed / Total). Deduplication is strictly enforced by normalizing email strings to lowercase.
              </p>
            </div>

            {/* 3. Risks & Mitigations */}
            <div className="border border-slate-200 rounded-lg p-3 space-y-1.5">
              <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-950">
                9. Key Growth Risks & Strategic Mitigations
              </h3>
              <div className="grid grid-cols-3 gap-2.5 text-[9.5px]">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <strong className="block text-slate-900">Risk: Group Admin Friction</strong>
                  <p className="text-slate-600 mt-0.5">Admins flag messages as spam. <em>Mitigation:</em> Reach admins 1-on-1 first with Template C offering value to their community.</p>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <strong className="block text-slate-900">Risk: Paid Ad Budget Burn</strong>
                  <p className="text-slate-600 mt-0.5">₹2,000 exhausts in 40 clicks. <em>Mitigation:</em> Lock ₹1,000 experiment until audience CTR is proven on organic channels.</p>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <strong className="block text-slate-900">Risk: Low Show-up Rate</strong>
                  <p className="text-slate-600 mt-0.5">Free webinars suffer 60% drop-off. <em>Mitigation:</em> Obtain WhatsApp opt-in for automated reminder sequence and project starter pack.</p>
                </div>
              </div>
            </div>

            {/* 4. What Changed & AI Decisions Rejected */}
            <div className="border border-slate-200 rounded-lg p-3 space-y-1.5">
              <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-950">
                10. AI Suggestions Evaluated & Independent Marketer Decisions
              </h3>
              <div className="grid grid-cols-2 gap-3 text-[9.5px]">
                <div>
                  <strong className="text-rose-700 block">Rejected: Cash Referral Rewards (AI)</strong>
                  <p className="text-slate-600 mt-0.5">
                    AI suggested paying ₹50 Paytm cash per referral. <em>Why rejected:</em> Violates ₹2,000 budget immediately and incentivizes fake burner emails. Replaced with social capital and project team sharing.
                  </p>
                </div>
                <div>
                  <strong className="text-amber-700 block">Modified: Paid Ad Allocation (AI)</strong>
                  <p className="text-slate-600 mt-0.5">
                    AI suggested spending 80% on Instagram ads. <em>Why modified:</em> Ed-tech student CAC in India exceeds ₹35; ₹1,600 would fail the 500-seat goal. Shifted 80% to zero-CAC campus networks.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. What Would Be Improved With Another 24 Hours */}
            <div className="border border-slate-200 rounded-lg p-3 space-y-1">
              <h3 className="font-bold text-[10px] uppercase tracking-wider text-slate-950">
                11. What Would Be Improved With Another 24 Hours
              </h3>
              <p className="text-[10px] text-slate-700 leading-relaxed">
                1) Connect a live WhatsApp Business Cloud API webhook for instant automated calendar invite dispatch; 2) Build an automated Telegram/Discord bot for real-time Class Rep leaderboard updates; 3) Host a 10-minute preview video showing the Resume Feedback Assistant working live to boost page conversion by an estimated 15%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
