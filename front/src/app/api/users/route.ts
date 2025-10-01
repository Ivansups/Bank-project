import { createUser, deleteUser, getUser, updateUser } from "@/dal/user";


export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const res = await updateUser(body);
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to update user", { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const res = await deleteUser(body.id);
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to delete user", { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("id");

        if (!userId) {
            return new Response("User id is required", { status: 400 });
        }

        const res = await getUser(userId);
        return new Response(JSON.stringify(res), { status: 200 });
    } catch {
        return new Response("Failed to fetch user", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await createUser(body);
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to create user", { status: 500 });
    }
}