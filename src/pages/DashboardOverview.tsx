import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Target,
  TrendingUp,
  Percent,
  Wallet,
  Share2,
  Calendar,
  AlertCircle,
  Filter,
  ArrowUpRight,
  Database,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Storage } from '../lib/storage';
import { Registration, AcquisitionChannelId, BudgetItem } from '../types';
import { formatCurrencyINR, formatDateShort } from '../lib/utils';

export const DashboardOverview: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [dateFilter, setDateFilter] = useState<'all' | 'last3' | 'today'>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');

  const loadData = () => {
    const s = Storage.getSettings();
    setIsDemoMode(s.isDemoMode);
    setRegistrations(Storage.getRegistrations());
    setBudgetItems(Storage.getBudget());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('nxt_storage_updated', loadData);
    return () => window.removeEventListener('nxt_storage_updated', loadData);
  }, []);

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    let list = [...registrations];

    if (channelFilter !== 'all') {
      list = list.filter((r) => r.acquisitionSource === channelFilter);
    }

    if (dateFilter === 'last3') {
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
      list = list.filter((r) => new Date(r.createdAt).getTime() >= threeDaysAgo);
    } else if (dateFilter === 'today') {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      list = list.filter((r) => new Date(r.createdAt).getTime() >= todayStart.getTime());
    }

    return list;
  }, [registrations, channelFilter, dateFilter]);

  // KPI Calculations
  const target = 500;
  const validRegistrations = filteredRegistrations.length;
  const targetAchievement = ((validRegistrations / target) * 100).toFixed(1);
  const registrationsRemaining = Math.max(target - validRegistrations, 0);

  // Referral attributed count
  const referralAttributed = filteredRegistrations.filter((r) => !!r.referredByCode).length;
  const referralPercent = validRegistrations > 0
    ? ((referralAttributed / validRegistrations) * 100).toFixed(1)
    : '0.0';

  // Budget calculations
  const totalActualSpend = budgetItems.reduce((acc, curr) => acc + curr.actualSpend, 0);
  const costPerRegistration = validRegistrations > 0
    ? (totalActualSpend / validRegistrations).toFixed(2)
    : 'N/A';

  // Elapsed days calculation
  const elapsedDays = 4; // simulated day 4
  const registrationsPerDay = (validRegistrations / elapsedDays).toFixed(1);

  // Conversion rate (estimated baseline reach across targeted student touchpoints ~5,200)
  const estimatedReachDenominator = 5200;
  const conversionRate = ((validRegistrations / estimatedReachDenominator) * 100).toFixed(2);

  // Channel breakdown data for Bar Chart
  const channelData = useMemo(() => {
    const channelNames: Record<AcquisitionChannelId | string, string> = {
      whatsapp_groups: 'WhatsApp Groups',
      coding_clubs: 'Coding Clubs',
      class_reps: 'Class Reps / Amb.',
      direct_referral: 'Peer Referrals',
      email_outreach: 'Email Outreach',
      linkedin_communities: 'LinkedIn / Social',
      other: 'Other',
    };

    const counts: Record<string, number> = {};
    filteredRegistrations.forEach((r) => {
      const src = r.acquisitionSource || 'whatsapp_groups';
      counts[src] = (counts[src] || 0) + 1;
    });

    return Object.entries(counts).map(([key, count]) => ({
      channelKey: key,
      channel: channelNames[key] || key,
      registrations: count,
    }));
  }, [filteredRegistrations]);

  // Daily Trend Data for Area Chart
  const dailyTrendData = useMemo(() => {
    const dayMap: Record<string, number> = {};

    filteredRegistrations.forEach((r) => {
      const dayLabel = formatDateShort(r.createdAt);
      dayMap[dayLabel] = (dayMap[dayLabel] || 0) + 1;
    });

    return Object.entries(dayMap).map(([date, count]) => ({
      date,
      registrations: count,
      targetPace: Math.round(target / 7), // 71/day
    }));
  }, [filteredRegistrations, target]);

  // Referral vs Non-referral Pie Data
  const pieData = [
    { name: 'Direct Channel Signups', value: Math.max(0, validRegistrations - referralAttributed), color: '#3b82f6' },
    { name: 'Peer Referral Attributed', value: referralAttributed, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Campaign Manager Dashboard
            </h1>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
              isDemoMode
                ? 'bg-amber-950/70 text-amber-300 border border-amber-800/40'
                : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/40'
            }`}>
              {isDemoMode ? 'Demo Data' : 'Live Data'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time funnel performance, referral loops, and unit economics tracking.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Channel Filter */}
          <div className="flex items-center space-x-1 bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="bg-transparent border-none text-white text-xs focus:outline-none"
            >
              <option value="all" className="bg-navy-900">All Channels</option>
              <option value="whatsapp_groups" className="bg-navy-900">WhatsApp Groups</option>
              <option value="coding_clubs" className="bg-navy-900">Coding Clubs</option>
              <option value="class_reps" className="bg-navy-900">Class Reps & Amb.</option>
              <option value="direct_referral" className="bg-navy-900">Peer Referrals</option>
              <option value="email_outreach" className="bg-navy-900">Email Outreach</option>
              <option value="linkedin_communities" className="bg-navy-900">LinkedIn</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-1 bg-navy-900 border border-navy-800 rounded-lg px-2.5 py-1 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="bg-transparent border-none text-white text-xs focus:outline-none"
            >
              <option value="all" className="bg-navy-900">All 7 Days</option>
              <option value="last3" className="bg-navy-900">Last 3 Days</option>
              <option value="today" className="bg-navy-900">Today</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (Section 6) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Valid Registrations */}
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4.5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Valid Registrations</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {validRegistrations}
            </span>
            <span className="text-xs text-slate-400">/ {target} target</span>
          </div>
          <div className="w-full bg-navy-950 h-1.5 rounded-full overflow-hidden mt-2">
            <div
              className="bg-brand-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, parseFloat(targetAchievement))}%` }}
            />
          </div>
        </div>

        {/* Card 2: Target Achievement */}
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4.5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Target Progress</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {targetAchievement}%
            </span>
            <span className="text-xs text-amber-400">
              {registrationsRemaining} needed
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Formula: {validRegistrations} / {target} × 100
          </p>
        </div>

        {/* Card 3: Referral Contribution */}
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4.5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Referral Attributed</span>
            <Share2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">
              {referralAttributed}
            </span>
            <span className="text-xs text-emerald-300 font-medium">
              ({referralPercent}% of total)
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Organic viral multiplier from students
          </p>
        </div>

        {/* Card 4: Cost per Registration */}
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-4.5 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Cost Per Registration</span>
            <Wallet className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-white font-mono">
              {costPerRegistration === 'N/A' ? '—' : `₹${costPerRegistration}`}
            </span>
            <span className="text-xs text-slate-400">
              (Spent: {formatCurrencyINR(totalActualSpend)})
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Budget ceiling: ₹2,000 max
          </p>
        </div>
      </div>

      {/* Secondary KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-navy-900/50 border border-navy-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Current Velocity</span>
            <p className="text-base font-bold text-white mt-0.5">
              ~{registrationsPerDay} regs / day
            </p>
          </div>
          <span className="text-[11px] text-brand-300 bg-brand-950/60 px-2 py-1 rounded border border-brand-500/20">
            Need ~{Math.ceil(registrationsRemaining / 3)}/day next 3 days
          </span>
        </div>

        <div className="bg-navy-900/50 border border-navy-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Estimated Reach Conversion</span>
            <p className="text-base font-bold text-white mt-0.5">
              {conversionRate}%
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            Denom: ~{estimatedReachDenominator.toLocaleString()} student reach
          </span>
        </div>

        <div className="bg-navy-900/50 border border-navy-800 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">AI Growth Copilot Status</span>
            <p className="text-base font-bold text-brand-400 mt-0.5 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnostic Ready</span>
            </p>
          </div>
          <Link
            to="/dashboard/copilot"
            className="text-[11px] font-semibold text-brand-400 hover:text-brand-300"
          >
            Run Diagnosis →
          </Link>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Registration Trend (2 cols) */}
        <div className="lg:col-span-2 bg-navy-900/70 border border-navy-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Daily Registration Velocity</h2>
              <p className="text-[11px] text-slate-400">Daily signups vs planned target run-rate</p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-navy-950 px-2 py-1 rounded">
              7-Day Sprint
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1120',
                    borderColor: '#1E293B',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="registrations"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#regGradient)"
                  name="Daily Registrations"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Referral Contribution Pie Chart (1 col) */}
        <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Referral vs Direct Split</h2>
            <p className="text-[11px] text-slate-400">Contribution of peer-to-peer referral viral loop</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
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

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Direct / Channel:</span>
              </span>
              <span className="font-mono font-bold text-white">
                {validRegistrations - referralAttributed} ({(100 - parseFloat(referralPercent)).toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center justify-between text-emerald-300">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Peer Referral:</span>
              </span>
              <span className="font-mono font-bold">
                {referralAttributed} ({referralPercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Registrations by Channel Bar Chart */}
      <div className="bg-navy-900/70 border border-navy-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Registrations by Acquisition Channel</h2>
            <p className="text-[11px] text-slate-400">Breakdown across student acquisition sources</p>
          </div>
          <Link
            to="/dashboard/channels"
            className="text-xs text-brand-400 hover:text-brand-300 font-medium"
          >
            Detailed Channel Modeling →
          </Link>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="channel" stroke="#64748b" fontSize={11} interval={0} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B1120',
                  borderColor: '#1E293B',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Registrations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
