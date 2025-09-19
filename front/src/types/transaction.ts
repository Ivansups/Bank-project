export interface Transaction {
  id: string;
  amount: number;
  user_id: string;
  transaction_type: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionProps {
  transaction: Transaction;
  className?: string;
  onViewDetails?: (id: string) => void;
  onRepeat?: (id: string) => void;
}
