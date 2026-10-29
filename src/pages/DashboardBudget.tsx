import React, { useState, useEffect, useMemo } from 'react';
import {
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  Info,
  DollarSign,
  PieChart as PieIcon,
  ShieldAlert,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { BudgetItem } from '../types';
import { formatCurrencyINR } from '../lib/utils';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const DashboardBudget: React.FC = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<Omit<BudgetItem, 'id'>>({
    category: '',
    allocated: 200,
    actualSpend: 0,
    description: '',
    isPaidPromotion: false,
    validationStatus: 'Planned',
    notes: '',
  });

  const loadBudget = () => {
    setBudgetItems(Storage.getBudget());
  };

  useEffect(() => {
    loadBudget();
    window.addEventListener('nxt_storage_updated', loadBudget);
    return () => window.removeEventListener('nxt_storage_updated', loadBudget);
  }, []);

  const handleUpdate = (id: string, field: keyof BudgetItem, val: any) => {
    setBudgetItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleSaveAll = () => {
    budgetItems.forEach((item) => {
      Storage.updateBudgetItem(item.id, item);
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Delete this budget line item?')) {
      Storage.deleteBudgetItem(id);
      loadBudget();
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.category.trim()) return;
    Storage.addBudgetItem(newItem);
    setShowAddModal(false);
    setNewItem({
      category: '',
      allocated: 200,
      actualSpend: 0,
      description: '',
      isPaidPromotion: false,
      validationStatus: 'Planned',
      notes: '',
    });
    loadBudget();
  };

  // Calculations
  const MAX_BUDGET = 2000;
  const totalAllocated = useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + Number(curr.allocated || 0), 0);
  }, [budgetItems]);

  const totalActualSpend = useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + Number(curr.actualSpend || 0), 0);
  }, [budgetItems]);

  const isOverBudget = totalAllocated > MAX_BUDGET;
  const remainingToAllocate = MAX_BUDGET - totalAllocated;

  // Chart data
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  const chartData = budgetItems.map((item, idx) => ({
    name: item.category,
    value: Number(item.allocated || 0),
    color: COLORS[idx % COLORS.length],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              ₹2,000 Campaign Budget Planner
            </h1>
            <span className="text-xs bg-navy-800 text-brand-300 px-2 py-0.5 rounded border border-navy-700 font-mono">
              Ceiling: ₹2,000 INR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Strict capital allocation enforcing lean growth marketing with organic priority.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-brand-400" />
            <span>Add Item</span>
          </button>
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Saved!' : 'Save Budget'}</span>
          </button>
        </div>
      </div>

      {/* Over-Budget Alert Banner (Section 9 Requirement) */}
      {isOverBudget && (
        <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-600/60 text-xs text-rose-200 flex items-start space-x-3 shadow-lg shadow-rose-950/50 animate-pulse">
          <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-sm text-rose-300">
              Budget Exceeded Warning! Total Allocation: {formatCurrencyINR(totalAllocated)} / {formatCurrencyINR(MAX_BUDGET)}
            </p>
            <p className="leading-relaxed">
              The project mandate sets a hard limit of <strong>₹2,000 total budget</strong>. Your current plan exceeds this ceiling by {formatCurrencyINR(totalAllocated - MAX_BUDGET)}. Please reduce allocations or contingency to remain compliant with the assignment constraints.
            </p>
          </div>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs font-medium text-slate-400">Total Budget Limit</span>
          <p className="text-2xl font-extrabold text-white font-mono">
            {formatCurrencyINR(MAX_BUDGET)}
          </p>
          <p className="text-[11px] text-slate-500">Non-negotiable ceiling</p>
        </div>

        <div className={`bg-navy-900/70 border rounded-2xl p-4 space-y-1 ${
          isOverBudget ? 'border-rose-500/60' : 'border-navy-800'
        }`}>
          <span className="text-xs font-medium text-slate-400">Total Planned Allocation</span>
          <p className={`text-2xl font-extrabold font-mono ${
            isOverBudget ? 'text-rose-400' : 'text-white'
          }`}>
            {formatCurrencyINR(totalAllocated)}
          </p>
          <p className="text-[11px] text-slate-400">
            {remainingToAllocate >= 0
              ? `${formatCurrencyINR(remainingToAllocate)} unallocated buffer`
              : `${formatCurrencyINR(Math.abs(remainingToAllocate))} over limit`}
          </p>
        </div>

        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs font-medium text-slate-400">Actual Spend to Date</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">
            {formatCurrencyINR(totalActualSpend)}
          </p>
          <p className="text-[11px] text-slate-500">
            {formatCurrencyINR(MAX_BUDGET - totalActualSpend)} cash on hand
          </p>
        </div>

        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4 space-y-1">
          <span className="text-xs font-medium text-slate-400">Organic vs Paid Ratio</span>
          <p className="text-2xl font-extrabold text-brand-400 font-mono">
            50% / 50%
          </p>
          <p className="text-[11px] text-slate-400">Paid experiment is optional</p>
        </div>
      </div>

      {/* Allocation Breakdown and Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table of Allocations (2 cols) */}
        <div className="lg:col-span-2 bg-navy-900/70 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-navy-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">Proposed Budget Allocation Breakdown</h2>
            <span className="text-[11px] text-slate-400">All fields editable inline</span>
          </div>

          <div className="divide-y divide-navy-800/70">
            {budgetItems.map((item) => (
              <div key={item.id} className="p-4 space-y-3 hover:bg-navy-850/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">
                      {item.category}
                    </span>
                    {item.isPaidPromotion && (
                      <span className="text-[10px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded">
                        Optional Paid Experiment
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 self-start sm:self-auto">
                    {/* Status badge / selector */}
                    <select
                      value={item.validationStatus}
                      onChange={(e) => handleUpdate(item.id, 'validationStatus', e.target.value)}
                      className="px-2 py-1 rounded text-[11px] font-semibold bg-navy-950 border border-navy-700 text-slate-200"
                    >
                      <option value="Planned">Planned</option>
                      <option value="Testing">Testing</option>
                      <option value="Committed">Committed</option>
                      <option value="On Hold">On Hold</option>
                    </select>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete line item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Amount Inputs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-navy-950/60 p-2.5 rounded-xl border border-navy-800 text-xs">
                  <div>
                    <label className="text-[10px] font-semibold uppercase text-slate-400 block">
                      Allocated (₹)
                    </label>
                    <input
                      type="number"
                      value={item.allocated}
                      onChange={(e) =>
                        handleUpdate(item.id, 'allocated', parseInt(e.target.value) || 0)
                      }
                      className="w-full mt-1 px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-white font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase text-slate-400 block">
                      Actual Spent (₹)
                    </label>
                    <input
                      type="number"
                      value={item.actualSpend}
                      onChange={(e) =>
                        handleUpdate(item.id, 'actualSpend', parseInt(e.target.value) || 0)
                      }
                      className="w-full mt-1 px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-emerald-400 font-mono font-bold"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex flex-col justify-end">
                    <span className="text-[10px] text-slate-400">Variance</span>
                    <span className="text-xs font-mono font-semibold text-slate-200 mt-1">
                      {formatCurrencyINR(item.allocated - item.actualSpend)} unspent
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Allocation Pie (1 col) */}
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Budget Allocation Share</h2>
            <p className="text-[11px] text-slate-400">Share of ₹2,000 across categories</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => formatCurrencyINR(Number(val))}
                  contentStyle={{
                    backgroundColor: '#0B1120',
                    borderColor: '#1E293B',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {chartData.map((c, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 truncate text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="truncate">{c.name}</span>
                </span>
                <span className="font-mono font-bold text-white ml-2">
                  {formatCurrencyINR(c.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Rule Notes (Section 9) */}
      <div className="bg-navy-900/40 border border-navy-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
        <h3 className="font-bold text-white flex items-center space-x-1.5">
          <Info className="w-4 h-4 text-brand-400" />
          <span>Strategic Constraints & Guidelines (Section 9 Compliance):</span>
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-400 leading-relaxed">
          <li>
            <strong>Organic First:</strong> Prefer organic distribution through authorized college communities, student clubs, class reps, and email outreach.
          </li>
          <li>
            <strong>Paid Promotion is Optional:</strong> The ₹1,000 promotional allocation is a secondary contingency experiment. Before deploying it, validate audience targeting and click costs on Meta or LinkedIn.
          </li>
          <li>
            <strong>Ambassador Support:</strong> Do not assume student ambassadors can be paid in cash. The ₹400 allocation covers campus posters, volunteer perks, and digital recognition badges.
          </li>
        </ul>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add Budget Line Item</h3>
            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="e.g. WhatsApp Bot API Trial"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Allocated (₹)</label>
                  <input
                    type="number"
                    value={newItem.allocated}
                    onChange={(e) => setNewItem({ ...newItem, allocated: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Actual Spend (₹)</label>
                  <input
                    type="number"
                    value={newItem.actualSpend}
                    onChange={(e) => setNewItem({ ...newItem, actualSpend: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Operational justification for this spend"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="isPaid"
                  checked={newItem.isPaidPromotion}
                  onChange={(e) => setNewItem({ ...newItem, isPaidPromotion: e.target.checked })}
                  className="rounded border-slate-700 text-brand-600 bg-navy-950"
                />
                <label htmlFor="isPaid" className="text-slate-300">
                  This item is paid promotion
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-navy-800 text-slate-300 hover:bg-navy-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-semibold"
                >
                  Add Line Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
