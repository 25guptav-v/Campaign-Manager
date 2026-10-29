import {
  Registration,
  DayPlan,
  BudgetItem,
  TargetModelRow,
  AIDecision,
  CampaignSettings,
} from '../types';

export const initialCampaignSettings: CampaignSettings = {
  workshopTitle: 'Build Your First AI Project in 60 Minutes',
  workshopPrice: 'Free',
  workshopDurationMinutes: 60,
  registrationTarget: 500,
  totalBudget: 2000,
  workshopSchedule: 'Workshop schedule to be announced',
  targetAudience: 'Final-year B.Tech / B.E. Engineering Students in India',
  deployedDomain: typeof window !== 'undefined' ? window.location.origin : 'https://nxtwave-ai-growth.netlify.app',
  isDemoMode: true, // Default to demo mode for presentation showcase; toggleable to live clean data
  supabaseEnabled: false,
};

// 7-Day Growth Plan (from Section 7)
export const initialSevenDayPlan: DayPlan[] = [
  {
    day: 1,
    phase: 'Preparation and Launch',
    title: 'Landing Page & Foundation Testing',
    plannedActivities: [
      'Finalize conversion-optimized landing page & mobile UX',
      'End-to-end test registration, referral loop, and attribution logic',
      'Draft 3 tailored WhatsApp templates and email outreach copy',
      'Map first batch of 25 college coding clubs and 30 class representatives',
      'Begin initial outreach to student community admins',
    ],
    owner: 'Growth Lead',
    status: 'Completed',
    budgetAllocated: 150,
    actualSpend: 120,
    targetRegistrations: 35,
    actualRegistrations: 42,
    nextAction: 'Monitor early WhatsApp click-throughs and attribution verification',
    isSimulatedSchedule: true,
  },
  {
    day: 2,
    phase: 'College Distribution',
    title: 'Community Distribution & CR Outreach',
    plannedActivities: [
      'Share workshop with authorized college WhatsApp group admins',
      'Contact technical clubs (GDSC, CSI, ACM student chapters)',
      'Distribute Template B via approved Class Representatives (CRs)',
      'Monitor group feedback and registration conversion velocities',
    ],
    owner: 'Community Marketer',
    status: 'Completed',
    budgetAllocated: 150,
    actualSpend: 150,
    targetRegistrations: 65,
    actualRegistrations: 71,
    nextAction: 'Follow up with unresponsive club leads with brief 1-pager',
    isSimulatedSchedule: true,
  },
  {
    day: 3,
    phase: 'Ambassador Activation',
    title: 'Student Ambassador Volunteer Onboarding',
    plannedActivities: [
      'Onboard 15 active volunteer student ambassadors across tier-1 & tier-2 colleges',
      'Issue unique attribution tracking links & referral codes to each ambassador',
      'Deliver copy-paste WhatsApp kits and status update guidelines',
      'Track real-time attributed registrations per ambassador',
    ],
    owner: 'Campus Ambassador Lead',
    status: 'In Progress',
    budgetAllocated: 400,
    actualSpend: 180,
    targetRegistrations: 85,
    actualRegistrations: 93,
    nextAction: 'Recognize top-performing student ambassadors in private group',
    isSimulatedSchedule: true,
  },
  {
    day: 4,
    phase: 'Demonstrate Value',
    title: 'Project Concept Preview & Value Hook',
    plannedActivities: [
      'Publish preview teaser of the 3 beginner projects (Resume Assistant, Study Summarizer, College FAQ Bot)',
      'Host quick 10-minute AMA in student tech communities',
      'Gather top student objections (e.g. "Do I need GPU or prior ML?") and answer on FAQ',
      'Refine copy emphasizing "No complex math, pure practical building"',
    ],
    owner: 'Content & Tech Evangelist',
    status: 'Planned',
    budgetAllocated: 300,
    actualSpend: 0,
    targetRegistrations: 90,
    actualRegistrations: 0,
    nextAction: 'Publish 60-second Loom/GIF walkthrough of the Resume Feedback Assistant',
    isSimulatedSchedule: true,
  },
  {
    day: 5,
    phase: 'Targeted Follow-up',
    title: 'Warm Channel Follow-ups & Mid-Sprint Review',
    plannedActivities: [
      'Follow up with club leads who agreed to share but had low turnout',
      'Dispatch email reminders strictly to students who opted in for updates',
      'Review channel-level CAC and identify top 2 highest-converting college clusters',
      'Prune outreach channels yielding zero conversions',
    ],
    owner: 'Growth Lead',
    status: 'Planned',
    budgetAllocated: 200,
    actualSpend: 0,
    targetRegistrations: 80,
    actualRegistrations: 0,
    nextAction: 'Execute small ₹500 targeted trial on LinkedIn/Meta student targeting if approved',
    isSimulatedSchedule: true,
  },
  {
    day: 6,
    phase: 'Referral Amplification',
    title: 'Viral Loop & Peer Incentive Push',
    plannedActivities: [
      'Highlight anonymous privacy-conscious referral leaderboard',
      'Prompt registered students via WhatsApp template to invite their final-year project teammates',
      'Double down on high-performing campus networks',
      'Reallocate unspent creative budget to distribution support',
    ],
    owner: 'Product Marketer',
    status: 'Planned',
    budgetAllocated: 500,
    actualSpend: 0,
    targetRegistrations: 85,
    actualRegistrations: 0,
    nextAction: 'Send batch nudge to students who registered but haven\'t shared referral link',
    isSimulatedSchedule: true,
  },
  {
    day: 7,
    phase: 'Final Campaign Push',
    title: 'Last-Call Push & Data Audit',
    plannedActivities: [
      'Send "Last 24 Hours / Final Seats" reminder through approved college channels',
      'Execute automated de-duplication script to purge invalid or duplicate emails',
      'Perform attribution reconciliation across all referral links & UTM tags',
      'Generate final 2-page Growth Plan Report for stakeholders',
    ],
    owner: 'Growth Lead',
    status: 'Planned',
    budgetAllocated: 300,
    actualSpend: 0,
    targetRegistrations: 60,
    actualRegistrations: 0,
    nextAction: 'Lock registration database and transmit roster to workshop host team',
    isSimulatedSchedule: true,
  },
];

