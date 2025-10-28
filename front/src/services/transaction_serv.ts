import { redirect } from "next/navigation"
import { getTransactionsOneUser, createTransaction, getTransactionsAllUsers} from "@/dal/transaction"
import { checkAuth } from "@/lib/auth-utils";
import { Transaction } from "@/types/transaction";

export async function getUserTransactionsServ(userId: string) {
    const session = await checkAuth()
    if (!session.isAuthenticated){
        redirect("/")
    }

    try {
        const transactions = await getTransactionsOneUser(userId)
        return transactions
    } catch (e){
        console.log(e)
        throw e
    }
}

export async function getAllTransactionsServ() {
    const session =  await checkAuth()
    if (!session.isAuthenticated || !session.isAdmin){
        console.log("No admin permission!")
        redirect("/")
    }

    try {
        const transactions = await getTransactionsAllUsers()
        return transactions
    } catch (e){
        console.log(e)
        throw e
    }
}

export async function createTransactionServ(transaction: Transaction) {
    const session =  await checkAuth()
    if (!session.isAuthenticated){
        console.log("Unauthtorized")
        redirect("/")
    }

    try {
        const transactions = await createTransaction(transaction)
        return transactions
    } catch (e){
        console.log(e)
        throw e
    }
}