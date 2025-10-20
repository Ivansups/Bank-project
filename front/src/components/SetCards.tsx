"use client";

import { useState, useMemo, useEffect } from "react";
import Card from "./Card";
import { Card as CardType } from "@/types/card";
import { LoadingSpinner, Button, Card as UICard } from "@/components/ui";

interface SetCardsProps {
  cards: CardType[];
  loading?: boolean;
  error?: string;
  onTopUp?: (cardId: string) => void;
  onDetails?: (cardId: string) => void;
}

export default function SetCards({ 
  cards, 
  loading = false, 
  error, 
  onTopUp, 
  onDetails 
}: SetCardsProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(6);


  const filteredCards = useMemo(() => {
    if (!searchTerm) return cards;
    return cards.filter(card => 
      card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.amount.toString().includes(searchTerm) ||
      new Date(card.createdAt).toLocaleDateString().includes(searchTerm)
    );
  }, [cards, searchTerm]);

  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTopUp = (cardId: string) => {
    onTopUp?.(cardId);
  };

  const handleDetails = (cardId: string) => {
    onDetails?.(cardId);
  };

  return (
    <UICard 
      title="Мои счета"
      variant="elevated"
      className="w-full max-w-6xl mx-auto"
      header={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по картам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">
              {filteredCards.length} из {cards.length} карт
            </div>
          </div>
        </div>
      }
    >
      {loading && (
        <LoadingSpinner 
          size="lg" 
          color="blue" 
          text="Загрузка карт..." 
        />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {currentCards.length > 0 ? (
            <>
              {/* Сетка карточек */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCards.map((card: CardType) => (
                  <Card
                    key={card.id}
                    card={card}
                    onTopUp={handleTopUp}
                    onDetails={handleDetails}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'Счета не найдены' : 'У вас пока нет счетов'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? 'Попробуйте изменить поисковый запрос'
                  : 'Создайте свою первую карту для начала работы'
                }
              </p>
              {!searchTerm && (
                <Button variant="primary">
                  Создать карту
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </UICard>
  );
}