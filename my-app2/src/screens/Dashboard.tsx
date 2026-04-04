export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl mb-6">Dashboard</h2>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Care Plan Box */}
        <div className="flex-1 border-2 border-slate-800 p-5 min-h-[250px]">
          <h3 className="text-xl mb-3">Care Plan</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>[Step 1]</li>
            <li>[Step 2]</li>
            <li>[Step 3]</li>
            <li>[Reminder 1]</li>
            <li>[Reminder 2]</li>
          </ul>
        </div>

        {/* Vital Trends Box */}
        <div className="flex-1 border-2 border-slate-800 p-5 min-h-[250px]">
          <h3 className="text-xl">Vital Trends</h3>
          <p className="text-gray-500 mt-16 text-center">[Graph of Vital Trends]</p>
        </div>
      </div>

      {/* Timeline Box */}
      <div className="border-2 border-slate-800 p-5 min-h-[150px]">
        <h3 className="text-xl mb-8">Timeline</h3>
        <div className="border-b border-slate-800 relative h-8">
          {/* Faking the timeline tick marks from the mockup */}
          <span className="border-l border-slate-800 h-4 absolute left-[10%] bottom-0"></span>
          <span className="border-l border-slate-800 h-4 absolute left-[25%] bottom-0"></span>
          <span className="border-l border-slate-800 h-4 absolute left-[40%] bottom-0"></span>
          <span className="border-l border-slate-800 h-4 absolute left-[50%] bottom-0"></span>
          <span className="border-l border-slate-800 h-4 absolute left-[65%] bottom-0"></span>
          <span className="border-l border-slate-800 h-4 absolute left-[80%] bottom-0"></span>
          <span className="border-l border-slate-800 h-4 absolute left-[90%] bottom-0"></span>
        </div>
      </div>
    </div>
  );
}