// Proposed ₹2,000 Budget (from Section 9)
export const initialBudget: BudgetItem[] = [
  {
    id: 'budget-1',
    category: 'Creative assets and promotional materials',
    allocated: 300,
    actualSpend: 150,
    description: 'Figma templates, WhatsApp share banners, project preview graphics, social cards',
    isPaidPromotion: false,
    validationStatus: 'Committed',
    notes: 'Prioritized lightweight Canva/Figma assets; zero external design agency spend.',
  },
  {
    id: 'budget-2',
    category: 'Small, targeted promotional experiment',
    allocated: 1000,
    actualSpend: 0,
    description: 'Micro-experiment on Meta/LinkedIn student targeting (Only if organic channels lag behind)',
    isPaidPromotion: true,
    validationStatus: 'Planned',
    notes: 'Contingent on validating student audience density and sub-₹20 CPC. Organic remains primary.',
  },
  {
    id: 'budget-3',
    category: 'Student ambassador or distribution support',
    allocated: 400,
    actualSpend: 150,
    description: 'Volunteer perks, digital recognition badges, and printing 20 campus noticeboard QR posters',
    isPaidPromotion: false,
    validationStatus: 'Committed',
    notes: 'Non-monetary perks and print QR flyers for hostel noticeboards.',
  },
  {
    id: 'budget-4',
    category: 'Contingency',
    allocated: 300,
    actualSpend: 0,
    description: 'Emergency buffer for high-performing channel boost or SMS API fallback',
    isPaidPromotion: false,
    validationStatus: 'Planned',
    notes: 'Reserved for Day 6 re-allocation if a specific campus explodes in demand.',
  },
];

