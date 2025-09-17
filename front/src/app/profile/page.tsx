"use client"

import SetTransactionsComponent from "@/components/SetTransactions"
import SetCardsComponent from "@/components/SetCards"    
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen"   >
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
    </div>;
  }



  return (
    <div className="flex flex-col gap-4 justify-center items-center py-12">
      <h1 className="text-5xl font-bold text-white-800">Profile</h1>
      <p className="text-4xl text-white-500 font-bold">Добро пожаловать, {session?.user?.name || "User"}</p>
      <SetTransactionsComponent />
      <SetCardsComponent />
    </div>
  )
}