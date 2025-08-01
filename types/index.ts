export interface LayoutProps {
    children:React.ReactNode
}

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  description?: string;
}

export interface TransactionDetails {
  address: string;
  district: string;
  propertyType: string;
  squareFootage: string;
  purchasePrice: string;
  downPayment: string;
  loanAmount: string;
  closingDate: string;
}

export interface Document {
  name: string;
  status: 'Complete' | 'Pending' | 'In Progress';
  date: string;
}

export interface HistoryEntry {
  action: string;
  date: string;
}