// Initial Registration Target Model (from Section 8)
export const initialTargetModel: TargetModelRow[] = [
  {
    channelId: 'whatsapp_groups',
    channelName: 'College WhatsApp communities',
    plannedTarget: 200,
    communitiesReached: 30,
    estimatedReach: 4500,
    conversionRatePercent: 4.4,
    confidenceLevel: 'High',
    costAllocated: 150,
    notes: 'Authorized placement via CRs in active final-year placement & project WhatsApp groups.',
  },
  {
    channelId: 'coding_clubs',
    channelName: 'Coding clubs and student societies',
    plannedTarget: 100,
    communitiesReached: 15,
    estimatedReach: 2200,
    conversionRatePercent: 4.5,
    confidenceLevel: 'High',
    costAllocated: 200,
    notes: 'GDSC, CSI, IEEE, and ACM student branches looking for beginner AI initiatives.',
  },
  {
    channelId: 'class_reps',
    channelName: 'Class representatives and ambassadors',
    plannedTarget: 100,
    communitiesReached: 25,
    estimatedReach: 2000,
    conversionRatePercent: 5.0,
    confidenceLevel: 'Medium',
    costAllocated: 400,
    notes: 'Direct peer recommendations by class reps carry highest social trust and CTR.',
  },
  {
    channelId: 'email_outreach',
    channelName: 'Email outreach',
    plannedTarget: 50,
    communitiesReached: 5,
    estimatedReach: 1500,
    conversionRatePercent: 3.3,
    confidenceLevel: 'Medium',
    costAllocated: 50,
    notes: 'Department newsletter and club mailing lists with verified permission.',
  },
  {
    channelId: 'linkedin_communities',
    channelName: 'LinkedIn and relevant student communities',
    plannedTarget: 50,
    communitiesReached: 12,
    estimatedReach: 1800,
    conversionRatePercent: 2.8,
    confidenceLevel: 'Low',
    costAllocated: 200,
    notes: 'Posts by student ambassadors and college placement prep groups.',
  },
];

