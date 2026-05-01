import { useState } from "react";
import Dashboard, { defaultVitalData } from "./screens/Dashboard";
import type { VitalDataPoint } from "./screens/Dashboard";
import CheckInForm from "./screens/CheckinForm";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "checkin">("dashboard");
  const [vitalData, setVitalData] = useState<VitalDataPoint[]>(defaultVitalData);

  const handleSubmitVitals = (point: VitalDataPoint) => {
    setVitalData((prev) => [...prev, point]);
  };

  return (
    <div className="min-h-screen pb-12" style={{ background: "linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #ede9fe 100%)", fontFamily: "'Lato', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');
      `}</style>

      {/* Navigation Bar */}
      <div className="bg-white backdrop-blur-sm border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-rose-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              🌸 Maternal Health Companion
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-rose-400 text-white shadow-md"
                  : "bg-white/60 text-gray-600 hover:bg-white border border-rose-100"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("checkin")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "checkin"
                  ? "bg-rose-400 text-white shadow-md"
                  : "bg-white/60 text-gray-600 hover:bg-white border border-rose-100"
              }`}
            >
              Check-in Form
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        {activeTab === "dashboard"
          ? <Dashboard vitalData={vitalData} />
          : <CheckInForm onSubmitVitals={handleSubmitVitals} />
        }
      </div>
    </div>
  );
}