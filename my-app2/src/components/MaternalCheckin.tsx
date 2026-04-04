import { useState } from "react";

type QuestionType = "single" | "multi" | "text";

interface Question {
  id: number;
  section: string;
  question: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  icon: string;
}

interface SectionColors {
  bg: string;
  accent: string;
  text: string;
  border: string;
  pill: string;
}

const questions: Question[] = [
  {
    id: 1,
    section: "General Wellbeing",
    question: "How are you feeling overall today?",
    type: "single",
    options: ["Great — full of energy", "Pretty good", "Okay, getting by", "Not so well", "Really struggling"],
    icon: "🌸",
  },
  {
    id: 2,
    section: "General Wellbeing",
    question: "How would you rate your sleep last night?",
    type: "single",
    options: ["Slept well (6–8+ hrs)", "Light sleep, a few interruptions", "Woke up many times", "Barely slept"],
    icon: "🌙",
  },
  {
    id: 3,
    section: "Physical Symptoms",
    question: "Are you experiencing any of the following? (Select all that apply)",
    type: "multi",
    options: ["Nausea or vomiting", "Swelling in hands/feet/face", "Headache", "Cramping or contractions", "Back pain", "Shortness of breath", "Bleeding or spotting", "None of the above"],
    icon: "🩺",
  },
  {
    id: 4,
    section: "Physical Symptoms",
    question: "How would you describe your energy levels today?",
    type: "single",
    options: ["High energy", "Moderate energy", "Low energy", "Exhausted"],
    icon: "⚡",
  },
  {
    id: 5,
    section: "Nutrition & Hydration",
    question: "Have you been able to eat regular meals today?",
    type: "single",
    options: ["Yes, 3 meals", "Yes, small frequent meals", "Partially — nausea made it hard", "No, I haven't been able to eat"],
    icon: "🥗",
  },
  {
    id: 6,
    section: "Nutrition & Hydration",
    question: "How much water have you had today?",
    type: "single",
    options: ["More than 8 glasses", "About 6–8 glasses", "About 4–5 glasses", "Less than 4 glasses"],
    icon: "💧",
  },
  {
    id: 7,
    section: "Mental & Emotional Health",
    question: "How has your mood been today?",
    type: "single",
    options: ["Happy and positive", "Calm and okay", "A bit anxious or stressed", "Sad or down", "Overwhelmed"],
    icon: "💛",
  },
  {
    id: 8,
    section: "Mental & Emotional Health",
    question: "Is there anything on your mind you'd like to share with your care team?",
    type: "text",
    placeholder: "Share any concerns, questions, or thoughts here…",
    icon: "💬",
  },
  {
    id: 9,
    section: "Baby Movement",
    question: "Have you felt your baby move today? (If applicable)",
    type: "single",
    options: ["Yes, normal movement", "Yes, but less than usual", "Not yet today", "Not applicable (early pregnancy)"],
    icon: "👶",
  },
  {
    id: 10,
    section: "Support & Resources",
    question: "Do you feel supported at home right now?",
    type: "single",
    options: ["Very supported", "Somewhat supported", "Could use more support", "I'm struggling alone"],
    icon: "🤝",
  },
  {
    id: 11,
    section: "Support & Resources",
    question: "Is there anything specific you need from your healthcare provider today?",
    type: "text",
    placeholder: "E.g. prescription refill, appointment request, a question answered…",
    icon: "📋",
  },
];

const sections: string[] = [...new Set(questions.map((q) => q.section))];

const sectionColors: Record<string, SectionColors> = {
  "General Wellbeing": { bg: "bg-rose-50", accent: "bg-rose-400", text: "text-rose-600", border: "border-rose-200", pill: "bg-rose-100 text-rose-700" },
  "Physical Symptoms": { bg: "bg-amber-50", accent: "bg-amber-400", text: "text-amber-600", border: "border-amber-200", pill: "bg-amber-100 text-amber-700" },
  "Nutrition & Hydration": { bg: "bg-emerald-50", accent: "bg-emerald-400", text: "text-emerald-600", border: "border-emerald-200", pill: "bg-emerald-100 text-emerald-700" },
  "Mental & Emotional Health": { bg: "bg-violet-50", accent: "bg-violet-400", text: "text-violet-600", border: "border-violet-200", pill: "bg-violet-100 text-violet-700" },
  "Baby Movement": { bg: "bg-sky-50", accent: "bg-sky-400", text: "text-sky-600", border: "border-sky-200", pill: "bg-sky-100 text-sky-700" },
  "Support & Resources": { bg: "bg-pink-50", accent: "bg-pink-400", text: "text-pink-600", border: "border-pink-200", pill: "bg-pink-100 text-pink-700" },
};

type Answers = Record<number, string | string[]>;

function isAnswered(q: Question, answers: Answers): boolean {
  const a = answers[q.id];
  if (!a) return false;
  if (q.type === "multi") return (a as string[]).length > 0;
  if (q.type === "text") return (a as string).trim().length > 0;
  return true;
}

