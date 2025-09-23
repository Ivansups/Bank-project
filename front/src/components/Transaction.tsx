import { TransactionProps } from "@/types/transaction";

export default function Transaction({ transaction, className = "" }: TransactionProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-gray-500">
          {formatDate(transaction.createdAt)}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {formatAmount(transaction.amount)}
        </div>
      </div>
      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>ID:</span>
          <span className="font-mono">{transaction.id.slice(0, 8)}...</span>
        </div>
      </div>
      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>User ID:</span>
          <span className="font-mono">{transaction.user_id.slice(0, 8)}...</span>
        </div>
      </div>
      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Type:</span>
          <span className="font-mono">{transaction.transaction_type}</span>
        </div>
      </div>
      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Updated:</span>
          <span>{formatDate(transaction.updatedAt)}</span>
        </div>
      </div>
      <div className="space-y-2 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Created:</span>
          <span>{formatDate(transaction.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}