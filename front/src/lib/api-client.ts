// Для серверных запросов используем API_URL (может быть localhost или backend), для клиентских - NEXT_PUBLIC_API_URL
const API_BASE_URL = typeof window === 'undefined' 
  ? (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return { data };
    } catch (error) {
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }
  
  // Методы для работы с пользователями
  async getUsers() {
    return this.request('/api/v1/users');
  }
  
  async getUser(id: string) {
    return this.request(`/api/v1/users/${id}`);
  }
  
  async createUser(userData: Record<string, unknown>) {
    return this.request('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  
  async updateUser(id: string, userData: Record<string, unknown>) {
    return this.request(`/api/v1/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }
  
  async deleteUser(id: string) {
    return this.request(`/api/v1/users/${id}`, {
      method: 'DELETE',
    });
  }
  
  // Синхронизация пользователя из Яндекс
  async syncYandexUser(userData: {
    yandex_id: string;
    email: string;
    name: string;
    avatar?: string;
  }) {
    return this.request('/api/v1/auth/sync', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  // Методы для работы с транзакциями
  async getTransactionsFromOneUser(userId: string) {
    return this.request(`/api/v1/transactions/one_user/${userId}`);
  }

  async getTransactionsFromAllUsers() {
    return this.request('/api/v1/transactions');
  }

  async createTransaction(transactionData: Record<string, unknown>) {
    return this.request('/api/v1/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  }

  // Методы для работы с картами
  async getCardsFromOneUser(userId: string) {
    return this.request(`/api/v1/cards?id=${userId}`);
  }

  async getCardsFromAllUsers() {
    return this.request('/api/v1/cards');
  }

  async createCard(cardData: Record<string, unknown>) {
    return this.request('/api/v1/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  async updateCard(cardId: string, cardData: Record<string, unknown>) {
    return this.request(`/api/v1/cards/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(cardData),
    });
  }

  async deleteCard(cardId: string) {
    return this.request(`/api/v1/cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Методы для работы с платежами
  async getPaymentsFromOneUser(userId: string) {
    return this.request(`/api/v1/payments?id=${userId}`);
  }

  async getPaymentsFromAllUsers() {
    return this.request('/api/v1/payments');
  }

  async createPayment(paymentData: Record<string, unknown>) {
    return this.request('/api/v1/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getDashboardFromOneUser(userId: string) {
    return this.request(`/api/v1/dashboards?id=${userId}`);
  }

  async checkUserDataIsValid(userId: string) {
    return this.request(`/api/v1/users/check-user-data-is-valid/${userId}`);
  }
}





export const apiClient = new ApiClient(API_BASE_URL);
