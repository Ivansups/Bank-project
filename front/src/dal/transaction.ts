'use server'

import { apiClient } from "@/lib/api-client";

import { Transaction } from "@/types/transaction";

export async function getTransactionsOneUser(userId?: string): Promise<Transaction[]> {
    if (userId) {
        try {
            const response = await apiClient.getTransactionsFromOneUser(userId);
            return response.data as Transaction[];
        } catch (error) {
            console.error(error);
            return [];
        }
    } else {
        try {
            const response = await apiClient.getTransactionsFromAllUsers();
            return response.data as Transaction[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export async function getTransactionsAllUsers(): Promise<Transaction[]>{
    try {
        const response = await apiClient.getTransactionsFromAllUsers();
        return response.data as Transaction[]
    } catch (error) {
        console.error(error);
        return[]
    }
}

export async function createTransaction(transaction: Transaction): Promise<Transaction> {
    try {
        const response = await apiClient.createTransaction(transaction as unknown as Record<string, unknown>);
        return response.data as Transaction;
    } catch (error) {
        console.error(error);
        return {} as Transaction;
    }
}
