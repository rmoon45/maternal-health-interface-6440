import { useState } from "react";

export default function CheckinForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-7xl mb-6">🌷</div>
        <h2 className="text-3xl font-bold text-rose-700 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Check-in Complete
        </h2>
        <p className="text-rose-500 text-lg mb-8">Thank you for updating your health log today.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 rounded-xl bg-rose-400 hover:bg-rose-500 text-white font-semibold shadow-md transition-all"
        >
          Submit Another Entry
        </button>
      </div>
    );
  }

  const inputStyle = "w-full rounded-xl border border-rose-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-300 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 transition-all shadow-sm";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        Weekly Check-in
      </h2>
      <p className="text-gray-500 text-sm mb-8">Please tell us how you're doing so we can keep your records up to date.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/80 backdrop-blur rounded-3xl border border-white shadow-sm p-6 space-y-6">
          
          <div>
            <label className={labelStyle}>How are you feeling today?</label>
            <input type="text" placeholder="I'm feeling..." className={inputStyle} required />
          </div>

          <div>
            <label className={labelStyle}>Are there any new symptoms?</label>
            <input type="text" placeholder="Describe any new symptoms..." className={inputStyle} />
          </div>

          <div>
            <label className={labelStyle}>Do you have any concerns?</label>
            <input type="text" placeholder="Any concerns to report?" className={inputStyle} />
          </div>

          <div className="pt-4 border-t border-rose-100">
            <h4 className="text-sm font-bold text-rose-800 mb-4 uppercase tracking-wider">Additional Questions</h4>
            <div className="space-y-6">
              <div>
                <label className={labelStyle}>[Sample Question 1]</label>
                <input type="text" placeholder="..." className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>[Sample Question 2]</label>
                <input type="text" placeholder="..." className={inputStyle} />
              </div>
              <div>
                <label className={labelStyle}>[Sample Question 3]</label>
                <input type="text" placeholder="..." className={inputStyle} />
              </div>
            </div>
          </div>
        </div>

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