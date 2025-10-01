import { getUsers } from "@/dal/user";

export async function GET() {
    try {
        const res = await getUsers();
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to fetch users", { status: 500 });
    }
}