import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Oura-inspired mock data showing trends across 40 weeks of pregnancy
const vitalData = [
  { week: 'Wk 4', hr: 68, hrv: 52, temp: 98.2, rr: 14.5 },
  { week: 'Wk 8', hr: 70, hrv: 50, temp: 98.6, rr: 14.8 },
  { week: 'Wk 12', hr: 72, hrv: 48, temp: 98.5, rr: 15.0 },
  { week: 'Wk 16', hr: 74, hrv: 45, temp: 98.4, rr: 15.2 },
  { week: 'Wk 20', hr: 76, hrv: 42, temp: 98.4, rr: 15.3 },
  { week: 'Wk 24', hr: 78, hrv: 40, temp: 98.3, rr: 15.5 },
  { week: 'Wk 28', hr: 80, hrv: 38, temp: 98.3, rr: 15.8 },
  { week: 'Wk 32', hr: 81, hrv: 36, temp: 98.2, rr: 16.0 },
  { week: 'Wk 36', hr: 82, hrv: 35, temp: 98.2, rr: 16.2 },
  { week: 'Wk 40', hr: 83, hrv: 34, temp: 98.1, rr: 16.5 },
];

type VitalKey = 'hr' | 'hrv' | 'temp' | 'rr';

export default function Dashboard() {
  const [activeVital, setActiveVital] = useState<VitalKey>('hr');

  const vitalConfig = {
    hr: { label: 'Heart Rate', color: '#fb7185', unit: 'bpm', domain: [60, 90] },
    hrv: { label: 'HRV', color: '#8b5cf6', unit: 'ms', domain: [30, 60] },
    temp: { label: 'Body Temp', color: '#f59e0b', unit: '°F', domain: [97.5, 99.5] },
    rr: { label: 'Resp. Rate', color: '#0ea5e9', unit: 'rpm', domain: [12, 20] },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Your Dashboard
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Care Plan Card */}
        <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl">📋</div>
            <h3 className="text-xl font-semibold text-gray-800">Care Plan</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white p-3 rounded-xl shadow-sm border border-rose-50">
              <div className="w-3 h-3 rounded-full bg-rose-400" /> [Step 1: Schedule ultrasound]
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white p-3 rounded-xl shadow-sm border border-rose-50">
              <div className="w-3 h-3 rounded-full bg-rose-400" /> [Step 2: Start prenatal vitamins]
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white p-3 rounded-xl shadow-sm border border-rose-50">
              <div className="w-3 h-3 rounded-full bg-rose-400" /> [Step 3: Drink 8 glasses of water]
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white p-3 rounded-xl shadow-sm border border-amber-50">
              <div className="w-3 h-3 rounded-full bg-amber-400" /> [Reminder 1: Blood pressure log]
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-white p-3 rounded-xl shadow-sm border border-amber-50">
              <div className="w-3 h-3 rounded-full bg-amber-400" /> [Reminder 2: Glucose test next week]
            </li>
          </ul>
        </div>

        {/* Vital Trends Card with Tabs */}
        <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">📈</div>
              <h3 className="text-xl font-semibold text-gray-800">Vital Trends</h3>
            </div>
          </div>

          {/* Metric Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(Object.keys(vitalConfig) as VitalKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveVital(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeVital === key
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {vitalConfig[key].label}
              </button>
            ))}
          </div>

          {/* Recharts Graph */}
          <div className="flex-1 w-full min-h-[250px] bg-white rounded-2xl p-4 border border-rose-50 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis 
                  domain={vitalConfig[activeVital].domain} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value} ${vitalConfig[activeVital].unit}`, vitalConfig[activeVital].label]}
                />
                <Line 
                  type="monotone" 
                  dataKey={activeVital} 
                  stroke={vitalConfig[activeVital].color} 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6 mt-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">⏳</div>
          <h3 className="text-xl font-semibold text-gray-800">Timeline</h3>
        </div>
        
        {/* Styled Timeline */}
        <div className="relative pt-4 pb-8 px-4">
          <div className="absolute left-0 right-0 h-1 bg-rose-100 rounded-full top-1/2 -translate-y-1/2" />
          <div className="relative flex justify-between items-center z-10">
            {/* Timeline Nodes */}
            {[1, 2, 3, 4, 5, 6, 7].map((node, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm ${i < 3 ? 'bg-rose-400' : 'bg-rose-200'}`} />
                <span className="text-xs text-gray-400 font-medium">Visit {node}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}