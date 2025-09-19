"use client";

import { useState, useMemo, useEffect } from "react";
import Transaction from "./Transaction";
import { Transaction as TransactionType } from "@/types/transaction";
import { LoadingSpinner, Card as UICard } from "@/components/ui";

interface SetTransactionsProps {
  transactions: TransactionType[];
  loading?: boolean;
  error?: string;
  onViewDetails?: (id: string) => void;
  onRepeat?: (id: string) => void;
}

export default function SetTransactions({ 
  transactions, 
  loading = false, 
  error, 
  onViewDetails, 
  onRepeat 
}: SetTransactionsProps) {



    // Фильтрация транзакций по поисковому запросу

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

    // Пагинация
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

    // Сброс страницы при изменении поиска
    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm]);
    

  const handleViewDetails = (id: string) => {
    onViewDetails?.(id);
  };

  const handleRepeat = (id: string) => {
    onRepeat?.(id);
  };

  return (
    <UICard 
      title="Транзакции"
      variant="elevated"
      className="w-full max-w-md mx-auto"
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
        <div className="flex flex-col gap-4">
          {currentTransactions.map((transaction: TransactionType) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              className="border rounded-md p-4 bg-gray-50 flex flex-col gap-1"
              onViewDetails={handleViewDetails}
              onRepeat={handleRepeat}
            />
          ))}
          {transactions.length === 0 && (
            <p className="text-sm text-gray-500">Транзакции не найдены.</p>
          )}
        </div>
      )}
    </UICard>
  );
}