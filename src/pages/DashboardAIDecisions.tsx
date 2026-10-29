import React, { useState, useEffect } from 'react';
import {
  BookOpenCheck,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Sparkles,
  Info,
  Save,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { AIDecision } from '../types';
import { formatDateTime } from '../lib/utils';

export const DashboardAIDecisions: React.FC = () => {
  const [decisions, setDecisions] = useState<AIDecision[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterDecision, setFilterDecision] = useState<string>('all');

  const [formState, setFormState] = useState<Omit<AIDecision, 'id' | 'createdAt'>>({
    problem: '',
    promptSubmitted: '',
    aiOriginalSuggestion: '',
    decision: 'Modified',
    reason: '',
    finalImplementation: '',
    expectedImpact: '',
    validationMethod: '',
    isExample: false,
  });

  const loadDecisions = () => {
    setDecisions(Storage.getAIDecisions());
  };

  useEffect(() => {
    loadDecisions();
    window.addEventListener('nxt_storage_updated', loadDecisions);
    return () => window.removeEventListener('nxt_storage_updated', loadDecisions);
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({
      problem: '',
      promptSubmitted: '',
      aiOriginalSuggestion: '',
      decision: 'Modified',
      reason: '',
      finalImplementation: '',
      expectedImpact: '',
      validationMethod: '',
      isExample: false,
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (item: AIDecision) => {
    setEditingId(item.id);
    setFormState({
      problem: item.problem,
      promptSubmitted: item.promptSubmitted,
      aiOriginalSuggestion: item.aiOriginalSuggestion,
      decision: item.decision,
      reason: item.reason,
      finalImplementation: item.finalImplementation,
      expectedImpact: item.expectedImpact,
      validationMethod: item.validationMethod,
      isExample: item.isExample,
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this AI decision log entry?')) {
      Storage.deleteAIDecision(id);
      loadDecisions();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.problem.trim() || !formState.aiOriginalSuggestion.trim()) return;

    if (editingId) {
      Storage.updateAIDecision(editingId, formState);
    } else {
      Storage.addAIDecision(formState);
    }

    setShowAddModal(false);
    loadDecisions();
  };

  const filteredDecisions = decisions.filter((d) => {
    if (filterDecision === 'all') return true;
    return d.decision === filterDecision;
  });

  const decisionBadge = (status: AIDecision['decision']) => {
    if (status === 'Accepted') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-600/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Accepted</span>
        </span>
      );
    }
    if (status === 'Modified') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950/70 text-amber-300 border border-amber-600/40">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Modified</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-950/70 text-rose-300 border border-rose-600/40">
        <XCircle className="w-3.5 h-3.5" />
        <span>Rejected</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              AI Decisions & Learning Log
            </h1>
            <span className="text-xs bg-navy-800 text-brand-300 px-2 py-0.5 rounded border border-navy-700">
              {decisions.length} Critical Entries
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Documentation of human-in-the-loop critical judgment evaluating and rejecting AI advice.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Filter */}
          <select
            value={filterDecision}
            onChange={(e) => setFilterDecision(e.target.value)}
            className="px-3 py-2 rounded-xl bg-navy-900 border border-navy-700 text-xs text-white"
          >
            <option value="all">All Decisions</option>
            <option value="Accepted">Accepted</option>
            <option value="Modified">Modified</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log AI Decision</span>
          </button>
        </div>
      </div>

      {/* Illustrative Notice Banner (Section 11 Requirement) */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-brand-500/30 text-xs text-slate-300 flex items-start space-x-3">
        <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-white">
            Demonstrating Independent Marketer Judgement:
          </p>
          <p className="leading-relaxed text-slate-400">
            A key criterion of this assignment is showing that you did not passively accept every AI suggestion. Entries marked <span className="text-amber-300 font-mono text-[11px] bg-amber-950/60 px-1 py-0.5 rounded border border-amber-800/40">ILLUSTRATIVE EXAMPLE</span> illustrate realistic critical evaluations made regarding budget, form friction, and cash incentives. You can edit, replace, or add your own entries.
          </p>
        </div>
      </div>

      {/* Decisions Cards List */}
      <div className="space-y-6">
        {filteredDecisions.map((dec) => (
          <div
            key={dec.id}
            className="bg-navy-900/70 border border-navy-800 rounded-2xl p-6 shadow-xl space-y-5 transition-all hover:border-slate-700"
          >
            {/* Top row: Status, Title, Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-navy-800 pb-4">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  {decisionBadge(dec.decision)}
                  {dec.isExample && (
                    <span className="text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded">
                      Illustrative Example
                    </span>
                  )}
                  <span className="text-[11px] text-slate-500">
                    Logged {formatDateTime(dec.createdAt)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Problem: {dec.problem}
                </h3>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <button
                  onClick={() => handleOpenEdit(dec)}
                  className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-slate-300 text-xs flex items-center space-x-1"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(dec.id)}
                  className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-slate-300 text-xs hover:text-rose-400"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Prompt & AI Suggestion Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Prompt */}
              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800/90 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3 text-brand-400" />
                  <span>Prompt Submitted to AI</span>
                </span>
                <p className="text-slate-300 leading-relaxed italic">
                  "{dec.promptSubmitted}"
                </p>
              </div>

              {/* AI Original Suggestion */}
              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800/90 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI's Original Recommendation</span>
                </span>
                <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                  {dec.aiOriginalSuggestion}
                </p>
              </div>
            </div>

            {/* Human Evaluation & Reason */}
            <div className="bg-navy-950/60 p-4 rounded-xl border border-navy-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Human Growth Marketer Judgment & Rationale
              </span>
              <p className="text-slate-200 leading-relaxed">
                {dec.reason}
              </p>
            </div>

            {/* Final Implementation & Impact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-brand-400 block">
                  Final Implementation
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {dec.finalImplementation}
                </p>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400 block">
                  Expected Impact
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {dec.expectedImpact}
                </p>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-400 block">
                  Validation Method
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {dec.validationMethod}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-navy-900 border border-navy-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 my-8">
            <h3 className="text-base font-bold text-white">
              {editingId ? 'Edit AI Decision Record' : 'Record New AI Decision'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Problem / Growth Challenge *
                </label>
                <input
                  type="text"
                  required
                  value={formState.problem}
                  onChange={(e) => setFormState({ ...formState, problem: e.target.value })}
                  placeholder="e.g. Design student referral mechanics with zero cash budget"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Decision *
                  </label>
                  <select
                    value={formState.decision}
                    onChange={(e) =>
                      setFormState({ ...formState, decision: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white font-bold"
                  >
                    <option value="Modified">Modified</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 text-slate-300">
                    <input
                      type="checkbox"
                      checked={formState.isExample}
                      onChange={(e) => setFormState({ ...formState, isExample: e.target.checked })}
                      className="rounded border-slate-700 text-brand-600 bg-navy-950"
                    />
                    <span>Mark as illustrative example</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Prompt Submitted to AI
                </label>
                <textarea
                  rows={2}
                  value={formState.promptSubmitted}
                  onChange={(e) => setFormState({ ...formState, promptSubmitted: e.target.value })}
                  placeholder="The exact query or guidance requested from the model"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  AI's Original Recommendation *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formState.aiOriginalSuggestion}
                  onChange={(e) =>
                    setFormState({ ...formState, aiOriginalSuggestion: e.target.value })
                  }
                  placeholder="What the AI originally suggested"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Reason for Decision (Why Accepted / Modified / Rejected) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formState.reason}
                  onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
                  placeholder="Explain your critical judgment, budget constraints, or student psychographics"
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-navy-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Final Implementation
                  </label>
                  <textarea
                    rows={2}
                    value={formState.finalImplementation}
                    onChange={(e) =>
                      setFormState({ ...formState, finalImplementation: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Expected Impact
                  </label>
                  <textarea
                    rows={2}
                    value={formState.expectedImpact}
                    onChange={(e) =>
                      setFormState({ ...formState, expectedImpact: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Validation Method
                  </label>
                  <textarea
                    rows={2}
                    value={formState.validationMethod}
                    onChange={(e) =>
                      setFormState({ ...formState, validationMethod: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-navy-950 border border-navy-700 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-navy-800">
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
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
