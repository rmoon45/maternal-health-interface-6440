import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export interface VitalDataPoint {
  week: string;
  hr?: number;
  hrv?: number;
  temp?: number;
  rr?: number;
  systolic?: number;
  diastolic?: number;
}

export const defaultVitalData: VitalDataPoint[] = [
  { week: 'Wk 4',  hr: 68, hrv: 52, temp: 98.2, rr: 14.5, systolic: 112, diastolic: 70 },
  { week: 'Wk 8',  hr: 70, hrv: 50, temp: 98.6, rr: 14.8, systolic: 114, diastolic: 72 },
  { week: 'Wk 12', hr: 72, hrv: 48, temp: 98.5, rr: 15.0, systolic: 116, diastolic: 73 },
  { week: 'Wk 16', hr: 74, hrv: 45, temp: 98.4, rr: 15.2, systolic: 118, diastolic: 74 },
  { week: 'Wk 20', hr: 76, hrv: 42, temp: 98.4, rr: 15.3, systolic: 120, diastolic: 76 },
  { week: 'Wk 24', hr: 78, hrv: 40, temp: 98.3, rr: 15.5, systolic: 122, diastolic: 78 },
  { week: 'Wk 28', hr: 80, hrv: 38, temp: 98.3, rr: 15.8, systolic: 124, diastolic: 79 },
  { week: 'Wk 32', hr: 81, hrv: 36, temp: 98.2, rr: 16.0, systolic: 126, diastolic: 80 },
  { week: 'Wk 36', hr: 82, hrv: 35, temp: 98.2, rr: 16.2, systolic: 128, diastolic: 82 },
  { week: 'Wk 40', hr: 83, hrv: 34, temp: 98.1, rr: 16.5, systolic: 130, diastolic: 84 },
];

type VitalKey = 'hr' | 'hrv' | 'temp' | 'rr' | 'bp';

interface DashboardProps {
  vitalData: VitalDataPoint[];
}

export default function Dashboard({ vitalData }: DashboardProps) {
  const [activeVital, setActiveVital] = useState<VitalKey>('hr');

  const vitalConfig: Record<Exclude<VitalKey, 'bp'>, { label: string; color: string; unit: string; domain: [number, number] }> = {
    hr:   { label: 'Heart Rate',  color: '#fb7185', unit: 'bpm', domain: [60, 90] },
    hrv:  { label: 'HRV',         color: '#8b5cf6', unit: 'ms',  domain: [30, 60] },
    temp: { label: 'Body Temp',   color: '#f59e0b', unit: '°F',  domain: [97.5, 99.5] },
    rr:   { label: 'Resp. Rate',  color: '#0ea5e9', unit: 'rpm', domain: [12, 20] },
  };

  const bpConfig = { label: 'Blood Pressure', systolicColor: '#f43f5e', diastolicColor: '#fb923c', unit: 'mmHg', domain: [55, 160] as [number, number] };

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
          <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1">
            {(Object.keys(vitalConfig) as Exclude<VitalKey, 'bp'>[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveVital(key)}
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                  activeVital === key
                    ? "bg-gray-800 text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {vitalConfig[key].label}
              </button>
            ))}
            {/* Blood Pressure Tab */}
            <button
              onClick={() => setActiveVital('bp')}
              className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                activeVital === 'bp'
                  ? "bg-gray-800 text-white shadow-md"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {bpConfig.label}
            </button>
          </div>

          {/* Chart */}
          <div className="flex-1 w-full min-h-[250px] bg-white rounded-2xl p-4 border border-rose-50 shadow-inner">
            <ResponsiveContainer width="100%" height="100%">
              {activeVital === 'bp' ? (
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
                    domain={bpConfig.domain}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                  />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (!active || !payload) return null;
                      const sys = payload.find((p: any) => p.dataKey === 'systolic');
                      const dia = payload.find((p: any) => p.dataKey === 'diastolic');
                      return (
                        <div style={{ borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', background: '#fff', padding: '10px 14px', fontSize: 12 }}>
                          <p style={{ marginBottom: 6, fontWeight: 600, color: '#64748b' }}>{label}</p>
                          {sys && <p style={{ color: bpConfig.systolicColor, margin: '2px 0' }}>Systolic: {sys.value} mmHg</p>}
                          {dia && <p style={{ color: bpConfig.diastolicColor, margin: '2px 0' }}>Diastolic: {dia.value} mmHg</p>}
                        </div>
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    stroke={bpConfig.diastolicColor}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    stroke={bpConfig.systolicColor}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                </LineChart>
              ) : (
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
                    domain={vitalConfig[activeVital as Exclude<VitalKey, 'bp'>].domain}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number | string | undefined) => [
                      `${value ?? ''} ${vitalConfig[activeVital as Exclude<VitalKey, 'bp'>].unit}`,
                      vitalConfig[activeVital as Exclude<VitalKey, 'bp'>].label,
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey={activeVital}
                    stroke={vitalConfig[activeVital as Exclude<VitalKey, 'bp'>].color}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1000}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Blood pressure legend */}
          {activeVital === 'bp' && (
            <div className="flex gap-4 mt-3 justify-center">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: bpConfig.systolicColor }} />
                Systolic
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-3 h-0.5 rounded" style={{ backgroundColor: bpConfig.diastolicColor }} />
                Diastolic
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6 mt-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">⏳</div>
          <h3 className="text-xl font-semibold text-gray-800">Timeline</h3>
        </div>

        <div className="relative pt-4 pb-8 px-4">
          <div className="absolute left-0 right-0 h-1 bg-rose-100 rounded-full top-1/2 -translate-y-1/2" />
          <div className="relative flex justify-between items-center z-10">
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