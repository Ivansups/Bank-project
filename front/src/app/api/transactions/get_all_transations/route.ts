import { getTransactions } from "@/dal/transaction";

export async function GET() {
    try {
        const res = await getTransactions();
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to fetch transactions", { status: 500 });
    }
}