import React, { useState, useEffect } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  User,
  Wallet,
  Target,
  ArrowRight,
  Save,
  Info,
  Edit2,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { DayPlan } from '../types';
import { formatCurrencyINR } from '../lib/utils';

export const DashboardPlanner: React.FC = () => {
  const [planner, setPlanner] = useState<DayPlan[]>([]);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    setPlanner(Storage.getPlanner());
  }, []);

  const handleUpdate = (dayNum: number, field: keyof DayPlan, val: any) => {
    setPlanner((prev) =>
      prev.map((p) => (p.day === dayNum ? { ...p, [field]: val } : p))
    );
  };

  const handleSaveDay = (dayNum: number) => {
    const item = planner.find((p) => p.day === dayNum);
    if (item) {
      Storage.updatePlannerDay(dayNum, item);
      setEditingDay(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const statusColors = {
    Completed: 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40',
    'In Progress': 'bg-blue-950/60 text-blue-300 border-blue-600/40',
    Planned: 'bg-navy-800 text-slate-300 border-slate-700',
    Blocked: 'bg-rose-950/60 text-rose-300 border-rose-600/40',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Seven-Day Campaign Execution Planner
            </h1>
            <span className="text-xs bg-navy-800 text-brand-300 px-2 py-0.5 rounded border border-navy-700 font-medium">
              Sprint Roadmap
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Structured day-by-day playbook for achieving 500 registrations on ₹2,000 budget.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-600/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Plan Updated Successfully!</span>
          </span>
        )}
      </div>

      {/* Prominent Label Notice (Section 7) */}
      <div className="p-3.5 rounded-xl bg-navy-900/50 border border-navy-800 text-xs flex items-start space-x-2.5 text-slate-300">
        <Info className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Proposed Campaign Schedule:</strong> This timeline reflects the growth strategy designed for the 7-day sprint. It is a proposed operational schedule for an interview evaluation, not a campaign that has already been executed in the real world.
        </p>
      </div>

      {/* 7 Days Timeline List */}
      <div className="space-y-4">
        {planner.map((item) => {
          const isEditing = editingDay === item.day;

          return (
            <div
              key={item.day}
              className={`bg-navy-900/70 border rounded-2xl p-5 transition-all shadow-md ${
                item.status === 'In Progress'
                  ? 'border-brand-500/50 shadow-brand-500/5'
                  : 'border-navy-800'
              }`}
            >
              {/* Day Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800/80 pb-3.5">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center font-bold font-mono text-brand-400 text-sm">
                    D{item.day}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
                        {item.phase}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Owner: {item.owner}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 self-start sm:self-auto">
                  {/* Status dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdate(item.day, 'status', e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                      statusColors[item.status] || statusColors.Planned
                    }`}
                  >
                    <option value="Planned" className="bg-navy-900 text-white">Planned</option>
                    <option value="In Progress" className="bg-navy-900 text-white">In Progress</option>
                    <option value="Completed" className="bg-navy-900 text-white">Completed</option>
                    <option value="Blocked" className="bg-navy-900 text-white">Blocked</option>
                  </select>

                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveDay(item.day);
                      } else {
                        setEditingDay(item.day);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs flex items-center space-x-1 transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-3.5 h-3.5 text-brand-400" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Edit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Day Body */}
              <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Planned Activities Checklist (2 cols) */}
                <div className="lg:col-span-2 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Planned Milestones & Tactics
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {item.plannedActivities.map((act, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            item.status === 'Completed' ? 'text-emerald-400' : 'text-slate-600'
                          }`}
                        />
                        <span className="leading-relaxed">{act}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Next Action Box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-navy-950 border border-navy-800 text-xs">
                    <span className="font-semibold text-brand-300 flex items-center space-x-1">
                      <ArrowRight className="w-3 h-3 text-brand-400" />
                      <span>Next Operational Action:</span>
                    </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={item.nextAction}
                        onChange={(e) => handleUpdate(item.day, 'nextAction', e.target.value)}
                        className="w-full mt-1 px-2.5 py-1.5 rounded bg-navy-900 border border-navy-700 text-white text-xs"
                      />
                    ) : (
                      <p className="mt-0.5 text-slate-300 leading-snug">
                        {item.nextAction}
                      </p>
                    )}
                  </div>
                </div>

                {/* Day Metrics & Budget Summary (1 col) */}
                <div className="bg-navy-950/70 border border-navy-800/80 rounded-xl p-3.5 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-navy-800/60 pb-2">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Target className="w-3.5 h-3.5 text-slate-400" />
                      <span>Day Target</span>
                    </span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.targetRegistrations}
                        onChange={(e) =>
                          handleUpdate(item.day, 'targetRegistrations', parseInt(e.target.value) || 0)
                        }
                        className="w-16 px-1.5 py-0.5 rounded bg-navy-900 border border-navy-700 text-right text-white font-mono"
                      />
                    ) : (
                      <span className="font-bold text-white font-mono">
                        {item.targetRegistrations} regs
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-b border-navy-800/60 pb-2">
                    <span className="text-slate-400">Actual Recorded</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {item.actualRegistrations} regs
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-navy-800/60 pb-2">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Wallet className="w-3.5 h-3.5 text-slate-400" />
                      <span>Budget Alloc.</span>
                    </span>
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.budgetAllocated}
                        onChange={(e) =>
                          handleUpdate(item.day, 'budgetAllocated', parseInt(e.target.value) || 0)
                        }
                        className="w-16 px-1.5 py-0.5 rounded bg-navy-900 border border-navy-700 text-right text-white font-mono"
                      />
                    ) : (
                      <span className="font-bold text-slate-200 font-mono">
                        {formatCurrencyINR(item.budgetAllocated)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Actual Spend</span>
                    <span className="font-bold text-brand-300 font-mono">
                      {formatCurrencyINR(item.actualSpend)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