export default function MaternalCheckin() {
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<number>(0);

  const currentSectionName = sections[currentSection];
  const currentQuestions = questions.filter((q) => q.section === currentSectionName);
  const colors = sectionColors[currentSectionName];

  const answeredInSection = currentQuestions.filter((q) => isAnswered(q, answers)).length;
  const totalAnswered = questions.filter((q) => isAnswered(q, answers)).length;

  const handleSingle = (id: number, value: string): void => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleMulti = (id: number, value: string): void => {
    setAnswers((prev) => {
      const current = (prev[id] as string[]) || [];
      if (value === "None of the above") return { ...prev, [id]: ["None of the above"] };
      const withoutNone = current.filter((v) => v !== "None of the above");
      if (withoutNone.includes(value)) return { ...prev, [id]: withoutNone.filter((v) => v !== value) };
      return { ...prev, [id]: [...withoutNone, value] };
    });
  };

  const handleText = (id: number, value: string): void => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const canGoNext = currentSection < sections.length - 1;
  const canGoPrev = currentSection > 0;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #ede9fe 100%)" }}>
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-6 animate-bounce">🌷</div>
          <h2 className="text-3xl font-bold text-rose-700 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Check-in Complete
          </h2>
          <p className="text-rose-500 text-lg mb-2">Thank you for taking care of yourself today.</p>
          <p className="text-gray-500 text-sm mb-8">Your care team will review your responses and reach out if needed.</p>
          <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-5 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Summary</p>
            <div className="space-y-1">
              {sections.map((sec) => {
                const qs = questions.filter((q) => q.section === sec);
                const answered = qs.filter((q) => isAnswered(q, answers)).length;
                const c = sectionColors[sec];
                return (
                  <div key={sec} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-gray-600">{sec}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.pill}`}>
                      {answered}/{qs.length} answered
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => { setSubmitted(false); setAnswers({}); setCurrentSection(0); }}
            className="w-full py-3 rounded-xl bg-rose-400 hover:bg-rose-500 text-white font-semibold transition-all text-sm shadow-md"
          >
            Start New Check-in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #ede9fe 100%)", fontFamily: "'Lato', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');
        .option-btn { transition: all 0.15s ease; }
        .option-btn:hover { transform: translateY(-1px); }
        .section-tab { transition: all 0.2s ease; }
      `}</style>

      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-rose-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              🌸 Daily Check-in
            </h1>
            <p className="text-xs text-rose-400 mt-0.5">Maternal Health · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">{totalAnswered} of {questions.length} answered</div>
            <div className="w-32 h-1.5 bg-rose-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-400 rounded-full transition-all duration-500"
                style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Section tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sections.map((sec, i) => {
            const c = sectionColors[sec];
            const qs = questions.filter((q) => q.section === sec);
            const done = qs.filter((q) => isAnswered(q, answers)).length;
            const isActive = i === currentSection;
            return (
              <button
                key={sec}
                onClick={() => setCurrentSection(i)}
                className={`section-tab flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  isActive
                    ? `${c.accent} text-white border-transparent shadow-md`
                    : "bg-white/60 text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
              >
                {done === qs.length ? "✓ " : ""}{sec}
              </button>
            );
          })}
        </div>

        {/* Section header */}
        <div className={`rounded-2xl ${colors.bg} border ${colors.border} p-5 mb-5`}>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-12 rounded-full ${colors.accent}`} />
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest ${colors.text} mb-0.5`}>Section {currentSection + 1} of {sections.length}</p>
              <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {currentSectionName}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">{answeredInSection} of {currentQuestions.length} questions answered</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-5">
          {currentQuestions.map((q) => (
            <div key={q.id} className="bg-white/80 backdrop-blur rounded-2xl border border-white shadow-sm p-5">
              <div className="flex gap-3 mb-4">
                <span className="text-2xl">{q.icon}</span>
                <p className="text-gray-800 font-semibold leading-snug text-sm pt-0.5">{q.question}</p>
              </div>

              {q.type === "single" && q.options && (
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSingle(q.id, opt)}
                        className={`option-btn w-full text-left px-4 py-2.5 rounded-xl text-sm border transition-all ${
                          selected
                            ? `${colors.bg} ${colors.border} ${colors.text} font-semibold shadow-sm`
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <span className={`inline-block w-4 h-4 rounded-full border-2 mr-3 align-middle ${
                          selected ? `${colors.accent} border-transparent` : "border-gray-300"
                        }`} />
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "multi" && q.options && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-400 mb-2">Select all that apply</p>
                  {q.options.map((opt) => {
                    const selected = ((answers[q.id] as string[]) || []).includes(opt);
                    return (
                      <button
                        key={opt}
                        onClick={() => handleMulti(q.id, opt)}
                        className={`option-btn w-full text-left px-4 py-2.5 rounded-xl text-sm border transition-all ${
                          selected
                            ? `${colors.bg} ${colors.border} ${colors.text} font-semibold shadow-sm`
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <span className={`inline-block w-4 h-4 rounded-md border-2 mr-3 align-middle ${
                          selected ? `${colors.accent} border-transparent` : "border-gray-300"
                        }`} />
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {q.type === "text" && (
                <textarea
                  rows={3}
                  placeholder={q.placeholder}
                  value={(answers[q.id] as string) || ""}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleText(q.id, e.target.value)}
                  className={`w-full rounded-xl border ${colors.border} bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none transition-all`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {canGoPrev && (
            <button
              onClick={() => setCurrentSection((s) => s - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              ← Previous
            </button>
          )}
          {canGoNext ? (
            <button
              onClick={() => setCurrentSection((s) => s + 1)}
              className={`flex-1 py-3 rounded-xl ${colors.accent} text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all`}
            >
              Next Section →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="flex-1 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-all"
            >
              Submit Check-in 🌸
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5 pb-8">Your responses are private and shared only with your care team.</p>
      </div>
    </div>
  );
}