# AI Workshop Growth Engine

> **"From Zero to 500 Registrations — One Smart Campaign."**  
> *A growth campaign simulation and functional web prototype for NxtWave's "Build Your First AI Project in 60 Minutes" marketing challenge.*

---

## 1. Executive Summary & Challenge Overview

- **Campaign:** *Build Your First AI Project in 60 Minutes*
- **Organizer:** NxtWave
- **Objective:** Generate **500 registrations** from final-year engineering students within **7 days**.
- **Marketing Budget:** **₹2,000 INR** (Strict non-negotiable ceiling)
- **Workshop Price:** **100% Free**
- **Primary Audience:** Final-year B.Tech / B.E. engineering students in India (2025 graduating batch).

### The Strategic Dilemma: Why Paid Ads Cannot Win Here
At a budget of ₹2,000 for 500 target registrations, the maximum permissible Customer Acquisition Cost (CAC) is:
$$\text{Max Allowed CAC} = \frac{₹2,000}{500} = ₹4.00 \text{ per student}$$

In the Indian ed-tech landscape, paid student acquisition on Meta or LinkedIn ranges from **₹25 to ₹75+ per verified lead**. Relying primarily on paid advertising would exhaust the entire ₹2,000 budget after acquiring just 30 to 60 registrations.

Therefore, this growth engine is architected around **zero-marginal-cost organic distribution**:
1. **High-trust campus communities:** Authorized Class Representatives (CRs) and college WhatsApp groups.
2. **Student societies:** Technical student chapters (GDSC, CSI, ACM, IEEE).
3. **Peer viral loop:** Because final-year students work in teams of 3 to 4 on their capstone projects, post-registration prompts encourage inviting project teammates via pre-encoded WhatsApp messages.

---

## 2. Key Product Experiences

The application contains two distinct, fully functional experiences:

### A. Student-Facing Registration & Referral Experience
- **Conversion-Optimized Landing Page (`/`):**
  - Hero headline: *"Build Your First AI Project in Just 60 Minutes."*
  - 3 Illustrative beginner project previews: *AI Resume Feedback Assistant*, *AI Study Notes Summarizer*, *AI College FAQ Chatbot* (clearly labelled as examples).
  - 4 Tangible benefits focused on hands-on building and interview readiness.
  - Transparent audience targeting and FAQ. Zero fake testimonials, zero fabricated partner logos.
  - Transparent schedule disclosure: *"Workshop schedule to be announced."*
- **Streamlined Registration Funnel (`/register`):**
  - Fast 5-field form: Full Name, Email, College, Branch, Graduation Year.
  - Optional WhatsApp field with explicit opt-in consent for schedule updates.
  - Optional referral code (auto-detected from URL: `?ref=CODE`).
  - **Strict deduplication:** Normalized lowercase email checking prevents multiple signups.
  - **Self-referral prevention:** Rejects students attempting to credit their own code.
- **WhatsApp Growth Engine & Success Confirmation (`/success`):**
  - Generates unique alphanumeric referral code (e.g. `NX7K2P`).
  - Real-time live referral counter tracking attributed signups.
  - **3 Pre-written WhatsApp sharing templates:**
    - *Template A:* Personal invitation for 1-on-1 project partners.
    - *Template B:* College WhatsApp group broadcast.
    - *Template C:* Student club and society invitation.
  - **Privacy-conscious referral leaderboard:** Ranks top peer referrers by masked initials and college (never reveals email or phone numbers).

### B. Campaign Manager Dashboard (`/dashboard`)
- **Executive KPI Cards:**
  - 500 Registration Target, Valid Registrations, Target Achievement %, Registrations Remaining, Registrations Per Day, Referral-Attributed Registrations, Conversion Rate, and Cost Per Registration (`Spent / Valid`).
  - Division-by-zero protection (displays `—` when registrations are 0).
- **Interactive Recharts Visualizations:**
  - Daily registration velocity area chart with target pace reference.
  - Channel distribution bar chart.
  - Referral vs direct split donut chart.
- **Acquisition Channel Analytics & Target Model (`/dashboard/channels`):**
  - Bottom-up editable planning model: Communities Reached, Estimated Reach, Assumed Conversion Rate %, Calculated Forecast, and Actual Signups.
  - Low, Base, and High scenario forecasting.
  - Automated warning flags when planned target exceeds estimated reach.
- **Seven-Day Campaign Execution Planner (`/dashboard/planner`):**
  - Interactive day-by-day roadmap (Days 1–7) with milestones, owners, status dropdowns, targets, and next operational actions.
- **₹2,000 Budget Planner (`/dashboard/budget`):**
  - Proposed allocation: Creative Assets (₹300), Paid Experiment (₹1,000), Ambassador Support (₹400), Contingency (₹300).
  - Inline editing of allocated amounts and actual spend.
  - **Automated over-budget alert** if total allocation exceeds ₹2,000.
- **AI Campaign Copilot (`/dashboard/copilot`):**
  - Rule-based diagnostic engine evaluating real-time velocity, channel bottlenecks, and viral ratios.
  - Generates 5 structured outputs: Campaign Diagnosis, Most Promising Next Action, High-Leverage Growth Experiment, Metric to Monitor, and Assumptions/Uncertainties.
- **AI Decisions & Learning Log (`/dashboard/ai-decisions`):**
  - Demonstrates independent marketer judgment evaluating, modifying, and rejecting AI suggestions.
  - Pre-populated with 3 illustrative decisions (Paid Ads, Form Friction, Cash Referral Rewards) with ability to add, edit, or delete records.
