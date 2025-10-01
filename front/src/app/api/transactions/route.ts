import { createTransaction, getTransactions } from "@/dal/transaction";

export async function GET() {
    try {
        const res = await getTransactions();
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to fetch transactions", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await createTransaction(body);
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to create transaction", { status: 500 });
    }
}
