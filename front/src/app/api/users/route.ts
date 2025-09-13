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
    } catch (error) {
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
    } catch (error) {
        return new Response("Failed to delete user", { status: 500 });
    }
}