- **3-Minute Presentation Pitch Outline (`/presentation`):**
  - Structured into 4 segments: *Problem (0:00–0:40)*, *Strategy (0:40–1:20)*, *Working Asset (1:20–2:20)*, *Learning & Judgment (2:20–3:00)*.
  - Built-in interactive stopwatch timer (0:00 to 3:00) with speaker teleprompter scripts and an ethical accuracy checklist.
- **Two-Page Growth Plan Report (`/growth-plan`):**
  - Print/PDF-ready 2-page document formatted strictly to Section 13 requirements with calibrated `@media print` page breaks.

---

## 3. Technology Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Deep navy `#070B14`, electric blue `#3B82F6` / `#2563EB`, and slate)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Validation:** Zod v4
- **Routing:** React Router v7
- **Effects:** Canvas Confetti

---

## 4. Local Installation & Development

### Prerequisites
- Node.js (v18 or higher; tested on v24)
- npm (v9 or higher)

### Setup Steps
```bash
# 1. Clone repository or navigate to project directory
cd vidhi

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. Demonstration Data vs. Live Data Toggle

To ensure complete transparency during interviews and evaluations:
- The top header and dashboard include an interactive **"Demo Data / Live Data"** switcher.
- **Demo Mode (Default):** Displays 206 simulated records with realistic Indian engineering college names (IIT, NIT, BITS, VIT, SRM, DTU, COEP, RVCE), branches, and referral attribution so evaluators can inspect charts and metrics immediately.
- **Live Mode:** Switches to a clean local session where only registrations submitted through the form are recorded.
- **Reset Button:** Allows instantly resetting simulated and budget figures to their factory defaults.

---

## 6. Optional Supabase Backend Integration

The application is engineered with an isolated storage abstraction layer (`src/lib/storage.ts`). If Supabase credentials are provided in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase SQL Schema:
```sql
CREATE TABLE registrations (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  college_name TEXT NOT NULL,
  branch TEXT NOT NULL,
  graduation_year INTEGER NOT NULL,
  whatsapp_number TEXT,
  whatsapp_consent BOOLEAN DEFAULT FALSE,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by_code TEXT,
  acquisition_source TEXT NOT NULL,
  utm_campaign TEXT,
  utm_medium TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_simulated BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_referred_by ON registrations(referred_by_code);
CREATE INDEX idx_email ON registrations(email);
```

---

## 7. Functional Acceptance Verification

| # | Acceptance Criterion | Status | Implementation Details |
|---|---|---|---|
| 1 | Landing page renders correctly | Verified | Hero, 3 example projects, benefits, audience alignment, FAQ |
| 2 | Student completes registration | Verified | 5 core fields + optional WhatsApp & referral code |
| 3 | Invalid email rejected | Verified | Zod email regex validation with user feedback |
| 4 | Duplicate registration prevented | Verified | Case-insensitive normalized email uniqueness check |
| 5 | Unique referral code generated | Verified | 6-character uppercase alphanumeric code (`NX...`) |
| 6 | Referral link opens registration | Verified | Supports `?ref=CODE` and auto-populates referral code |
| 7 | Valid referral attributed | Verified | Attributed to referrer and updates their score |
| 8 | Self-referrals rejected | Verified | Rejects matches against student's own generated code or email |
| 9 | Registrations update metrics | Verified | Dashboard KPIs and Recharts reflect signups in real time |
| 10 | WhatsApp sharing opens prefilled text | Verified | Templates A, B, C encode directly to `api.whatsapp.com` |
| 11 | Simulated data visibly marked | Verified | Badges and alerts differentiate demo from live records |
| 12 | Budget defaults to ₹2,000 | Verified | ₹300 + ₹1,000 + ₹400 + ₹300 = ₹2,000 with over-budget alert |
| 13 | Target is configurable | Verified | Adjustable from settings or target model |
| 14 | 7-day planner supported | Verified | All 7 days with statuses, owners, budgets, and actuals |
| 15 | AI decision log editable | Verified | Add, edit, delete, and view 3 pre-populated examples |
| 16 | Registration table CSV export | Verified | Exports formatted CSV file with deduplicated records |
| 17 | 2-page growth report printable | Verified | Calibrated `@media print` with explicit page breaks |
| 18 | Mobile responsive | Verified | Mobile menu, touch-friendly buttons, and responsive grid |
| 19 | Zero secrets in frontend code | Verified | Environment variables used; no service keys in repo |
| 20 | Zero false performance claims | Verified | Explicit disclaimers in UI, presentation, and report |

---

## 8. Growth Marketer Interview Talking Points

1. **Why peer referrals over paid ads?**  
   Paid ads at ₹4 CAC are mathematically impossible in ed-tech. Engineering students work in project teams of 3–4; tapping capstone group dynamics creates a natural organic viral multiplier.
2. **Why reject cash incentives?**  
   A ₹50 cash reward would bankrupt the ₹2,000 budget after 40 students and invites fake burner emails. Non-monetary social capital and project collaboration are cleaner motivators.
3. **How was registration drop-off minimized?**  
   Shortened from AI's suggested 10-field form (with resume uploads) to a 35-second 5-field form, preserving mobile conversion from WhatsApp chat clicks.

---

## 9. License

Developed for the NxtWave Growth Marketing Challenge simulation. All demo student records and metrics are illustrative examples.
