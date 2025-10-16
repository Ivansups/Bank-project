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

export interface UserUpdate {
    phone: string;
    age: number;
    gender: string;
    passport_series: string;
    passport_number: string;
    place_of_registration: string;
    place_of_work: string;
    position: string;
    cout_of_credits: number;
    count_of_cards: number;
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

export async function updateUser(userId: string, userData: Partial<UserUpdate> = {}): Promise<User> {
    await requireAuth();
    try {
        const response = await apiClient.updateUser(userId, userData as unknown as Record<string, unknown>);
        return response.data as User;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error("Failed to update user data");
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

export async function checkUserDataIsValid(userId: string): Promise<boolean> {
    await requireAuth();
    try {
        const response = await apiClient.checkUserDataIsValid(userId);
        return response.data as boolean;
    } catch (error) {
        console.error(error);
        return false;
    }
}