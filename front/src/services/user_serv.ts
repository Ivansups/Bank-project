import { getUser } from "@/dal/user";
import { checkAuth } from "@/lib/auth-utils";
import { redirect } from "next/navigation"
import { checkUserDataIsValid } from "@/dal/user"

export async function getUserDataServ(userId: string) {
    const session = await checkAuth()
    if (!session.isAuthenticated){
        redirect("/")
    }
    try {
        const response = await getUser(userId);
        return response
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function checkIsDataValidServ(userId: string) {
    try {
        const response = await checkUserDataIsValid(userId)
        return response
    } catch (e) {
        console.error(e)
        throw e
    }
}
