export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${body.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) {
            return new Response("Failed to update user", { status: 500 });
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch {
        return new Response("Failed to update user", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${body.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!res.ok) {
            return new Response("Failed to delete user", { status: 500 });
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch {
        return new Response("Failed to delete user", { status: 500 });
    }
}

import { getUserCards, getUserTransactions, getUserDashboard } from "@/lib/server-action";

export async function GET(request: Request) {
    try {
        // Получаем id пользователя из query параметров
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("id");

        if (!userId) {
            return new Response("User id is required", { status: 400 });
        }

        // Получаем данные пользователя
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            return new Response("Failed to fetch user", { status: 500 });
        }

        const user = await res.json();

        // Получаем связанные данные пользователя
        const [cards, transactions, dashboard] = await Promise.all([
            getUserCards(user.id),
            getUserTransactions(user.id),
            getUserDashboard(user.id),
        ]);

        const userWithAllData = {
            ...user,
            cards,
            transactions,
            dashboard,
        };

        return new Response(JSON.stringify(userWithAllData), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch user with all data", { status: 500 });
    }
}
