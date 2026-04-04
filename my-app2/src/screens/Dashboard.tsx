export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Your Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* Vital Trends Card */}
        <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl">📈</div>
            <h3 className="text-xl font-semibold text-gray-800">Vital Trends</h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-rose-200 rounded-2xl bg-white min-h-[250px]">
            <p className="text-gray-400 text-sm font-medium">[Graph of Vital Trends Placeholder]</p>
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