import {
  Registration,
  DayPlan,
  BudgetItem,
  TargetModelRow,
  AIDecision,
  CampaignSettings,
  LeaderboardEntry,
} from '../types';
import {
  initialCampaignSettings,
  initialSevenDayPlan,
  initialBudget,
  initialTargetModel,
  initialAIDecisions,
  generateSimulatedRegistrations,
} from './initialData';
import { generateReferralCode } from './utils';

const STORAGE_KEYS = {
  SETTINGS: 'nxt_growth_settings_v1',
  LIVE_REGISTRATIONS: 'nxt_growth_live_regs_v1',
  SIM_REGISTRATIONS: 'nxt_growth_sim_regs_v1',
  PLANNER: 'nxt_growth_planner_v1',
  BUDGET: 'nxt_growth_budget_v1',
  TARGET_MODEL: 'nxt_growth_target_model_v1',
  AI_DECISIONS: 'nxt_growth_ai_decisions_v1',
  CURRENT_USER_REF: 'nxt_growth_last_registered_ref',
};

// Safe JSON parser
function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed to read ${key} from storage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event so reactive components across tabs/pages know state changed
    window.dispatchEvent(new Event('nxt_storage_updated'));
  } catch (err) {
    console.error(`Failed to write ${key} to storage:`, err);
  }
}

