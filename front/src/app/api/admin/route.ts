export async function GET(request: Request, { params }: { params: Promise<Record<string, never>> }) {
    try {
        await params
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            next: {
                revalidate: 0,
            },
        })
        if (!res.ok) {
            return new Response("Failed to fetch admin", { status: 500 });
        }
        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch {
        return new Response("Failed to fetch admin", { status: 500 });
    }
}