// Pre-populated AI Decisions & Learning Log (from Section 11)
export const initialAIDecisions: AIDecision[] = [
  {
    id: 'ai-dec-1',
    problem: 'Generate 500 registrations with a total marketing budget of only ₹2,000.',
    promptSubmitted:
      'How should I allocate a ₹2,000 budget to get 500 final-year engineering student registrations in 7 days for a free AI workshop?',
    aiOriginalSuggestion:
      'Allocate ₹1,600 to targeted Instagram and Meta ads using lead forms, and ₹400 for ad creatives.',
    decision: 'Modified',
    reason:
      'The available budget is severely limited (₹4/target registration). Paid ad acquisition costs in ed-tech in India typically range from ₹25 to ₹75 per verified student lead, meaning ₹1,600 would yield at most 25-60 leads. Paid promotion should only be a small ₹1,000 contingency experiment if audience costs are verified, while 80%+ of effort goes to organic college distribution and referral loops.',
    finalImplementation:
      'Reserved ₹1,000 as a measured optional experiment only after validating conversion. Anchored primary acquisition on authorized WhatsApp groups, coding clubs, class representatives, and a peer referral loop.',
    expectedImpact:
      'Prevents rapid budget depletion with sub-par leads; leverages high-trust peer distribution with near-zero marginal CAC.',
    validationMethod:
      'Track channel-level registration volume and cost-per-registration daily; hold paid experiment in reserve until Day 5.',
    isExample: true,
    createdAt: '2026-10-24T10:00:00.000Z',
  },
  {
    id: 'ai-dec-2',
    problem: 'Maximize registration conversion rate on the student landing page.',
    promptSubmitted:
      'Design a high-converting registration form for engineering students that gathers complete demographic and academic profile data.',
    aiOriginalSuggestion:
      'Require full name, personal email, college email, phone number, college name, branch, graduation year, CGPA, GitHub profile link, resume upload, and AI project preferences.',
    decision: 'Rejected',
    reason:
      'Excessive form fields create severe friction and abandonment, especially on mobile WhatsApp traffic. Asking for resumes and CGPA for a 60-minute free beginner workshop is disproportionate and triggers privacy drop-offs. Data minimization maximizes form completion.',
    finalImplementation:
      'Streamlined to 5 required core fields (Full Name, Email, College, Branch, Graduation Year) + optional WhatsApp with explicit opt-in consent and optional referral code. Single-step form taking under 35 seconds to complete.',
    expectedImpact:
      'Expected mobile conversion rate jump from ~8% on long forms to 22-30% on a streamlined 5-field form.',
    validationMethod:
      'A/B tested drop-off simulation on mobile devices and monitored completion time under 40 seconds.',
    isExample: true,
    createdAt: '2026-10-24T14:30:00.000Z',
  },
  {
    id: 'ai-dec-3',
    problem: 'Incentivize registered students to share the workshop with their classmates.',
    promptSubmitted:
      'How do we design a referral campaign that gets each registered engineering student to invite 3 to 5 peers?',
    aiOriginalSuggestion:
      'Offer ₹50 Paytm cash or Amazon vouchers for every 3 successful referrals, with a ₹1,000 cash grand prize for the top student.',
    decision: 'Rejected',
    reason:
      'The total campaign budget is ₹2,000. A cash reward scheme is financially unviable (500 registrations × ₹15-50 payout would exceed budget by 4x-10x) and invites fraud, burner email spam, and self-referrals. Non-monetary social capital and project peer collaboration are much stronger motivators for engineering students.',
    finalImplementation:
      'Built a frictionless WhatsApp sharing engine with 3 pre-written message templates (Personal, College Group, Tech Club), unique referral attribution codes, instant referral counter, and a privacy-conscious peer leaderboard (first name + college only).',
    expectedImpact:
      'Organic viral coefficient (k-factor) of 0.25 to 0.40 without violating budget constraints or encouraging synthetic spam.',
    validationMethod:
      'Track referral link generation rate and count of non-duplicate attributed registrations per referral code.',
    isExample: true,
    createdAt: '2026-10-25T09:15:00.000Z',
  },
];

