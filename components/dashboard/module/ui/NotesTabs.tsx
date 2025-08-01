import { Button } from "@/components/ui/button";

export const NotesTab: React.FC<{
  notes: string;
  onNotesChange: (notes: string) => void;
  onSaveNotes: () => void;
}> = ({ notes, onNotesChange, onSaveNotes }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Notes</h2>
      <p className="text-slate-600 text-lg">Transaction notes and communications</p>
    </div>
    <div className="backdrop-blur-xl bg-white/30 border-white/40 rounded-xl p-6">
      <textarea 
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full h-64 p-4 bg-white/50 border border-white/60 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
        placeholder="Add your transaction notes here..."
      />
      <Button onClick={onSaveNotes} className="mt-4 bg-slate-800 hover:bg-slate-900 text-white">
        Save Notes
      </Button>
    </div>
  </div>
);