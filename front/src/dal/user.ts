'use server'

import { apiClient } from "@/lib/api-client";
import { requireAuth, requireAdmin } from "@/lib/auth-utils";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export async function getUser(userId: string): Promise<User> {
    await requireAuth();
    try {
        const response = await apiClient.getUser(userId);
        return response.data as User;
    } catch (error) {
        console.error(error);
        return {} as User;
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
        return {} as User;
    }
}

export async function updateUser(user: User): Promise<User>{
    await requireAuth();
    try {
        const response = await apiClient.updateUser(user.id, user as unknown as Record<string, unknown>);
        return response.data as User;
    } catch (error) {
        console.error(error);
        return {} as User
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