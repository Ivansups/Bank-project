'use server'

import { apiClient } from "@/lib/api-client";
import { requireAuth, requireAdmin } from "@/lib/auth-utils";
import { Transaction } from "@/types/transaction";

export async function getTransactions(userId?: string): Promise<Transaction[]> {
    if (userId) {
        await requireAuth();
        try {
            const response = await apiClient.getTransactionsFromOneUser(userId);
            return response.data as Transaction[];
        } catch (error) {
            console.error(error);
            return [];
        }
    } else {
        await requireAdmin();
        try {
            const response = await apiClient.getTransactionsFromAllUsers();
            return response.data as Transaction[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export async function createTransaction(transaction: Transaction): Promise<Transaction> {
    await requireAuth();
    try {
        const response = await apiClient.createTransaction(transaction as unknown as Record<string, unknown>);
        return response.data as Transaction;
    } catch (error) {
        console.error(error);
        return {} as Transaction;
    }
}
