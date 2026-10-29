import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Download,
  Filter,
  Users,
  Tag,
  Calendar,
  Building,
  CheckCircle2,
  Share2,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { Registration } from '../types';
import { formatDateTime } from '../lib/utils';

export const DashboardRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  const loadData = () => {
    const s = Storage.getSettings();
    setIsDemoMode(s.isDemoMode);
    setRegistrations(Storage.getRegistrations());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('nxt_storage_updated', loadData);
    return () => window.removeEventListener('nxt_storage_updated', loadData);
  }, []);

  // Compute referral counts map
  const referralCountsMap = useMemo(() => {
    const map = new Map<string, number>();
    registrations.forEach((r) => {
      if (r.referredByCode) {
        const code = r.referredByCode.trim().toUpperCase();
        map.set(code, (map.get(code) || 0) + 1);
      }
    });
    return map;
  }, [registrations]);

  // Filtered registrations
  const filteredList = useMemo(() => {
    return registrations.filter((r) => {
      const matchQuery =
        r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.referredByCode && r.referredByCode.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchBranch = selectedBranch === 'all' || r.branch.includes(selectedBranch);
      const matchChannel = selectedChannel === 'all' || r.acquisitionSource === selectedChannel;

      return matchQuery && matchBranch && matchChannel;
    });
  }, [registrations, searchQuery, selectedBranch, selectedChannel]);

  const handleExportCSV = () => {
    const csvContent = Storage.exportRegistrationsToCSV();
    if (!csvContent) {
      alert('No registrations available to export.');
      return;
    }
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `nxtwave_ai_workshop_registrations_${isDemoMode ? 'demo' : 'live'}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const branches = [
    'CSE',
    'IT',
    'AI/ML',
    'Data Science',
    'ECE',
    'EEE',
  ];

  return (
    <div className="space-y-6">
      {/* Title & CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Registration Management
            </h1>
            <span className="text-xs font-mono bg-navy-800 text-brand-300 px-2 py-0.5 rounded border border-navy-700">
              {filteredList.length} of {registrations.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Searchable, deduplicated student registry with referral attribution and channel tagging.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center space-x-2 bg-navy-900 hover:bg-navy-800 border border-navy-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-brand-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, college, email, or referral code..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Branch Filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Branches</option>
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Channel Filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-navy-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Sources</option>
            <option value="whatsapp_groups">WhatsApp Groups</option>
            <option value="coding_clubs">Coding Clubs</option>
            <option value="class_reps">Class Reps / Amb.</option>
            <option value="direct_referral">Peer Referrals</option>
            <option value="email_outreach">Email Outreach</option>
            <option value="linkedin_communities">LinkedIn</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-navy-900/70 border border-navy-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-navy-800 bg-navy-950/80 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">College & Branch</th>
                <th className="py-3 px-4">Source Channel</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">Referred By</th>
                <th className="py-3 px-4 text-center">Referrals Made</th>
                <th className="py-3 px-4">Registered At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p className="font-semibold text-white">No registrations match your search</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Try adjusting the search query or reset filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredList.slice(0, 100).map((r) => {
                  const myReferralCount = referralCountsMap.get(r.referralCode) || 0;
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-navy-800/40 transition-colors"
                    >
                      {/* Student */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {r.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {r.email}
                        </div>
                        {r.isSimulated && (
                          <span className="text-[9px] text-amber-400/80 uppercase font-mono">
                            simulated
                          </span>
                        )}
                      </td>

                      {/* College & Branch */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="text-slate-200 truncate font-medium" title={r.collegeName}>
                          {r.collegeName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {r.branch.split('(')[1]?.replace(')', '') || r.branch} • Batch {r.graduationYear}
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-navy-950 text-slate-300 border border-slate-700/60 capitalize">
                          {r.acquisitionSource.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Referral Code */}
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-400">
                        {r.referralCode}
                      </td>

                      {/* Referred By */}
                      <td className="py-3.5 px-4">
                        {r.referredByCode ? (
                          <span className="font-mono text-emerald-400 font-semibold text-[11px] bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-800/30">
                            {r.referredByCode}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Direct</span>
                        )}
                      </td>

                      {/* Referrals Made */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                          myReferralCount > 0
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                            : 'bg-navy-950 text-slate-500'
                        }`}>
                          {myReferralCount}
                        </span>
                      </td>

                      {/* Registered At */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {formatDateTime(r.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filteredList.length > 100 && (
          <div className="p-3 bg-navy-950 text-center text-xs text-slate-400 border-t border-navy-800">
            Showing first 100 of {filteredList.length} records. Export full CSV for complete raw records.
          </div>
        )}
      </div>
    </div>
  );
};