export const Storage = {
  getSettings(): CampaignSettings {
    return safeGet<CampaignSettings>(STORAGE_KEYS.SETTINGS, initialCampaignSettings);
  },

  updateSettings(updates: Partial<CampaignSettings>): CampaignSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    safeSet(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  toggleDemoMode(isDemo: boolean): void {
    this.updateSettings({ isDemoMode: isDemo });
  },

  // Get active registrations depending on demo mode
  getRegistrations(): Registration[] {
    const settings = this.getSettings();
    if (settings.isDemoMode) {
      let sim = safeGet<Registration[]>(STORAGE_KEYS.SIM_REGISTRATIONS, []);
      if (!sim || sim.length === 0) {
        sim = generateSimulatedRegistrations();
        safeSet(STORAGE_KEYS.SIM_REGISTRATIONS, sim);
      }
      return sim;
    }
    return safeGet<Registration[]>(STORAGE_KEYS.LIVE_REGISTRATIONS, []);
  },

  getLiveRegistrations(): Registration[] {
    return safeGet<Registration[]>(STORAGE_KEYS.LIVE_REGISTRATIONS, []);
  },

  getSimulatedRegistrations(): Registration[] {
    let sim = safeGet<Registration[]>(STORAGE_KEYS.SIM_REGISTRATIONS, []);
    if (!sim || sim.length === 0) {
      sim = generateSimulatedRegistrations();
      safeSet(STORAGE_KEYS.SIM_REGISTRATIONS, sim);
    }
    return sim;
  },

  // Save new registration with deduplication, self-referral guard, and unique code generation
  createRegistration(input: {
    fullName: string;
    email: string;
    collegeName: string;
    branch: string;
    graduationYear: number;
    whatsappNumber?: string;
    whatsappConsent: boolean;
    referredByCode?: string;
    acquisitionSource?: Registration['acquisitionSource'];
    utmCampaign?: string;
    utmMedium?: string;
  }): { success: boolean; error?: string; registration?: Registration } {
    const normalizedEmail = input.email.trim().toLowerCase();
    const settings = this.getSettings();
    const currentList = settings.isDemoMode
      ? this.getSimulatedRegistrations()
      : this.getLiveRegistrations();

    // 1. Prevent duplicate email registrations
    const existing = currentList.find(
      (r) => r.email.trim().toLowerCase() === normalizedEmail
    );
    if (existing) {
      return {
        success: false,
        error: `A registration with email "${normalizedEmail}" already exists. Each student can register only once.`,
      };
    }

    // 2. Generate a unique referral code for the registrant
    let newRefCode = generateReferralCode();
    let collisionCheck = currentList.some((r) => r.referralCode === newRefCode);
    while (collisionCheck) {
      newRefCode = generateReferralCode();
      collisionCheck = currentList.some((r) => r.referralCode === newRefCode);
    }

    // 3. Referral code validation and self-referral rejection
    let validReferredBy: string | undefined = undefined;
    const cleanRefInput = input.referredByCode?.trim().toUpperCase();

    if (cleanRefInput) {
      if (cleanRefInput === newRefCode) {
        return {
          success: false,
          error: 'Self-referral is not permitted. Please remove your own referral code.',
        };
      }

      // Check if referrer code exists in the active dataset
      const referrerRecord = currentList.find((r) => r.referralCode === cleanRefInput);
      if (referrerRecord) {
        // Disallow self-referral by same email
        if (referrerRecord.email.trim().toLowerCase() === normalizedEmail) {
          return {
            success: false,
            error: 'Self-referral detected. You cannot use a referral code created under your email.',
          };
        }
        validReferredBy = cleanRefInput;
      } else {
        // If the referral code is invalid, we don't reject the whole registration,
        // but we don't attribute it to a ghost code.
        validReferredBy = undefined;
      }
    }

    // 4. Construct record
    const newRecord: Registration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      fullName: input.fullName.trim(),
      email: normalizedEmail,
      collegeName: input.collegeName.trim(),
      branch: input.branch,
      graduationYear: input.graduationYear,
      whatsappNumber: input.whatsappNumber?.trim() || undefined,
      whatsappConsent: input.whatsappConsent,
      referralCode: newRefCode,
      referredByCode: validReferredBy,
      acquisitionSource: validReferredBy
        ? 'direct_referral'
        : input.acquisitionSource || 'whatsapp_groups',
      utmCampaign: input.utmCampaign || 'build-ai-60m',
      utmMedium: input.utmMedium || 'web',
      createdAt: new Date().toISOString(),
      isSimulated: settings.isDemoMode,
    };

    // 5. Append and persist
    if (settings.isDemoMode) {
      const updatedSim = [newRecord, ...currentList];
      safeSet(STORAGE_KEYS.SIM_REGISTRATIONS, updatedSim);
    } else {
      const updatedLive = [newRecord, ...currentList];
      safeSet(STORAGE_KEYS.LIVE_REGISTRATIONS, updatedLive);
    }

    // Cache last registered ref code for the success page
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_REF, newRefCode);

    return {
      success: true,
      registration: newRecord,
    };
  },

  // Referral metrics for a specific code
  getReferralCount(referralCode: string): number {
    if (!referralCode) return 0;
    const regs = this.getRegistrations();
    const clean = referralCode.trim().toUpperCase();
    return regs.filter((r) => r.referredByCode?.trim().toUpperCase() === clean).length;
  },

  getReferralAttributedStudents(referralCode: string): Registration[] {
    if (!referralCode) return [];
    const regs = this.getRegistrations();
    const clean = referralCode.trim().toUpperCase();
    return regs.filter((r) => r.referredByCode?.trim().toUpperCase() === clean);
  },

  // Get privacy-conscious referral leaderboard (no phone/email exposed)
  getLeaderboard(limit = 10): LeaderboardEntry[] {
    const regs = this.getRegistrations();
    const countsMap = new Map<string, number>();

    regs.forEach((r) => {
      if (r.referredByCode) {
        const ref = r.referredByCode.trim().toUpperCase();
        countsMap.set(ref, (countsMap.get(ref) || 0) + 1);
      }
    });

    const entries: LeaderboardEntry[] = [];
    countsMap.forEach((count, code) => {
      const owner = regs.find((r) => r.referralCode === code);
      if (owner) {
        // Obfuscate student name to protect privacy: e.g. "Aarav S."
        const parts = owner.fullName.split(' ');
        const initial = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : owner.fullName;
        entries.push({
          referralCode: code,
          studentInitials: initial,
          collegeName: owner.collegeName,
          branch: owner.branch,
          referralCount: count,
          rank: 0,
        });
      }
    });

    entries.sort((a, b) => b.referralCount - a.referralCount);

    return entries.slice(0, limit).map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));
  },

  // Planner
  getPlanner(): DayPlan[] {
    return safeGet<DayPlan[]>(STORAGE_KEYS.PLANNER, initialSevenDayPlan);
  },

  updatePlannerDay(dayNumber: number, updates: Partial<DayPlan>): void {
    const planner = this.getPlanner();
    const updated = planner.map((p) => (p.day === dayNumber ? { ...p, ...updates } : p));
    safeSet(STORAGE_KEYS.PLANNER, updated);
  },

  // Budget
  getBudget(): BudgetItem[] {
    return safeGet<BudgetItem[]>(STORAGE_KEYS.BUDGET, initialBudget);
  },

  updateBudgetItem(id: string, updates: Partial<BudgetItem>): void {
    const budget = this.getBudget();
    const updated = budget.map((b) => (b.id === id ? { ...b, ...updates } : b));
    safeSet(STORAGE_KEYS.BUDGET, updated);
  },

  addBudgetItem(item: Omit<BudgetItem, 'id'>): BudgetItem {
    const budget = this.getBudget();
    const newItem: BudgetItem = {
      ...item,
      id: `budget-${Date.now()}`,
    };
    safeSet(STORAGE_KEYS.BUDGET, [...budget, newItem]);
    return newItem;
  },

  deleteBudgetItem(id: string): void {
    const budget = this.getBudget();
    safeSet(STORAGE_KEYS.BUDGET, budget.filter((b) => b.id !== id));
  },

  // Target Model
  getTargetModel(): TargetModelRow[] {
    return safeGet<TargetModelRow[]>(STORAGE_KEYS.TARGET_MODEL, initialTargetModel);
  },

  updateTargetModelRow(channelId: string, updates: Partial<TargetModelRow>): void {
    const model = this.getTargetModel();
    const updated = model.map((m) => (m.channelId === channelId ? { ...m, ...updates } : m));
    safeSet(STORAGE_KEYS.TARGET_MODEL, updated);
  },

  // AI Decisions Log
  getAIDecisions(): AIDecision[] {
    return safeGet<AIDecision[]>(STORAGE_KEYS.AI_DECISIONS, initialAIDecisions);
  },

  addAIDecision(decision: Omit<AIDecision, 'id' | 'createdAt'>): AIDecision {
    const list = this.getAIDecisions();
    const newItem: AIDecision = {
      ...decision,
      id: `ai-dec-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    safeSet(STORAGE_KEYS.AI_DECISIONS, [newItem, ...list]);
    return newItem;
  },

  updateAIDecision(id: string, updates: Partial<AIDecision>): void {
    const list = this.getAIDecisions();
    const updated = list.map((d) => (d.id === id ? { ...d, ...updates } : d));
    safeSet(STORAGE_KEYS.AI_DECISIONS, updated);
  },

  deleteAIDecision(id: string): void {
    const list = this.getAIDecisions();
    safeSet(STORAGE_KEYS.AI_DECISIONS, list.filter((d) => d.id !== id));
  },

  // Reset helpers
  resetToInitial(): void {
    safeSet(STORAGE_KEYS.SETTINGS, initialCampaignSettings);
    safeSet(STORAGE_KEYS.SIM_REGISTRATIONS, generateSimulatedRegistrations());
    safeSet(STORAGE_KEYS.PLANNER, initialSevenDayPlan);
    safeSet(STORAGE_KEYS.BUDGET, initialBudget);
    safeSet(STORAGE_KEYS.TARGET_MODEL, initialTargetModel);
    safeSet(STORAGE_KEYS.AI_DECISIONS, initialAIDecisions);
    window.dispatchEvent(new Event('nxt_storage_updated'));
  },

  clearLiveRegistrations(): void {
    safeSet(STORAGE_KEYS.LIVE_REGISTRATIONS, []);
    window.dispatchEvent(new Event('nxt_storage_updated'));
  },

  exportRegistrationsToCSV(): string {
    const regs = this.getRegistrations();
    if (regs.length === 0) return '';

    const headers = [
      'Registration ID',
      'Full Name',
      'Email',
      'College',
      'Branch',
      'Graduation Year',
      'WhatsApp Number',
      'Referral Code',
      'Referred By Code',
      'Acquisition Source',
      'Registration Timestamp',
      'Simulated Record',
    ];

    const rows = regs.map((r) => [
      `"${r.id}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.collegeName.replace(/"/g, '""')}"`,
      `"${r.branch}"`,
      r.graduationYear,
      `"${r.whatsappNumber || 'N/A'}"`,
      `"${r.referralCode}"`,
      `"${r.referredByCode || 'None'}"`,
      `"${r.acquisitionSource}"`,
      `"${r.createdAt}"`,
      r.isSimulated ? 'YES' : 'NO',
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  },
};
