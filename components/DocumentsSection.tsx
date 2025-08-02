import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download, Eye, Trash2, Check } from "lucide-react";
import AddDocumentForm from "./dialog/DocumentDialog";

export function DocumentsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Documents</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search documents" 
              className="pl-10 w-80"
            />
          </div>
          <AddDocumentForm/>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground line-through">
                Sales Contract (Residential Improved Property) (C).pdf
              </h3>
              <p className="text-sm text-muted-foreground">Due: 07/29/2025</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}