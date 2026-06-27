export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🧸 Parent Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-gray-500 font-medium">Current Learning Level</h2>
          <p className="text-3xl font-black text-orange-500 mt-2">Level 2 (Phrases)</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-gray-500 font-medium">Current Chatbot Mode</h2>
          <p className="text-3xl font-black text-purple-500 mt-2">Engagement Mode</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-gray-500 font-medium">Emotional State (SEL)</h2>
          <p className="text-3xl font-black text-emerald-500 mt-2">Curious & Confident ⭐</p>
        </div>
      </div>
    </div>
  );
}