"use client";

import { useState } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  BarChart3,
  Scale,
  Eye,
  Keyboard,
  FileText,
  Palette,
  Video,
  Code,
  ArrowRight,
  Mail,
} from "lucide-react";

type Question = {
  id: string;
  question: string;
  subtitle?: string;
  options: { label: string; value: number; note?: string }[];
};

const questions: Question[] = [
  {
    id: "industry",
    question: "What type of business do you run?",
    subtitle: "Some industries are targeted more than others",
    options: [
      { label: "E-commerce / Online Retail", value: 3, note: "#1 target for lawsuits" },
      { label: "Restaurant / Food Service", value: 2 },
      { label: "Healthcare", value: 2 },
      { label: "Professional Services", value: 1 },
      { label: "Home Services (HVAC, Plumbing, etc.)", value: 1 },
      { label: "Other", value: 1 },
    ],
  },
  {
    id: "state",
    question: "What state is your business in?",
    subtitle: "Lawsuit volume varies dramatically by state",
    options: [
      { label: "New York", value: 3, note: "Highest lawsuit volume" },
      { label: "Florida", value: 3, note: "2nd highest" },
      { label: "California", value: 3, note: "3rd highest" },
      { label: "Pennsylvania", value: 2 },
      { label: "Other state", value: 1 },
    ],
  },
  {
    id: "revenue",
    question: "Approximate annual revenue?",
    subtitle: "Higher revenue businesses are bigger targets for settlements",
    options: [
      { label: "Under $100K", value: 1 },
      { label: "$100K - $500K", value: 2 },
      { label: "$500K - $1M", value: 3 },
      { label: "$1M+", value: 3 },
    ],
  },
  {
    id: "altText",
    question: "Do all images on your website have descriptive alt text?",
    subtitle: "Missing alt text is cited in 70%+ of ADA lawsuits",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 3 },
      { label: "Not sure", value: 3 },
    ],
  },
  {
    id: "keyboard",
    question: "Can your entire site be navigated using only a keyboard?",
    subtitle: "Keyboard navigation failures appear in 60%+ of cases",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 3 },
      { label: "Not sure", value: 3 },
    ],
  },
  {
    id: "contrast",
    question: "Do your text and background colors have a 4.5:1 contrast ratio?",
    subtitle: "Low contrast is flagged by automated scanning tools",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 2 },
      { label: "Not sure", value: 2 },
    ],
  },
  {
    id: "forms",
    question: "Do all your forms have proper labels (not just placeholder text)?",
    subtitle: "Form accessibility issues appear in 55%+ of cases",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 2 },
      { label: "Not sure", value: 2 },
    ],
  },
  {
    id: "headings",
    question: "Do your headings follow a logical order (H1 then H2 then H3)?",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 1 },
      { label: "Not sure", value: 1 },
    ],
  },
  {
    id: "captions",
    question: "Do your videos have captions?",
    options: [
      { label: "Yes", value: 0 },
      { label: "No videos on site", value: 0 },
      { label: "No", value: 2 },
      { label: "Not sure", value: 2 },
    ],
  },
  {
    id: "overlay",
    question: "Do you have an accessibility overlay or widget installed?",
    subtitle: "25% of 2024 lawsuits cited overlays as barriers — not solutions",
    options: [
      { label: "No", value: 0 },
      { label: "Yes", value: 2, note: "Increases risk" },
      { label: "Not sure", value: 1 },
    ],
  },
];

const maxScore = 3 + 3 + 3 + 3 + 3 + 2 + 2 + 1 + 2 + 2; // 24

type RiskLevel = "low" | "medium" | "high" | "critical";

function getRiskLevel(score: number): RiskLevel {
  const pct = (score / maxScore) * 100;
  if (pct <= 25) return "low";
  if (pct <= 50) return "medium";
  if (pct <= 75) return "high";
  return "critical";
}

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; border: string; meter: string; icon: React.ReactNode; message: string }> = {
  low: {
    label: "Low Risk",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    meter: "bg-emerald-500",
    icon: <CheckCircle2 className="w-12 h-12 text-emerald-500" />,
    message: "Your website appears to be in decent shape. Keep up the good work, but don't get complacent — regular audits are still recommended.",
  },
  medium: {
    label: "Medium Risk",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    meter: "bg-amber-500",
    icon: <AlertTriangle className="w-12 h-12 text-amber-500" />,
    message: "You have gaps that automated lawsuit-scanning tools actively look for. A few targeted fixes could significantly reduce your exposure.",
  },
  high: {
    label: "High Risk",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    meter: "bg-orange-500",
    icon: <AlertTriangle className="w-12 h-12 text-orange-500" />,
    message: "Your website matches the profile of businesses currently being sued. Action is strongly recommended within the next 30 days.",
  },
  critical: {
    label: "Critical Risk",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    meter: "bg-red-600",
    icon: <XCircle className="w-12 h-12 text-red-600" />,
    message: "You are a prime target for an ADA website lawsuit. Multiple risk factors are present. Take action this week.",
  },
};

