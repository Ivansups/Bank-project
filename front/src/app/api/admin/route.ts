export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${params.id}`, {
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
    } catch (error) {
        return new Response("Failed to fetch admin", { status: 500 });
    }
}