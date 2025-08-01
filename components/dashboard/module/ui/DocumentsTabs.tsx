import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

type Document = {
  name: any;
  status: string;
  date: string;
};

export const DocumentsTab: React.FC<{ documents: Document[] }> = ({ documents }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Documents</h2>
      <p className="text-slate-600 text-lg">Transaction documents and files</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc, index) => (
        <div key={index} className="backdrop-blur-xl bg-white/30 border-white/40 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <FileText className="h-5 w-5 mr-2 text-slate-600" />
            <h4 className="font-medium text-slate-900">{doc.name}</h4>
          </div>
          <div className="flex justify-between items-center text-sm">
            <Badge variant={doc.status === 'Complete' ? 'default' : 'secondary'}>
              {doc.status}
            </Badge>
            <span className="text-slate-600">{doc.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