const issueIcons: Record<string, React.ReactNode> = {
  altText: <Eye className="w-5 h-5" />,
  keyboard: <Keyboard className="w-5 h-5" />,
  contrast: <Palette className="w-5 h-5" />,
  forms: <FileText className="w-5 h-5" />,
  headings: <Code className="w-5 h-5" />,
  captions: <Video className="w-5 h-5" />,
  overlay: <Shield className="w-5 h-5" />,
};

const actionItems: Record<string, string> = {
  altText: "Add descriptive alt text to every image on your website",
  keyboard: "Test and fix keyboard navigation — press Tab through every page",
  contrast: "Check color contrast ratios at webaim.org/resources/contrastchecker",
  forms: "Add proper <label> elements to all form fields",
  headings: "Restructure headings in logical order (H1 > H2 > H3)",
  captions: "Add captions to all video content",
  overlay: "Remove the accessibility overlay — it may be increasing your lawsuit risk",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const showResults = step >= questions.length;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const risk = getRiskLevel(totalScore);
  const config = riskConfig[risk];
  const pct = Math.round((totalScore / maxScore) * 100);

  const flaggedIssues = Object.entries(answers).filter(
    ([key, val]) => val > 0 && ["altText", "keyboard", "contrast", "forms", "headings", "captions", "overlay"].includes(key)
  );

  function selectAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => setStep((s) => s + 1), 300);
  }

  if (showResults) {
    return (
      <main className="min-h-screen flex flex-col">
        {/* Stats bar */}
        <div className="bg-slate-900 text-white py-3">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm">
            <span>15,000+ lawsuits in 4 years</span>
            <span className="hidden sm:inline">|</span>
            <span>$200K+ spent by one small business</span>
            <span className="hidden sm:inline">|</span>
            <span>94.8% of websites fail</span>
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center px-4 py-12">
          <div className="w-full max-w-2xl space-y-8">
            {/* Risk Score Card */}
            <div className={`rounded-2xl border-2 ${config.border} ${config.bg} p-8 text-center space-y-6`}>
              <div className="flex justify-center">{config.icon}</div>
              <div>
                <h1 className={`text-3xl font-bold ${config.color}`}>{config.label}</h1>
                <p className="text-slate-600 mt-2 text-lg">{config.message}</p>
              </div>
              {/* Meter */}
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${config.meter} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.max(pct, 5)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                  <span>Critical</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-800">
                Risk Score: {totalScore}/{maxScore}
              </p>
            </div>

            {/* Flagged Issues */}
            {flaggedIssues.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-slate-500" />
                  Issues Increasing Your Risk
                </h2>
                <div className="space-y-3">
                  {flaggedIssues.map(([key]) => (
                    <div key={key} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="text-slate-500 mt-0.5">{issueIcons[key]}</div>
                      <div>
                        <p className="font-medium text-slate-800">{actionItems[key]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <Scale className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                <p className="text-2xl font-bold text-slate-800">4,000+</p>
                <p className="text-sm text-slate-500">Lawsuits in 2025</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <AlertTriangle className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                <p className="text-2xl font-bold text-slate-800">90%</p>
                <p className="text-sm text-slate-500">Filed by 16 law firms</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <Shield className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                <p className="text-2xl font-bold text-slate-800">$5K-$20K</p>
                <p className="text-sm text-slate-500">Typical settlement</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <BarChart3 className="w-6 h-6 mx-auto text-slate-400 mb-2" />
                <p className="text-2xl font-bold text-slate-800">94.8%</p>
                <p className="text-sm text-slate-500">Websites that fail</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white text-center space-y-4">
              <h2 className="text-2xl font-bold">Get a Free Accessibility Audit</h2>
              <p className="text-slate-300">
                We'll review your website and tell you exactly what needs fixing — no obligation, no sales pitch.
              </p>
              {!submitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Get Audit
                  </button>
                </form>
              ) : (
                <div className="bg-emerald-900/50 rounded-lg p-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-semibold">Thanks! We'll be in touch within 24 hours.</p>
                </div>
              )}
            </div>

            {/* Restart */}
            <div className="text-center">
              <button
                onClick={() => {
                  setStep(0);
                  setAnswers({});
                  setSubmitted(false);
                  setEmail("");
                }}
                className="text-slate-500 hover:text-slate-700 text-sm underline"
              >
                Retake assessment
              </button>
            </div>

            {/* Footer */}
            <footer className="text-center text-xs text-slate-400 pt-4 pb-8">
              Built by{" "}
              <a href="https://egmermarketing.com" className="underline hover:text-slate-600">
                Egmer Marketing
              </a>{" "}
              — Custom-coded, WCAG 2.1 AA compliant websites for small businesses.
              <br />
              Sources: Cox Media Group Investigation (Feb 2026), WebAIM Million Report, FTC, DOJ
            </footer>
          </div>
        </div>
      </main>
    );
  }

  // Quiz view
  const q = questions[step];
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold">ADA Lawsuit Risk Calculator</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Find out how vulnerable your business is — based on 15,000+ real cases
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{q.question}</h2>
            {q.subtitle && <p className="text-slate-500 mt-1">{q.subtitle}</p>}
          </div>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(q.id, opt.value)}
                className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-medium text-slate-800">{opt.label}</span>
                  {opt.note && (
                    <span className="ml-2 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {opt.note}
                    </span>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
