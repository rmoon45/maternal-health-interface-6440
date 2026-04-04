import { useState } from "react";

interface FormData {
  weightValue: string;
  weightUnit: "lbs" | "kg";
  systolic: string;
  diastolic: string;
  heartRate: string;
  glucoseMeasured: "yes" | "no" | "";
  glucoseReading: string;
  painLevel: number;
  sleepHours: string;
  swelling: "yes" | "no" | "";
  swellingLocation: string[];
  bleeding: "yes" | "no" | "";
  bleedingDescription: string;
  babyMovement: "yes" | "no" | "na" | "";
}

const initialForm: FormData = {
  weightValue: "",
  weightUnit: "lbs",
  systolic: "",
  diastolic: "",
  heartRate: "",
  glucoseMeasured: "",
  glucoseReading: "",
  painLevel: 1,
  sleepHours: "",
  swelling: "",
  swellingLocation: [],
  bleeding: "",
  bleedingDescription: "",
  babyMovement: "",
};

const swellingLocations = ["Hands", "Feet", "Face", "Ankles", "Legs"];

export default function CheckinForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSwellingLocation = (loc: string) => {
    setForm((prev) => ({
      ...prev,
      swellingLocation: prev.swellingLocation.includes(loc)
        ? prev.swellingLocation.filter((l) => l !== loc)
        : [...prev.swellingLocation, loc],
    }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-7xl mb-6">🌷</div>
        <h2
          className="text-3xl font-bold text-rose-700 mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Check-in Complete
        </h2>
        <p className="text-rose-500 text-lg mb-8">
          Thank you for updating your health log today.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm(initialForm); }}
          className="px-8 py-3 rounded-xl bg-rose-400 hover:bg-rose-500 text-white font-semibold shadow-md transition-all"
        >
          Submit Another Entry
        </button>
      </div>
    );
  }

  const inputStyle =
    "w-full rounded-xl border border-rose-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all shadow-sm";
  // const labelStyle = "block text-sm font-semibold text-gray-700 mb-2";
  const hintStyle = "text-xs text-gray-400 mt-1";

  const yesNoBtn = (
    field: keyof FormData,
    value: "yes" | "no",
    extraOnClick?: () => void
  ) => {
    const current = form[field];
    const isSelected = current === value;
    return (
      <button
        type="button"
        onClick={() => {
          setField(field, isSelected ? "" as never : value as never);
          if (extraOnClick && !isSelected) extraOnClick();
        }}
        className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
          isSelected
            ? "bg-rose-400 text-white border-rose-400 shadow-sm"
            : "bg-white/50 text-gray-600 border-rose-200 hover:border-rose-300"
        }`}
      >
        {value === "yes" ? "Yes" : "No"}
      </button>
    );
  };

  const sectionCard = (children: React.ReactNode) => (
    <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6 space-y-5">
      {children}
    </div>
  );

  const questionLabel = (icon: string, text: string, sub?: string) => (
    <div className="flex items-start gap-2 mb-3">
      <span className="text-lg mt-0.5">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-gray-700">{text}</p>
        {sub && <p className={hintStyle}>{sub}</p>}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h2
        className="text-3xl font-bold text-gray-800 mb-2"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Weekly Check-in
      </h2>
      <p className="text-gray-500 text-sm mb-8">
        Please tell us how you're doing so we can keep your records up to date.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Vitals */}
        {sectionCard(
          <>
            <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Vitals</p>

            {/* Weight */}
            <div>
              {questionLabel("⚖️", "What is your current weight?")}
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  placeholder="e.g. 145"
                  value={form.weightValue}
                  onChange={(e) => setField("weightValue", e.target.value)}
                  className={`${inputStyle} flex-1`}
                />
                <div className="flex rounded-xl border border-rose-200 overflow-hidden shadow-sm">
                  {(["lbs", "kg"] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setField("weightUnit", unit)}
                      className={`px-4 py-2 text-sm font-semibold transition-all ${
                        form.weightUnit === unit
                          ? "bg-rose-400 text-white"
                          : "bg-white/50 text-gray-500 hover:bg-rose-50"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blood pressure */}
            <div>
              {questionLabel("🩺", "What is your blood pressure today?", "Systolic / Diastolic (mmHg)")}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={0}
                  max={300}
                  placeholder="Systolic"
                  value={form.systolic}
                  onChange={(e) => setField("systolic", e.target.value)}
                  className={`${inputStyle} flex-1`}
                />
                <span className="text-gray-400 font-bold text-lg">/</span>
                <input
                  type="number"
                  min={0}
                  max={200}
                  placeholder="Diastolic"
                  value={form.diastolic}
                  onChange={(e) => setField("diastolic", e.target.value)}
                  className={`${inputStyle} flex-1`}
                />
              </div>
            </div>

            {/* Heart rate */}
            <div>
              {questionLabel("❤️", "What is your resting heart rate?", "Beats per minute")}
              <input
                type="number"
                min={0}
                max={300}
                placeholder="e.g. 72"
                value={form.heartRate}
                onChange={(e) => setField("heartRate", e.target.value)}
                className={inputStyle}
              />
            </div>

            {/* Blood glucose */}
            <div>
              {questionLabel("🩸", "Have you measured your blood glucose this week?")}
              <div className="flex gap-2 mb-3">
                {yesNoBtn("glucoseMeasured", "yes")}
                {yesNoBtn("glucoseMeasured", "no", () => setField("glucoseReading", ""))}
              </div>
              {form.glucoseMeasured === "yes" && (
                <input
                  type="number"
                  min={0}
                  placeholder="Reading (mg/dL or mmol/L)"
                  value={form.glucoseReading}
                  onChange={(e) => setField("glucoseReading", e.target.value)}
                  className={inputStyle}
                />
              )}
            </div>
          </>
        )}

        {/* Wellbeing */}
        {sectionCard(
          <>
            <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Wellbeing</p>

            {/* Pain slider */}
            <div>
              {questionLabel("😣", "How would you rate your overall pain or discomfort today?", "1 = No pain · 10 = Severe pain")}
              <div className="px-1">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>1</span><span>10</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={form.painLevel}
                  onChange={(e) => setField("painLevel", Number(e.target.value))}
                  className="w-full accent-rose-400"
                />
                <div className="text-center mt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold">
                    {form.painLevel} / 10
                  </span>
                </div>
              </div>
            </div>

            {/* Sleep */}
            <div>
              {questionLabel("🌙", "How many hours of sleep did you get last night?")}
              <input
                type="number"
                min={0}
                max={24}
                step={0.5}
                placeholder="e.g. 7.5"
                value={form.sleepHours}
                onChange={(e) => setField("sleepHours", e.target.value)}
                className={inputStyle}
              />
            </div>
          </>
        )}

        {/* Symptoms */}
        {sectionCard(
          <>
            <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">Symptoms</p>

            {/* Swelling */}
            <div>
              {questionLabel("🦶", "Have you noticed any swelling in your hands, feet, or face this week?")}
              <div className="flex gap-2 mb-3">
                {yesNoBtn("swelling", "yes")}
                {yesNoBtn("swelling", "no", () => setField("swellingLocation", []))}
              </div>
              {form.swelling === "yes" && (
                <div>
                  <p className={`${hintStyle} mb-2`}>Select all locations that apply:</p>
                  <div className="flex flex-wrap gap-2">
                    {swellingLocations.map((loc) => {
                      const selected = form.swellingLocation.includes(loc);
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => toggleSwellingLocation(loc)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            selected
                              ? "bg-rose-400 text-white border-rose-400 shadow-sm"
                              : "bg-white/50 text-gray-600 border-rose-200 hover:border-rose-300"
                          }`}
                        >
                          {loc}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bleeding */}
            <div>
              {questionLabel("🔴", "Have you experienced any vaginal bleeding?")}
              <div className="flex gap-2 mb-3">
                {yesNoBtn("bleeding", "yes")}
                {yesNoBtn("bleeding", "no", () => setField("bleedingDescription", ""))}
              </div>
              {form.bleeding === "yes" && (
                <textarea
                  rows={2}
                  placeholder="Please describe (amount, color, duration…)"
                  value={form.bleedingDescription}
                  onChange={(e) => setField("bleedingDescription", e.target.value)}
                  className={`${inputStyle} resize-none`}
                />
              )}
            </div>

            {/* Baby movement */}
            <div>
              {questionLabel("👶", "Have you felt your baby move today?", "Applicable from ~18 weeks")}
              <div className="flex gap-2">
                {(["yes", "no", "na"] as const).map((val) => {
                  const isSelected = form.babyMovement === val;
                  const label = val === "yes" ? "Yes" : val === "no" ? "No" : "Not applicable";
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setField("babyMovement", isSelected ? "" : val)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                        isSelected
                          ? "bg-rose-400 text-white border-rose-400 shadow-sm"
                          : "bg-white/50 text-gray-600 border-rose-200 hover:border-rose-300"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg shadow-md transition-all"
        >
          Submit Check-in
        </button>
      </form>
    </div>
  );
}