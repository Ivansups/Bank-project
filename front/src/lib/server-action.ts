import { Card } from "@/types/card";
import { Transaction } from "@/types/transaction";
import { DashboardStats } from "@/types/dashboard";
import { apiClient } from "./api-client";

export const getUserCards = async (userId: string): Promise<Card[]> =>  {
    try {
        const response = await apiClient.getCardsFromOneUser(userId);
        return response.data as Card[];
    } catch (error) {
        console.error(error);
        return [] as Card[];
    }
};

export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
    try {
        const response = await apiClient.getTransactionsFromOneUser(userId);
        return response.data as Transaction[];
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    try {
        // Здесь ваш API вызов
        return {
            balance: 0,
            transactionsCount: 0,
            cardsCount: 0
        };
    } catch (error) {
        console.error(error);
        return {
            balance: 0,
            transactionsCount: 0,
            cardsCount: 0
        };
    }
};

export const getUserDashboard = async (userId: string): Promise<DashboardStats> => {
    try {
        const response = await apiClient.getDashboardFromOneUser(userId);
        return response.data as DashboardStats;
    } catch (error) {
        console.error(error);
        return {
            balance: 0,
            transactionsCount: 0,
            cardsCount: 0
        };
    }
};