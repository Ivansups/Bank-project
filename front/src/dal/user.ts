'use server'

import { apiClient } from "@/lib/api-client";
import { requireAuth, requireAdmin } from "@/lib/auth-utils";
import { Card } from "@/types/card";
import { Transaction } from "@/types/transaction";
import { DashboardStats } from "@/types/dashboard";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export async function getUser(userId: string): Promise<User & { cards: Card[]; transactions: Transaction[]; dashboard: DashboardStats }> {
    await requireAuth();
    try {
        const [userResponse, cardsResponse, transactionsResponse, dashboardResponse] = await Promise.all([
            apiClient.getUser(userId),
            apiClient.getCardsFromOneUser(userId),
            apiClient.getTransactionsFromOneUser(userId),
            apiClient.getDashboardFromOneUser(userId),
        ]);

        return {
            ...(userResponse.data as User),
            cards: (cardsResponse.data as Card[]) || [],
            transactions: (transactionsResponse.data as Transaction[]) || [],
            dashboard: (dashboardResponse.data as DashboardStats) || { balance: 0, transactionsCount: 0, cardsCount: 0 },
        };
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user data");
    }
}

export async function getUsers(): Promise<User[]>{
    await requireAdmin();
    try {
        const response = await apiClient.getUsers();
        return response.data as User[];
    } catch (error) {
        console.error(error);
        return [] as User[];
    }
}

export async function createUser(user: User): Promise<User>{
    await requireAdmin();
    try {
        const response = await apiClient.createUser(user as unknown as Record<string, unknown>);
        return response.data as User;
    } catch (error) {
        console.error(error);
        return {
            id: "",
            name: "",
            email: "",
            avatar: "",
            isAdmin: false,
            createdAt: "",
            updatedAt: ""
        } as User;
    }
}

export async function updateUser(user: User): Promise<User>{
    await requireAuth();
    try {
        const response = await apiClient.updateUser(user.id, user as unknown as Record<string, unknown>);
        return response.data as User;
    } catch (error) {
        console.error(error);
        return {
            id: "",
            name: "",
            email: "",
            avatar: "",
            isAdmin: false,
            createdAt: "",
            updatedAt: ""
        } as User;
    }
}

export async function deleteUser(userId: string): Promise<void>{
    await requireAdmin();
    try {
        await apiClient.deleteUser(userId);
    } catch (error) {
        console.error(error);
    }
}