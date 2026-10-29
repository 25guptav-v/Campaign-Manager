import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  GitBranch,
  AlertTriangle,
  Info,
  CheckCircle2,
  DollarSign,
  Users,
  Percent,
  Sliders,
  Sparkles,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { TargetModelRow, AcquisitionChannelId } from '../types';
import { formatCurrencyINR } from '../lib/utils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export const DashboardChannels: React.FC = () => {
  const [modelRows, setModelRows] = useState<TargetModelRow[]>([]);
  const [activeTab, setActiveTab] = useState<'model' | 'analytics'>('model');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [actualChannelCounts, setActualChannelCounts] = useState<Record<string, number>>({});

  const loadData = () => {
    const rows = Storage.getTargetModel();
    setModelRows(rows);

    const regs = Storage.getRegistrations();
    const counts: Record<string, number> = {};
    regs.forEach((r) => {
      const src = r.acquisitionSource || 'whatsapp_groups';
      counts[src] = (counts[src] || 0) + 1;
    });
    setActualChannelCounts(counts);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('nxt_storage_updated', loadData);
    return () => window.removeEventListener('nxt_storage_updated', loadData);
  }, []);

  const handleInputChange = (
    channelId: string,
    field: keyof TargetModelRow,
    value: any
  ) => {
    setModelRows((prev) =>
      prev.map((row) => (row.channelId === channelId ? { ...row, [field]: value } : row))
    );
  };

  const handleSave = () => {
    modelRows.forEach((row) => {
      Storage.updateTargetModelRow(row.channelId, row);
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Model Totals & Calculations
  const calculatedRows = useMemo(() => {
    return modelRows.map((r) => {
      const forecast = Math.round(r.estimatedReach * (r.conversionRatePercent / 100));
      const actual = actualChannelCounts[r.channelId] || 0;
      const isOverEstimated = r.plannedTarget > r.estimatedReach;

      return {
        ...r,
        forecastRegistrations: forecast,
        actualRegistrations: actual,
        isOverEstimated,
      };
    });
  }, [modelRows, actualChannelCounts]);

  const totalPlannedTarget = calculatedRows.reduce((a, c) => a + Number(c.plannedTarget || 0), 0);
  const totalEstimatedReach = calculatedRows.reduce((a, c) => a + Number(c.estimatedReach || 0), 0);
  const totalForecastBase = calculatedRows.reduce((a, c) => a + c.forecastRegistrations, 0);
  const totalActual = calculatedRows.reduce((a, c) => a + c.actualRegistrations, 0);
  const totalCost = calculatedRows.reduce((a, c) => a + Number(c.costAllocated || 0), 0);

  // Scenarios (Section 8)
  const lowScenario = Math.round(totalForecastBase * 0.7);
  const baseScenario = totalForecastBase;
  const highScenario = Math.round(totalForecastBase * 1.35);

  // Chart comparison data
  const chartData = calculatedRows.map((r) => ({
    name: r.channelName.split(' ')[0] + ' ' + (r.channelName.split(' ')[1] || ''),
    PlannedTarget: r.plannedTarget,
    Forecast: r.forecastRegistrations,
    Actual: r.actualRegistrations,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Registration Target Model & Channels
            </h1>
            <span className="text-xs bg-navy-800 text-brand-300 px-2 py-0.5 rounded border border-navy-700">
              Target: 500 Signups
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Editable bottom-up planning model mapping channel reach, conversion rate, and realistic forecasts.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={handleSave}
            className="inline-flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Changes Saved!' : 'Save Model'}</span>
          </button>
        </div>
      </div>

      {/* Scenarios Overview Cards (Section 8) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Low Scenario */}
        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Conservative (Low)
            </span>
            <span className="text-xs font-mono text-slate-500">-30% CTR</span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">
            {lowScenario} <span className="text-xs font-normal text-slate-400">regs</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Accounts for community admin delays and lower group post visibility.
          </p>
        </div>

        {/* Base Scenario */}
        <div className="bg-navy-900/90 border border-brand-500/40 rounded-2xl p-4 space-y-1 shadow-lg shadow-brand-500/5">
          <div className="flex items-center justify-between text-brand-300">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Planning Base Case
            </span>
            <span className="text-xs font-mono text-brand-400">Primary Hypothesis</span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">
            {baseScenario} <span className="text-xs font-normal text-slate-400">regs</span>
          </p>
          <p className="text-[11px] text-slate-300">
            Requires active Class Reps and ~4.0% average registration conversion.
          </p>
        </div>

        {/* High Scenario */}
        <div className="bg-navy-900/60 border border-navy-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Viral Multiplier (High)
            </span>
            <span className="text-xs font-mono text-emerald-500">+35% viral</span>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">
            {highScenario} <span className="text-xs font-normal text-slate-400">regs</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Achieved if peer project referral k-factor exceeds 0.35 in multiple colleges.
          </p>
        </div>
      </div>

      {/* Model vs Forecast vs Actual Chart */}
      <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Channel Hypothesis vs Forecast vs Recorded Actuals</h2>
            <p className="text-[11px] text-slate-400">Visual comparison of planned targets against real-time data</p>
          </div>
          <span className="text-[10px] text-slate-400 bg-navy-950 px-2 py-1 rounded">
            Editable assumptions below
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} interval={0} angle={-10} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B1120',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="PlannedTarget" fill="#64748b" radius={[4, 4, 0, 0]} name="Planned Target" />
              <Bar dataKey="Forecast" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Calculated Forecast" />
              <Bar dataKey="Actual" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual Signups" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Editable Table (Section 8) */}
      <div className="bg-navy-900/70 border border-navy-800 rounded-2xl overflow-hidden shadow-xl space-y-4">
        <div className="p-4 border-b border-navy-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Channel Planning Hypothesis Parameters</h2>
            <p className="text-[11px] text-slate-400">
              Adjust communities, reach, and conversion rate assumptions. Forecast calculates in real-time.
            </p>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-amber-400 bg-amber-950/40 border border-amber-900/40 px-2.5 py-1 rounded-lg">
            <Info className="w-3.5 h-3.5" />
            <span>Forecast = Reach × Conversion Rate%</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-navy-800 bg-navy-950/80 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <th className="py-3 px-4">Acquisition Channel</th>
                <th className="py-3 px-3 text-center">Planned Target</th>
                <th className="py-3 px-3 text-center">Communities</th>
                <th className="py-3 px-3 text-center">Est. Reach</th>
                <th className="py-3 px-3 text-center">Assumed Conv. %</th>
                <th className="py-3 px-3 text-center">Forecast</th>
                <th className="py-3 px-3 text-center">Actual Signups</th>
                <th className="py-3 px-3 text-center">Confidence</th>
                <th className="py-3 px-3 text-center">Budget</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80">
              {calculatedRows.map((row) => (
                <tr key={row.channelId} className="hover:bg-navy-800/30 transition-colors">
                  {/* Channel Name */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">
                      {row.channelName}
                    </div>
                    {row.isOverEstimated && (
                      <span className="text-[10px] text-rose-400 flex items-center space-x-1 mt-0.5">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Warning: Target exceeds estimated reach!</span>
                      </span>
                    )}
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 max-w-xs">
                      {row.notes}
                    </div>
                  </td>

                  {/* Planned Target */}
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.plannedTarget}
                      onChange={(e) =>
                        handleInputChange(row.channelId, 'plannedTarget', parseInt(e.target.value) || 0)
                      }
                      className="w-16 px-2 py-1 rounded bg-navy-950 border border-navy-700 text-center text-white font-mono"
                    />
                  </td>

                  {/* Communities */}
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.communitiesReached}
                      onChange={(e) =>
                        handleInputChange(row.channelId, 'communitiesReached', parseInt(e.target.value) || 0)
                      }
                      className="w-14 px-2 py-1 rounded bg-navy-950 border border-navy-700 text-center text-white font-mono"
                    />
                  </td>

                  {/* Estimated Reach */}
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.estimatedReach}
                      onChange={(e) =>
                        handleInputChange(row.channelId, 'estimatedReach', parseInt(e.target.value) || 0)
                      }
                      className="w-20 px-2 py-1 rounded bg-navy-950 border border-navy-700 text-center text-white font-mono"
                    />
                  </td>

                  {/* Assumed Conv % */}
                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center space-x-1">
                      <input
                        type="number"
                        step="0.1"
                        value={row.conversionRatePercent}
                        onChange={(e) =>
                          handleInputChange(row.channelId, 'conversionRatePercent', parseFloat(e.target.value) || 0)
                        }
                        className="w-14 px-1.5 py-1 rounded bg-navy-950 border border-navy-700 text-center text-brand-300 font-mono"
                      />
                      <span className="text-slate-400">%</span>
                    </div>
                  </td>

                  {/* Forecast */}
                  <td className="py-3 px-3 text-center font-mono font-bold text-brand-400 text-sm">
                    {row.forecastRegistrations}
                  </td>

                  {/* Actual */}
                  <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400 text-sm">
                    {row.actualRegistrations}
                  </td>

                  {/* Confidence */}
                  <td className="py-3 px-3 text-center">
                    <select
                      value={row.confidenceLevel}
                      onChange={(e) =>
                        handleInputChange(row.channelId, 'confidenceLevel', e.target.value as any)
                      }
                      className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                        row.confidenceLevel === 'High'
                          ? 'bg-emerald-950/60 border-emerald-600/40 text-emerald-300'
                          : row.confidenceLevel === 'Medium'
                          ? 'bg-amber-950/60 border-amber-600/40 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      <option value="High" className="bg-navy-900">High</option>
                      <option value="Medium" className="bg-navy-900">Medium</option>
                      <option value="Low" className="bg-navy-900">Low</option>
                    </select>
                  </td>

                  {/* Budget */}
                  <td className="py-3 px-3 text-center font-mono text-slate-300">
                    ₹{row.costAllocated}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-navy-950/90 font-bold border-t border-navy-700 text-white">
                <td className="py-3 px-4">Hypothesis Totals</td>
                <td className="py-3 px-3 text-center font-mono">{totalPlannedTarget}</td>
                <td className="py-3 px-3 text-center font-mono">-</td>
                <td className="py-3 px-3 text-center font-mono">{totalEstimatedReach.toLocaleString()}</td>
                <td className="py-3 px-3 text-center font-mono">~3.9%</td>
                <td className="py-3 px-3 text-center font-mono text-brand-400 text-sm">{totalForecastBase}</td>
                <td className="py-3 px-3 text-center font-mono text-emerald-400 text-sm">{totalActual}</td>
                <td className="py-3 px-3 text-center text-slate-400">-</td>
                <td className="py-3 px-3 text-center font-mono">{formatCurrencyINR(totalCost)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Model Integrity Note (from Section 8) */}
      <div className="p-4 rounded-xl bg-navy-900/40 border border-navy-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
        <p className="font-semibold text-slate-300 flex items-center space-x-1.5">
          <Info className="w-4 h-4 text-brand-400" />
          <span>Strategic Modeling Disclaimer:</span>
        </p>
        <p>
          These numbers are <strong>planning hypotheses, not verified forecasts</strong>. Reaching 500 registrations in 7 days depends strictly on securing verified access to sufficiently large, relevant college engineering communities and achieving prompt distribution through authorized student leaders. Do not treat these scenarios as guaranteed outcomes.
        </p>
      </div>
    </div>
  );
};
