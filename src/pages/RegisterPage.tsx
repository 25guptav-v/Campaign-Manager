import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { z } from 'zod';
import {
  Sparkles,
  User,
  Mail,
  School,
  GraduationCap,
  Phone,
  Tag,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { Storage } from '../lib/storage';
import { AcquisitionChannelId } from '../types';

// Zod Schema for validation
const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long.' })
    .max(80, { message: 'Full name is too long.' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address (e.g., student@college.edu).' }),
  collegeName: z
    .string()
    .min(3, { message: 'Please enter your college/institution name.' }),
  branch: z
    .string()
    .min(1, { message: 'Please select your engineering branch.' }),
  graduationYear: z.coerce
    .number()
    .int()
    .min(2020, { message: 'Please select a valid graduation year.' }),
  whatsappNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+]?[0-9\s-]{10,15}$/.test(val),
      { message: 'Please enter a valid 10-digit mobile number.' }
    ),
  whatsappConsent: z.boolean(),
  referredByCode: z.string().optional(),
});

type FormData = z.infer<typeof registrationSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL param detection
  const refFromUrl = searchParams.get('ref') || '';
  const utmSource = searchParams.get('utm_source') || '';
  const utmCampaign = searchParams.get('utm_campaign') || 'build-ai-60m';
  const utmMedium = searchParams.get('utm_medium') || 'web';

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    collegeName: '',
    branch: 'Computer Science & Engineering (CSE)',
    graduationYear: 2025, // default to final year
    whatsappNumber: '',
    whatsappConsent: false,
    referredByCode: refFromUrl ? refFromUrl.toUpperCase() : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    const s = Storage.getSettings();
    setIsDemoMode(s.isDemoMode);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'graduationYear') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const mapUtmToChannel = (src: string): AcquisitionChannelId => {
    const s = src.toLowerCase();
    if (s.includes('whatsapp') || s.includes('wa')) return 'whatsapp_groups';
    if (s.includes('club') || s.includes('gdsc') || s.includes('acm')) return 'coding_clubs';
    if (s.includes('rep') || s.includes('cr') || s.includes('ambassador')) return 'class_reps';
    if (s.includes('email') || s.includes('newsletter')) return 'email_outreach';
    if (s.includes('linkedin')) return 'linkedin_communities';
    if (refFromUrl) return 'direct_referral';
    return 'whatsapp_groups';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate with Zod
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Require whatsapp consent if number provided
    if (formData.whatsappNumber && !formData.whatsappConsent) {
      setErrors((prev) => ({
        ...prev,
        whatsappConsent: 'Please consent to receive session updates on WhatsApp.',
      }));
      return;
    }

    setIsSubmitting(true);

    try {
      const channel = mapUtmToChannel(utmSource);

      const resp = Storage.createRegistration({
        fullName: formData.fullName,
        email: formData.email,
        collegeName: formData.collegeName,
        branch: formData.branch,
        graduationYear: formData.graduationYear,
        whatsappNumber: formData.whatsappNumber || undefined,
        whatsappConsent: formData.whatsappConsent,
        referredByCode: formData.referredByCode || undefined,
        acquisitionSource: channel,
        utmCampaign: utmCampaign,
        utmMedium: utmMedium,
      });

      if (!resp.success) {
        setServerError(resp.error || 'Failed to complete registration.');
        setIsSubmitting(false);
        return;
      }

      // Success! Pass registered record to confirmation route
      navigate('/success', {
        state: { registration: resp.registration },
      });
    } catch (err: any) {
      setServerError(err?.message || 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const branchOptions = [
    'Computer Science & Engineering (CSE)',
    'Information Technology (IT)',
    'Artificial Intelligence & Machine Learning (AI/ML)',
    'Data Science & Engineering',
    'Electronics & Communication Engineering (ECE)',
    'Electrical & Electronics Engineering (EEE)',
    'Mechanical Engineering',
    'Civil Engineering',
    'Other Engineering Branch',
  ];

  return (
    <div className="min-h-screen bg-navy-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center radial-glow">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors font-medium mb-2"
          >
            <span>← Back to Workshop Details</span>
          </Link>
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Free Registration • 60-Minute Workshop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Reserve Your Free Seat
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Join final-year engineering peers across India. No prior AI experience required.
          </p>
        </div>

        {/* Demo Mode / Live Mode Indicator Box */}
        <div className={`mb-6 p-3 rounded-xl border text-xs flex items-start space-x-2.5 ${
          isDemoMode
            ? 'bg-amber-950/40 border-amber-800/40 text-amber-300'
            : 'bg-navy-900 border-navy-800 text-slate-300'
        }`}>
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
          <div className="space-y-0.5">
            <p className="font-semibold">
              {isDemoMode ? 'Demo Sandbox Active' : 'Live Data Mode Active'}
            </p>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Registrations submitted will be recorded in {isDemoMode ? 'the simulation sandbox' : 'your live local session'} with real-time deduplication and attribution.
            </p>
          </div>
        </div>

        {/* Referral banner if ref is present in URL */}
        {refFromUrl && (
          <div className="mb-6 p-3.5 rounded-xl bg-brand-950/60 border border-brand-500/30 text-xs flex items-center justify-between text-brand-200">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>
                Referred by code: <strong>{refFromUrl.toUpperCase()}</strong>
              </span>
            </div>
            <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-mono">
              Referral Applied
            </span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-navy-900/80 backdrop-blur-md border border-navy-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {serverError && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-200 text-xs flex items-start space-x-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-300">Registration Error</p>
                <p className="mt-0.5 text-rose-200">{serverError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                  errors.fullName ? 'border-rose-500' : 'border-navy-700'
                }`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@college.edu or name@gmail.com"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                  errors.email ? 'border-rose-500' : 'border-navy-700'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
              )}
              <p className="text-[10px] text-slate-500 mt-1">
                Strict duplicate check: each email can only register once.
              </p>
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center space-x-1.5">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>College / Institution Name *</span>
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="e.g. Vellore Institute of Technology (VIT)"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                  errors.collegeName ? 'border-rose-500' : 'border-navy-700'
                }`}
              />
              {errors.collegeName && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.collegeName}</p>
              )}
            </div>

            {/* Branch & Graduation Year Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Branch */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center space-x-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>Branch *</span>
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {branchOptions.map((b) => (
                    <option key={b} value={b} className="bg-navy-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Graduation Year *
                </label>
                <select
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value={2025} className="bg-navy-900 text-white">
                    2025 (Final Year) 🎯
                  </option>
                  <option value={2026} className="bg-navy-900 text-white">
                    2026 (Pre-Final Year)
                  </option>
                  <option value={2027} className="bg-navy-900 text-white">
                    2027
                  </option>
                  <option value={2024} className="bg-navy-900 text-white">
                    2024 (Recent Graduate)
                  </option>
                </select>
              </div>
            </div>

            {/* Optional WhatsApp Number */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>WhatsApp Number (Optional)</span>
                </span>
                <span className="text-[10px] text-slate-500">For direct session updates</span>
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                  errors.whatsappNumber ? 'border-rose-500' : 'border-navy-700'
                }`}
              />
              {errors.whatsappNumber && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.whatsappNumber}</p>
              )}
            </div>

            {/* WhatsApp Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start space-x-2.5 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="whatsappConsent"
                  checked={formData.whatsappConsent}
                  onChange={handleChange}
                  className="mt-0.5 rounded border-slate-700 text-brand-600 focus:ring-brand-500 bg-navy-950"
                />
                <span className="text-[11px] leading-relaxed text-slate-400">
                  I give explicit consent to receive workshop schedule reminders, study templates, and access links via WhatsApp. (No third-party promotional spam).
                </span>
              </label>
              {errors.whatsappConsent && (
                <p className="text-[11px] text-rose-400 mt-1">{errors.whatsappConsent}</p>
              )}
            </div>

            {/* Optional Referral Code */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Referral Code (Optional)</span>
              </label>
              <input
                type="text"
                name="referredByCode"
                value={formData.referredByCode}
                onChange={handleChange}
                placeholder="e.g. NX7K2P"
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-navy-700 text-white text-xs sm:text-sm font-mono uppercase placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Self-referrals are automatically rejected by the growth engine.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-600/30 transition-all hover:shadow-brand-600/50 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span>Securing Your Seat...</span>
                ) : (
                  <>
                    <span>Confirm Free Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust badges */}
          <div className="pt-4 border-t border-navy-800 flex items-center justify-center space-x-4 text-[11px] text-slate-400">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Cost</span>
            </span>
            <span>•</span>
            <span>Zero Spam Policy</span>
            <span>•</span>
            <span>Immediate Link Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
