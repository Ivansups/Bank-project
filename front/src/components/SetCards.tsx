import { apiClient } from "@/lib/api-client";
import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";

interface Card {
  id: string;
  amount: number;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export default function SetCardsComponent() {
  const { data: session } = useSession();

  const [cards, setCards] = useState<Card[]>([]);
  const [loadingCards, setLoadingCards] = useState<boolean>(false);
  const [errorCards, setErrorCards] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(6);

  useEffect(() => {
    const getUserCards = async () => {
      try {
        setLoadingCards(true);
        setErrorCards("");
        const response = await apiClient.getCardsFromOneUser(session?.user?.id || "");
        if (response.error) {
          throw new Error(response.error);
        }
        setCards(response.data as Card[]);
      } catch (error) {
        console.error(error);
        setErrorCards("There are no cards");
      } finally {
        setLoadingCards(false);
      }
    };
    if (session?.user?.id) {
      getUserCards();
    }
  }, [session?.user?.id]);

  // Фильтрация карт по поисковому запросу
  const filteredCards = useMemo(() => {
    if (!searchTerm) return cards;
    return cards.filter(card => 
      card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.amount.toString().includes(searchTerm) ||
      new Date(card.createdAt).toLocaleDateString().includes(searchTerm)
    );
  }, [cards, searchTerm]);

  // Пагинация
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, endIndex);

  // Сброс страницы при изменении поиска
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Мои карты</h1>
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

      {loadingCards && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-500">Загрузка карт...</span>
        </div>
      )}

      {errorCards && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{errorCards}</p>
        </div>
      )}

      {!loadingCards && !errorCards && (
        <>
          {currentCards.length > 0 ? (
            <>
              {/* Сетка карточек */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCards.map((card: Card) => (
                  <div
                    key={card.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
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
                        <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                          Пополнить
                        </button>
                        <button className="flex-1 bg-gray-500 text-white py-2 px-3 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                          Детали
                        </button>
                      </div>
                    </div>
                  </div>
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
                {searchTerm ? 'Карты не найдены' : 'У вас пока нет карт'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? 'Попробуйте изменить поисковый запрос'
                  : 'Создайте свою первую карту для начала работы'
                }
              </p>
              {!searchTerm && (
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Создать карту
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}