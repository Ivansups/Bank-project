import { CardProps } from "@/types/card";

export default function Card({ card, onTopUp, onDetails, className = "" }: CardProps) {
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
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="text-xs text-gray-500">
                    {formatDate(card.createdAt)}
                </div>
            </div>
            
            <div className="mb-4">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                    {formatAmount(card.amount)}
                </div>
                <div className="text-sm text-gray-600">
                    Баланс карты
                </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500">
                <div className="flex justify-between">
                    <span>ID:</span>
                    <span className="font-mono">{card.id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between">
                    <span>Обновлено:</span>
                    <span>{formatDate(card.updatedAt)}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex gap-2">
                    <button 
                        onClick={() => onTopUp(card.id)}
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                    >
                        Пополнить
                    </button>
                    <button 
                        onClick={() => onDetails(card.id)}
                        className="flex-1 bg-gray-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                    >
                        Детали
                    </button>
                </div>
            </div>
        </div>
    );
}