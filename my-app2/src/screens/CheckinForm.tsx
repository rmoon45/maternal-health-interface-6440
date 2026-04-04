export default function CheckInForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is where we will POST to the FHIR server later!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto border-2 border-slate-800 mt-6">
      <h2 className="text-3xl mb-8">Check-in Form</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col sm:flex-row sm:items-center text-lg">
          <span className="sm:w-1/2">How are you feeling today?</span>
          <input type="text" className="flex-1 border border-slate-800 p-2 mt-2 sm:mt-0" />
        </label>
        
        <label className="flex flex-col sm:flex-row sm:items-center text-lg">
          <span className="sm:w-1/2">Are there any new symptoms?</span>
          <input type="text" className="flex-1 border border-slate-800 p-2 mt-2 sm:mt-0" />
        </label>
        
        <label className="flex flex-col sm:flex-row sm:items-center text-lg">
          <span className="sm:w-1/2">Do you have any concerns?</span>
          <input type="text" className="flex-1 border border-slate-800 p-2 mt-2 sm:mt-0" />
        </label>

        <label className="flex flex-col sm:flex-row sm:items-center text-lg">
          <span className="sm:w-1/2">[Sample Question]</span>
          <input type="text" className="flex-1 border border-slate-800 p-2 mt-2 sm:mt-0" />
        </label>

        <label className="flex flex-col sm:flex-row sm:items-center text-lg">
          <span className="sm:w-1/2">[Sample Question]</span>
          <input type="text" className="flex-1 border border-slate-800 p-2 mt-2 sm:mt-0" />
        </label>

        <label className="flex flex-col sm:flex-row sm:items-center text-lg">
          <span className="sm:w-1/2">[Sample Question]</span>
          <input type="text" className="flex-1 border border-slate-800 p-2 mt-2 sm:mt-0" />
        </label>

        <div className="mt-4 flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2 bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
}