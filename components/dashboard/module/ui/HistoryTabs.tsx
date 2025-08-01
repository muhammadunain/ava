import { HistoryEntry } from "@/types";

export const HistoryTab: React.FC<{ history: HistoryEntry[] }> = ({ history }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Transaction History</h2>
      <p className="text-slate-600 text-lg">Activity log and updates</p>
    </div>
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div key={index} className="backdrop-blur-xl bg-white/30 border-white/40 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <p className="text-slate-900 font-medium">{entry.action}</p>
            <span className="text-sm text-slate-600">{entry.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);