'use server'

import { apiClient } from "@/lib/api-client";
import { requireAuth, requireAdmin } from "@/lib/auth-utils";
import { Card } from "@/types/card";

export async function getCards(userId?: string): Promise<Card[]> {
    if (userId) {
        await requireAuth();
        try {
            const response = await apiClient.getCardsFromOneUser(userId);
            return response.data as Card[];
        } catch (error) {
            console.error(error);
            return [];
        }
    } else {
        await requireAdmin();
        try {
            const response = await apiClient.getCardsFromAllUsers();
            return response.data as Card[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}

export async function createCard(card: Card): Promise<Card> {
    await requireAuth();
    try {
        const response = await apiClient.createCard(card as unknown as Record<string, unknown>);
        return response.data as Card;
    } catch (error) {
        console.error(error);
        return {} as Card;
    }
}

export async function updateCard(card: Card): Promise<Card> {
    await requireAuth();
    try {
        const response = await apiClient.updateCard(card.id, card as unknown as Record<string, unknown>);
        return response.data as Card;
    } catch (error) {
        console.error(error);
        return {} as Card;
    }
}

export async function deleteCard(cardId: string): Promise<void> {
    await requireAuth();
    try {
        await apiClient.deleteCard(cardId);
    } catch (error) {
        console.error(error);
    }
}