// Realistic Simulated Registrations (206 records)
// Demonstrates realistic acquisition breakdown, branches, colleges, referral attribution, timestamps
export const generateSimulatedRegistrations = (): Registration[] => {
  const colleges = [
    'Indian Institute of Technology (IIT) Bombay',
    'National Institute of Technology (NIT) Trichy',
    'Vellore Institute of Technology (VIT) Vellore',
    'BITS Pilani',
    'SRM Institute of Science and Technology',
    'Delhi Technological University (DTU)',
    'RV College of Engineering, Bengaluru',
    'College of Engineering Pune (COEP)',
    'PSG College of Technology, Coimbatore',
    'Thapar Institute of Engineering & Technology',
    'Manipal Institute of Technology',
    'Netaji Subhas University of Technology (NSUT)',
    'PES University, Bengaluru',
    'Jadavpur University, Kolkata',
    'Osmania University College of Engineering',
    'Anna University (CEG), Chennai',
  ];

  const branches = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence & Machine Learning (AI/ML)',
    'Data Science & Engineering',
    'Electronics & Communication Engineering (ECE)',
    'Electrical & Electronics Engineering (EEE)',
  ];

  const firstNames = [
    'Aarav', 'Aditi', 'Ananya', 'Arjun', 'Bhavya', 'Chetan', 'Dev', 'Diya',
    'Ishaan', 'Kavya', 'Karan', 'Manish', 'Neha', 'Nikhil', 'Pooja', 'Pranav',
    'Rahul', 'Rhea', 'Rohan', 'Sakshi', 'Sameer', 'Shreya', 'Siddharth', 'Sneha',
    'Tanvi', 'Utkarsh', 'Varun', 'Vidhi', 'Yash', 'Zoya', 'Abhishek', 'Meera',
    'Gaurav', 'Ritu', 'Kunal', 'Harsh', 'Swati', 'Tarun', 'Aniket', 'Deepika',
  ];

  const lastNames = [
    'Sharma', 'Verma', 'Patel', 'Reddy', 'Iyer', 'Nair', 'Singh', 'Gupta',
    'Kumar', 'Rao', 'Chowdhury', 'Deshmukh', 'Mishra', 'Joshi', 'Bhat',
    'Kulkarni', 'Mehta', 'Agarwal', 'Chatterjee', 'Banerjee',
  ];

  const channels: { source: 'whatsapp_groups' | 'coding_clubs' | 'class_reps' | 'email_outreach' | 'linkedin_communities' | 'direct_referral'; weight: number }[] = [
    { source: 'whatsapp_groups', weight: 42 },
    { source: 'coding_clubs', weight: 22 },
    { source: 'class_reps', weight: 20 },
    { source: 'direct_referral', weight: 16 },
    { source: 'email_outreach', weight: 10 },
    { source: 'linkedin_communities', weight: 10 },
  ];

  const records: Registration[] = [];
  const referralCodesPool: string[] = ['NX7K2P', 'NX9B4L', 'NX3W8Q', 'NX5M1R', 'NX2C9T'];

  // Base starting date: 4 days ago
  const baseTime = Date.now() - 4 * 24 * 60 * 60 * 1000;
  const count = 206; // Realistic Day 3-4 progress: ~206 out of 500

  for (let i = 0; i < count; i++) {
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[(i * 3) % lastNames.length];
    const college = colleges[i % colleges.length];
    const branch = branches[i % branches.length];
    const gradYear = 2025; // Final year engineering
    const refCode = `NX${(1000 + i).toString(36).toUpperCase()}${String.fromCharCode(65 + (i % 26))}`;

    // Randomize source by weight
    const rand = Math.random() * 120;
    let source: Registration['acquisitionSource'] = 'whatsapp_groups';
    if (rand < 42) source = 'whatsapp_groups';
    else if (rand < 64) source = 'coding_clubs';
    else if (rand < 84) source = 'class_reps';
    else if (rand < 100) source = 'direct_referral';
    else if (rand < 110) source = 'email_outreach';
    else source = 'linkedin_communities';

    // Set referredByCode for direct referrals or a subset of students
    let referredBy: string | undefined = undefined;
    if (source === 'direct_referral' || (i % 5 === 0 && referralCodesPool.length > 0)) {
      referredBy = referralCodesPool[i % referralCodesPool.length];
    }

    if (i < 5) {
      referralCodesPool.push(refCode);
    }

    // Distribute timestamps over the last 3.5 days
    const timeOffset = Math.floor((i / count) * 3.5 * 24 * 60 * 60 * 1000) + Math.floor(Math.random() * 3600000);
    const createdAt = new Date(baseTime + timeOffset).toISOString();

    records.push({
      id: `sim-reg-${1000 + i}`,
      fullName: `${fName} ${lName}`,
      email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i % 10 > 7 ? i : ''}@${college.toLowerCase().includes('iit') ? 'iitb.ac.in' : college.toLowerCase().includes('nit') ? 'nitt.edu' : 'gmail.com'}`,
      collegeName: college,
      branch: branch,
      graduationYear: gradYear,
      whatsappNumber: i % 2 === 0 ? `+91 98${Math.floor(10000000 + Math.random() * 89999999)}` : undefined,
      whatsappConsent: true,
      referralCode: refCode,
      referredByCode: referredBy,
      acquisitionSource: source,
      utmCampaign: 'build-ai-60m',
      utmMedium: source === 'direct_referral' ? 'referral' : 'social',
      createdAt: createdAt,
      isSimulated: true,
    });
  }

  return records;
};
