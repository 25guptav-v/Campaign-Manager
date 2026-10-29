import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Target,
  Clock,
  Wallet,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FlaskConical,
  Activity,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { generateCampaignDiagnosis, CopilotAnalysisResult, CopilotInput } from '../lib/aiCopilot';
import { formatCurrencyINR } from '../lib/utils';

export const DashboardCopilot: React.FC = () => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [currentRegs, setCurrentRegs] = useState<number>(0);
  const [target, setTarget] = useState<number>(500);
  const [remainingDays, setRemainingDays] = useState<number>(3);
  const [remainingBudget, setRemainingBudget] = useState<number>(1550);
  const [spentBudget, setSpentBudget] = useState<number>(450);
  const [totalBudget, setTotalBudget] = useState<number>(2000);
  const [referralCount, setReferralCount] = useState<number>(0);
  const [channelCounts, setChannelCounts] = useState<Record<string, number>>({});

  const [analysis, setAnalysis] = useState<CopilotAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const loadData = () => {
    const s = Storage.getSettings();
    setIsDemoMode(s.isDemoMode);
    const regs = Storage.getRegistrations();
    const budget = Storage.getBudget();

    setCurrentRegs(regs.length);
    setTarget(s.registrationTarget || 500);
    setTotalBudget(s.totalBudget || 2000);

    const spent = budget.reduce((acc, curr) => acc + curr.actualSpend, 0);
    setSpentBudget(spent);
    setRemainingBudget(Math.max(0, (s.totalBudget || 2000) - spent));

    const refs = regs.filter((r) => !!r.referredByCode).length;
    setReferralCount(refs);

    const counts: Record<string, number> = {};
    regs.forEach((r) => {
      const src = r.acquisitionSource || 'whatsapp_groups';
      counts[src] = (counts[src] || 0) + 1;
    });
    setChannelCounts(counts);

    // Initial analysis
    const result = generateCampaignDiagnosis({
      target: s.registrationTarget || 500,
      currentRegistrations: regs.length,
      remainingDays: 3,
      totalBudget: s.totalBudget || 2000,
      spentBudget: spent,
      remainingBudget: Math.max(0, (s.totalBudget || 2000) - spent),
      channelBreakdown: counts,
      referralAttributedCount: refs,
      isDemoMode: s.isDemoMode,
    });
    setAnalysis(result);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('nxt_storage_updated', loadData);
    return () => window.removeEventListener('nxt_storage_updated', loadData);
  }, []);

  const handleRunDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = generateCampaignDiagnosis({
        target,
        currentRegistrations: currentRegs,
        remainingDays,
        totalBudget,
        spentBudget,
        remainingBudget,
        channelBreakdown: channelCounts,
        referralAttributedCount: referralCount,
        isDemoMode,
      });
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-brand-400" />
              <span>AI-Powered Campaign Copilot</span>
            </h1>
            <span className="text-xs bg-brand-950/70 text-brand-300 border border-brand-500/30 px-2 py-0.5 rounded font-mono">
              Rule-Based Diagnostic Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous growth diagnostic engine analyzing velocity gaps, CAC efficiency, and viral referral levers.
          </p>
        </div>

        <button
          onClick={handleRunDiagnosis}
          disabled={isAnalyzing}
          className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isAnalyzing ? 'Analyzing Campaign...' : 'Re-Run Diagnostic'}</span>
        </button>
      </div>

      {/* Input Parameters Control Strip (Section 10) */}
      <div className="bg-navy-900/80 border border-navy-800 rounded-2xl p-4.5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="font-semibold text-white">Active Engine Inputs</span>
          <span className="text-[11px] text-slate-400">
            Real-time parameters fed into the growth decision algorithm
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-800">
            <span className="text-[10px] text-slate-400 block">Target / Current</span>
            <span className="text-sm font-bold text-white font-mono">
              {currentRegs} / {target}
            </span>
          </div>

          <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-800">
            <span className="text-[10px] text-slate-400 block">Remaining Days</span>
            <div className="flex items-center space-x-1 mt-0.5">
              <input
                type="number"
                min={1}
                max={7}
                value={remainingDays}
                onChange={(e) => setRemainingDays(parseInt(e.target.value) || 1)}
                className="w-12 px-1.5 py-0.5 rounded bg-navy-900 border border-navy-700 text-white font-mono font-bold text-xs"
              />
              <span className="text-slate-400 text-xs">days</span>
            </div>
          </div>

          <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-800">
            <span className="text-[10px] text-slate-400 block">Remaining Budget</span>
            <span className="text-sm font-bold text-brand-300 font-mono">
              {formatCurrencyINR(remainingBudget)}
            </span>
          </div>

          <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-800">
            <span className="text-[10px] text-slate-400 block">Referral Signups</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {referralCount} ({currentRegs > 0 ? ((referralCount / currentRegs) * 100).toFixed(0) : 0}%)
            </span>
          </div>

          <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 block">Pacing Status</span>
            <span className={`text-xs font-bold inline-block mt-0.5 px-2 py-0.5 rounded ${
              analysis?.growthVelocity.trajectoryStatus === 'On Track'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                : analysis?.growthVelocity.trajectoryStatus === 'Target Achieved'
                ? 'bg-blue-950 text-blue-300 border border-blue-600/40'
                : 'bg-amber-950 text-amber-300 border border-amber-600/40'
            }`}>
              {analysis?.growthVelocity.trajectoryStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 5 Core Diagnostic Deliverables (Section 10 Requirement) */}
      {analysis && (
        <div className="space-y-5">
          {/* 1. Concise Campaign Diagnosis */}
          <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-brand-400" />
              <h2 className="text-base font-bold text-white">
                1. Campaign Health Diagnosis & Trajectory
              </h2>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed bg-navy-950 p-4 rounded-xl border border-navy-800">
              {analysis.diagnosis}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-navy-950/60 p-3 rounded-lg border border-navy-800/80">
                <span className="text-slate-400">Required Run Rate:</span>
                <span className="ml-2 font-mono font-bold text-brand-300">
                  {analysis.growthVelocity.requiredDailyRunRate} registrations / day
                </span>
              </div>
              <div className="bg-navy-950/60 p-3 rounded-lg border border-navy-800/80">
                <span className="text-slate-400">Estimated Current Pace:</span>
                <span className="ml-2 font-mono font-bold text-emerald-400">
                  ~{analysis.growthVelocity.currentDailyPace} registrations / day
                </span>
              </div>
            </div>
          </div>

          {/* 2. Most Promising Next Action */}
          <div className="bg-navy-900/70 border border-brand-500/30 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-brand-400">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-base font-bold text-white">
                2. Most Promising Next Action
              </h2>
            </div>
            <div className="p-4 rounded-xl bg-brand-950/30 border border-brand-500/20 text-slate-200 text-sm leading-relaxed">
              {analysis.mostPromisingNextAction}
            </div>
          </div>

          {/* 3. Recommended Experiment to Run */}
          <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-amber-400">
              <FlaskConical className="w-5 h-5" />
              <h2 className="text-base font-bold text-white">
                3. High-Leverage Growth Experiment
              </h2>
            </div>
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">
                  {analysis.recommendedExperiment.name}
                </span>
                <span className="text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                  Cost: {analysis.recommendedExperiment.estimatedCost}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Hypothesis:</span>
                <p className="text-slate-300 leading-relaxed">
                  {analysis.recommendedExperiment.hypothesis}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Execution Plan:</span>
                <p className="text-slate-300 leading-relaxed">
                  {analysis.recommendedExperiment.execution}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Relevant Metric to Monitor */}
          <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Target className="w-5 h-5" />
              <h2 className="text-base font-bold text-white">
                4. Primary Metric to Monitor
              </h2>
            </div>
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-sm font-bold text-white">
                  {analysis.metricToMonitor.primaryMetric}
                </span>
                <span className="text-brand-300 font-mono bg-navy-900 px-2.5 py-1 rounded border border-navy-700">
                  Target: {analysis.metricToMonitor.targetThreshold}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed pt-1">
                <strong>Why it matters:</strong> {analysis.metricToMonitor.whyItMatters}
              </p>
            </div>
          </div>

          {/* 5. Assumptions and Uncertainty Behind Recommendation */}
          <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center space-x-2 text-rose-400">
              <Shield className="w-5 h-5" />
              <h2 className="text-base font-bold text-white">
                5. Underlying Assumptions & Uncertainties
              </h2>
            </div>
            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2 text-xs">
              <ul className="space-y-2 text-slate-300">
                {analysis.assumptionsAndUncertainties.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
