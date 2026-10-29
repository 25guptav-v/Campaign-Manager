import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  GraduationCap,
  CheckCircle2,
  Code2,
  Bot,
  FileCheck,
  FileText,
  MessageSquare,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Share2,
  Calendar,
  Users,
  ChevronDown,
  Info,
} from 'lucide-react';
import { Storage } from '../lib/storage';

export const LandingPage: React.FC = () => {
  const [scheduleText, setScheduleText] = useState<string>('Workshop schedule to be announced');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const s = Storage.getSettings();
    if (s.workshopSchedule) {
      setScheduleText(s.workshopSchedule);
    }
  }, []);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const exampleProjects = [
    {
      title: 'AI Resume Feedback Assistant',
      badge: 'Interview Prep',
      icon: FileCheck,
      description:
        'A lightweight Python/API app that parses engineering resumes, scans against software engineering job descriptions, and highlights missing keywords and weak action verbs.',
      stack: ['Python / OpenAI API', 'Prompt Engineering', 'Streamlit UI'],
    },
    {
      title: 'AI Study Notes Summarizer',
      badge: 'Academic Productivity',
      icon: FileText,
      description:
        'Upload lengthy semester lecture transcripts or PDF textbook chapters and generate crisp bullet-point revision sheets with self-test flashcard questions.',
      stack: ['Document Chunking', 'LLM Summarization', 'FastAPI'],
    },
    {
      title: 'AI College FAQ Chatbot',
      badge: 'Campus Automation',
      icon: MessageSquare,
      description:
        'A domain-specific RAG chatbot that answers recurring campus questions regarding examination dates, lab submissions, and placement criteria.',
      stack: ['Retrieval Augmented Gen (RAG)', 'Vector Embeddings', 'Web Chat UI'],
    },
  ];

  const benefits = [
    {
      title: 'Learn by Building, Not Just Watching',
      description:
        'Skip passive 40-hour video tutorials. Write hands-on code and see your AI application generate real outputs within 60 minutes.',
      icon: Code2,
    },
    {
      title: 'Solve Practical, Everyday Problems',
      description:
        'Understand how to connect modern Large Language Models to real workflows instead of memorizing abstract matrix algebra.',
      icon: Bot,
    },
    {
      title: 'A Starting Point for Your Portfolio',
      description:
        'Walk away with a concrete codebase that you can customize, expand on GitHub, and discuss during final-year placement interviews.',
      icon: FileCheck,
    },
    {
      title: 'Explore Beginner-Friendly AI Tools',
      description:
        'Get introduced to clean, accessible APIs, prompt chaining, and lightweight application scaffolds with zero expensive hardware required.',
      icon: Sparkles,
    },
  ];

  const faqs = [
    {
      q: 'Do I need prior Machine Learning or Deep Learning experience?',
      a: 'No advanced AI experience is required. If you know basic programming concepts (in Python, JavaScript, or C++) such as variables, functions, and API calls, you will be able to follow along comfortably.',
    },
    {
      q: 'What is the cost of attending the workshop?',
      a: 'The workshop is 100% free of charge. There are no hidden fees or charges.',
    },
    {
      q: 'When will the workshop take place?',
      a: 'Workshop schedule to be announced. Registered students will receive an update as soon as the live session slot is confirmed.',
    },
    {
      q: 'Is this only for final-year engineering students?',
      a: 'The curriculum and project examples are specifically tailored to final-year B.Tech / B.E. students preparing for campus placements and capstone projects, but passionate pre-final year students with coding foundations are also welcome.',
    },
    {
      q: 'Will I need a high-end GPU or special hardware?',
      a: 'Not at all. The workshop uses cloud-based APIs and lightweight local environments that run smoothly in your web browser or standard laptop.',
    },
    {
      q: 'How does the student referral system work?',
      a: 'After you register, you receive a unique referral link. You can invite your engineering project teammates or classmates via WhatsApp. Your referral stats update transparently in your confirmation portal.',
    },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden radial-glow border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Pills / Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NxtWave Live Workshop</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span>100% Free Online Workshop</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-navy-800 text-slate-300 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400 mr-1" />
              <span>60 Minutes</span>
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Build Your First AI Project in{' '}
            <span className="bg-gradient-to-r from-brand-400 via-brand-accent to-blue-400 bg-clip-text text-transparent">
              Just 60 Minutes.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            No advanced AI experience required. Join a free, beginner-friendly online workshop and take your first step toward building practical AI projects.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-base font-bold px-8 py-3.5 rounded-xl shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 transition-all active:scale-95"
            >
              <span>Reserve My Free Seat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-navy-900/80 hover:bg-navy-800 text-slate-200 text-base font-semibold px-6 py-3.5 rounded-xl border border-navy-700 transition-colors"
            >
              <span>See What You'll Build</span>
            </a>
          </div>

          {/* Prominent Metadata strip */}
          <div className="mt-12 max-w-3xl mx-auto bg-navy-900/60 backdrop-blur-sm border border-navy-800 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Format</span>
              <p className="text-xs sm:text-sm font-semibold text-white flex items-center space-x-1">
                <span>Free Online Session</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Duration</span>
              <p className="text-xs sm:text-sm font-semibold text-white flex items-center space-x-1">
                <span>60 Minutes</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Target Audience</span>
              <p className="text-xs sm:text-sm font-semibold text-white">
                Final-Year Engineers
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Schedule</span>
              <p className="text-xs sm:text-sm font-semibold text-brand-300">
                {scheduleText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: What will you build? */}
      <section id="projects" className="py-16 md:py-24 bg-navy-950 border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <span>Project-Based Learning</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              What Will You Build?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Here are three illustrative beginner project concepts. During the session, you'll see how accessible APIs and clean prompt architectures combine into practical applications.
            </p>
            <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400/90 bg-amber-950/30 border border-amber-900/40 px-3 py-1 rounded-md">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Note: These are example projects, not guaranteed workshop deliverables.</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleProjects.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <div
                  key={idx}
                  className="bg-navy-900/70 border border-navy-800 hover:border-brand-500/40 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-navy-800 text-slate-300 border border-slate-700">
                        {proj.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {proj.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-navy-800">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Key Concepts Covered
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {proj.stack.map((s, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium bg-navy-800/90 text-brand-300 px-2 py-0.5 rounded border border-navy-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Why should students register? */}
      <section className="py-16 md:py-24 bg-navy-900/30 border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Why Should You Register?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A high-leverage 60 minutes built specifically for students who want tangible skills rather than theoretical lectures.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-navy-900/50 border border-navy-800/90 rounded-xl p-5 space-y-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section: Who should attend? */}
      <section className="py-16 md:py-20 bg-navy-950 border-b border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-navy-700/80 rounded-2xl p-8 sm:p-10 shadow-2xl">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
                  Audience Alignment
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Who Should Attend?
                </h2>
                <p className="text-slate-300 text-sm">
                  This session is structured specifically for Indian engineering undergraduates looking for practical project leverage:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3 bg-navy-950/60 p-4 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Final-Year B.Tech & B.E. Students</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Graduating class of 2025 seeking hands-on project experience to demonstrate in upcoming interviews.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-navy-950/60 p-4 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Relevant Technical Branches</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Students in CSE, IT, AI/ML, Data Science, ECE, EEE, and related engineering disciplines.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-navy-950/60 p-4 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Basic Coding Foundations</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Familiarity with fundamental coding concepts, but limited or zero hands-on production AI application experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-navy-950/60 p-4 rounded-xl border border-navy-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Placement & Interview Ready</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Engineers who want an articulate, working project architecture to discuss credibly during technical interviews.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.02]"
                >
                  <span>Reserve My Free Seat Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-navy-950 border-b border-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about the 60-minute session.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-navy-900/60 border border-navy-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-white font-medium text-sm hover:text-brand-300"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-brand-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-navy-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build Your First AI Project?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Takes less than 35 seconds to register. Receive your confirmation and exclusive peer referral link immediately.
          </p>
          <div>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-brand-600 hover:bg-brand-500 text-white text-base font-bold px-8 py-3.5 rounded-xl shadow-xl shadow-brand-600/30 transition-all hover:scale-105"
            >
              <span>Reserve My Free Seat</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
