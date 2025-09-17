export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("id");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/one_user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        if (!res.ok) {
            return new Response("Failed to fetch transactions", { status: 500 });
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch {
        return new Response("Failed to fetch transactions", { status: 500 });
    }
}