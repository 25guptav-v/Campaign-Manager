export type AcquisitionChannelId =
  | 'whatsapp_groups'
  | 'coding_clubs'
  | 'class_reps'
  | 'email_outreach'
  | 'linkedin_communities'
  | 'direct_referral'
  | 'other';

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  branch: string;
  graduationYear: number;
  whatsappNumber?: string;
  whatsappConsent: boolean;
  referralCode: string;
  referredByCode?: string;
  acquisitionSource: AcquisitionChannelId;
  utmCampaign?: string;
  utmMedium?: string;
  createdAt: string;
  isSimulated?: boolean;
}

export interface DayPlan {
  day: number;
  phase: string;
  title: string;
  plannedActivities: string[];
  owner: string;
  status: 'Completed' | 'In Progress' | 'Planned' | 'Blocked';
  budgetAllocated: number;
  actualSpend: number;
  targetRegistrations: number;
  actualRegistrations: number;
  nextAction: string;
  isSimulatedSchedule?: boolean;
}

export interface BudgetItem {
  id: string;
  category: string;
  allocated: number;
  actualSpend: number;
  description: string;
  isPaidPromotion: boolean;
  validationStatus: 'Planned' | 'Testing' | 'Committed' | 'On Hold';
  notes: string;
}

export interface TargetModelRow {
  channelId: AcquisitionChannelId;
  channelName: string;
  plannedTarget: number;
  communitiesReached: number;
  estimatedReach: number;
  conversionRatePercent: number; // e.g., 2.5 means 2.5%
  confidenceLevel: 'High' | 'Medium' | 'Low';
  costAllocated: number;
  notes: string;
}

export interface AIDecision {
  id: string;
  problem: string;
  promptSubmitted: string;
  aiOriginalSuggestion: string;
  decision: 'Accepted' | 'Modified' | 'Rejected';
  reason: string;
  finalImplementation: string;
  expectedImpact: string;
  validationMethod: string;
  isExample: boolean;
  createdAt: string;
}

export interface CampaignSettings {
  workshopTitle: string;
  workshopPrice: string;
  workshopDurationMinutes: number;
  registrationTarget: number;
  totalBudget: number;
  workshopSchedule: string; // "Workshop schedule to be announced" or specific date
  targetAudience: string;
  deployedDomain: string;
  isDemoMode: boolean; // whether to show simulated data or real clean data
  supabaseEnabled: boolean;
}

export interface LeaderboardEntry {
  referralCode: string;
  studentInitials: string;
  collegeName: string;
  branch: string;
  referralCount: number;
  rank: number;
}
