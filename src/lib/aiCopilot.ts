import { Registration, DayPlan, BudgetItem, TargetModelRow, CampaignSettings } from '../types';

export interface CopilotInput {
  target: number;
  currentRegistrations: number;
  remainingDays: number;
  totalBudget: number;
  spentBudget: number;
  remainingBudget: number;
  channelBreakdown: Record<string, number>;
  referralAttributedCount: number;
  isDemoMode: boolean;
}

export interface CopilotAnalysisResult {
  diagnosis: string;
  mostPromisingNextAction: string;
  recommendedExperiment: {
    name: string;
    hypothesis: string;
    execution: string;
    estimatedCost: string;
  };
  metricToMonitor: {
    primaryMetric: string;
    targetThreshold: string;
    whyItMatters: string;
  };
  assumptionsAndUncertainties: string[];
  growthVelocity: {
    requiredDailyRunRate: number;
    currentDailyPace: number;
    trajectoryStatus: 'On Track' | 'Moderate Risk' | 'High Risk' | 'Target Achieved';
  };
}

export function generateCampaignDiagnosis(input: CopilotInput): CopilotAnalysisResult {
  const {
    target,
    currentRegistrations,
    remainingDays,
    remainingBudget,
    channelBreakdown,
    referralAttributedCount,
    isDemoMode,
  } = input;

  const gap = Math.max(0, target - currentRegistrations);
  const days = Math.max(1, remainingDays);
  const requiredRunRate = Math.ceil(gap / days);
  const currentDailyPace = Math.round(currentRegistrations / Math.max(1, 7 - remainingDays));

  // Determine top contributing channel
  let topChannel = 'whatsapp_groups';
  let topCount = 0;
  Object.entries(channelBreakdown).forEach(([ch, count]) => {
    if (count > topCount) {
      topCount = count;
      topChannel = ch;
    }
  });

  const referralSharePercent = currentRegistrations > 0
    ? Math.round((referralAttributedCount / currentRegistrations) * 100)
    : 0;

  // Determine trajectory
  let trajectory: CopilotAnalysisResult['growthVelocity']['trajectoryStatus'] = 'Moderate Risk';
  if (gap === 0) {
    trajectory = 'Target Achieved';
  } else if (currentDailyPace >= requiredRunRate) {
    trajectory = 'On Track';
  } else if (currentDailyPace < requiredRunRate * 0.5) {
    trajectory = 'High Risk';
  }

  // Construct Diagnosis
  let diagnosis = '';
  if (currentRegistrations === 0) {
    diagnosis = `Campaign is at Day 0 with 0 valid registrations. To hit ${target} in ${days} days, you require an average velocity of ${requiredRunRate} registrations/day. The total budget is ₹${input.totalBudget}. Reliance on organic authorized college communities and CR network is critical because budget cannot sustain paid acquisition at scale.`;
  } else if (trajectory === 'Target Achieved') {
    diagnosis = `Target surpassed! Total registrations stand at ${currentRegistrations}/${target}. Top channel is "${topChannel.replace('_', ' ')}" generating ${topCount} registrations. Referral loop contributed ${referralSharePercent}% (${referralAttributedCount} students). Shift focus to attendee reminder sequence and show-up rate optimization.`;
  } else if (trajectory === 'On Track') {
    diagnosis = `Healthy growth velocity: averaging ~${currentDailyPace} regs/day against a required run-rate of ${requiredRunRate} regs/day. "${topChannel.replace('_', ' ')}" is the primary growth driver with ${topCount} signups. Referral sharing accounts for ${referralSharePercent}% of registrations.`;
  } else {
    diagnosis = `Velocity bottleneck: Currently pacing at ~${currentDailyPace} regs/day, but you need ${requiredRunRate} regs/day to close the remaining gap of ${gap} registrations over ${days} days. Remaining unspent budget is ₹${remainingBudget}. Immediate distribution escalation through high-density campus channels is essential.`;
  }

  // Most Promising Next Action
  let nextAction = '';
  if (topChannel === 'whatsapp_groups' || topCount > 30) {
    nextAction = `Expand WhatsApp Class Representative (CR) reach into 12 additional engineering colleges in Bengaluru, Hyderabad, and Pune. Provide CRs with Template B (College Group) and follow up with a brief 1-minute audio note to community leads.`;
  } else if (referralSharePercent < 15) {
    nextAction = `Activate the student referral loop: Trigger a voluntary WhatsApp prompt to existing ${currentRegistrations} registrants highlighting the privacy-conscious peer leaderboard and inviting their final-year capstone project partners.`;
  } else {
    nextAction = `Mobilize coding club student leads (GDSC, CSI, ACM) with a targeted 3-bullet workshop overview tailored for 8th-semester final project preparation.`;
  }

  // Recommended Experiment
  const recommendedExperiment = {
    name: 'Peer Project Team Referral Multiplier',
    hypothesis:
      'Because final-year engineering students work in teams of 3 to 4 on their capstone projects, prompting registrants to invite their specific capstone group members via Template A will lift referral conversion by 35% compared to generic group broadcasts.',
    execution:
      'Add a dedicated "Invite Your Final-Year Project Group" prompt on the post-registration success page and test in 5 college communities.',
    estimatedCost: '₹0 (100% Organic peer loop)',
  };

  // Metric to Monitor
  const metricToMonitor = {
    primaryMetric: 'Referral Attributed Registrations / Total Registrations (Viral Ratio)',
    targetThreshold: '≥ 25% of all daily signups attributed to peer referral codes',
    whyItMatters:
      'With a strict ₹2,000 budget cap (₹4/target registration), organic peer loops are mathematically mandatory to scale from 200 to 500 without paid ad reliance.',
  };

  // Assumptions & Uncertainties
  const assumptionsAndUncertainties = [
    isDemoMode
      ? 'DEMO DATA WARNING: Analysis is running on the baseline simulated dataset (206 demo registrations). Do not present these figures as real-world results.'
      : 'LIVE DATA: Analysis is operating on actual local registrations recorded in this browser session.',
    'Assumes college WhatsApp group admins approve community broadcasts without treating them as uninvited spam.',
    'Assumes final-year students have active campus internet access and are seeking beginner-level AI project experience for job interviews.',
    `Budget limit of ₹${input.totalBudget} assumes ₹0 paid CAC for at least 80% of registrations. A sudden drop in organic reach cannot be offset with paid ads on this budget.`,
  ];

  return {
    diagnosis,
    mostPromisingNextAction: nextAction,
    recommendedExperiment,
    metricToMonitor,
    assumptionsAndUncertainties,
    growthVelocity: {
      requiredDailyRunRate: requiredRunRate,
      currentDailyPace: currentDailyPace,
      trajectoryStatus: trajectory,
    },
  };
}
