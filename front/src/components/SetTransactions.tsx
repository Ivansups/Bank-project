"use client";

import { useState, useMemo, useEffect } from "react";
import Transaction from "./Transaction";
import { Transaction as TransactionType } from "@/types/transaction";
import { LoadingSpinner, Button, Card as UICard } from "@/components/ui";

interface SetTransactionsProps {
  transactions: TransactionType[];
  loading?: boolean;
  error?: string;
  onViewDetails?: (id: string) => void;
  onRepeat?: (id: string) => void;
  onCreateTransfer?: () => void;
}

export default function SetTransactions({ 
  transactions, 
  loading = false, 
  error, 
  onViewDetails, 
  onRepeat,
  onCreateTransfer
}: SetTransactionsProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactionsPerPage] = useState<number>(6);

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions;
    return transactions.filter(transaction =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm) ||
      transaction.transaction_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(transaction.createdAt).toLocaleDateString().includes(searchTerm)
    );
  }, [transactions, searchTerm]);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDetails = (id: string) => {
    onViewDetails?.(id);
  };

  const handleRepeat = (id: string) => {
    onRepeat?.(id);
  };

  const handleCreateTransfer = () => {
    onCreateTransfer?.();
  };

  return (
    <UICard 
      title="Транзакции"
      variant="elevated"
      className="w-full max-w-6xl mx-auto"
      header={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по транзакциям..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">
              {filteredTransactions.length} из {transactions.length} транзакций
            </div>
          </div>
          <Button variant="primary" onClick={handleCreateTransfer}>
            Сделать перевод
          </Button>
        </div>
      }
    >
      {loading && (
        <LoadingSpinner 
          size="lg" 
          color="blue" 
          text="Загрузка транзакций..." 
        />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {currentTransactions.length > 0 ? (
            <>
              {/* Список транзакций */}
              <div className="space-y-4 mb-8">
                {currentTransactions.map((transaction: TransactionType) => (
                  <Transaction
                    key={transaction.id}
                    transaction={transaction}
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
                    onViewDetails={handleViewDetails}
                    onRepeat={handleRepeat}
                  />
                ))}
              </div>

              {/* Пагинация */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Назад
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 border rounded-lg text-sm ${
                        currentPage === page
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Вперед
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'Транзакции не найдены' : 'Транзакции не найдены'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? 'Попробуйте изменить поисковый запрос'
                  : 'У вас пока нет транзакций'
                }
              </p>
              {!searchTerm && (
                <Button variant="primary" onClick={handleCreateTransfer}>
                  Сделать первую транзакцию
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </UICard>
  );
}