  "use client"

import React from "react"
import { useSession } from "next-auth/react"
import { signOut } from "@/lib/auth-client"
import { DashboardLayout } from "@/components/layout";
import { Card, LoadingSpinner } from "@/components/ui";

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <DashboardLayout>
        <LoadingSpinner 
          size="xl" 
          color="blue" 
          text="Загрузка панели управления..." 
          fullScreen={true}
        />
      </DashboardLayout>
    )
  }

  if (!session) {
    return null
  }

  const sidebarItems = [
    { label: "Главная", href: "/dashboard", active: true },
    { label: "Профиль", href: "/profile" },
    { label: "Транзакции", href: "/transactions" },
    { label: "Карты", href: "/cards" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <DashboardLayout 
      user={{
        name: session.user?.name || undefined,
        isAdmin: session.isAdmin || false
      }}
      onSignOut={handleSignOut}
      showSidebar={true}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Панель управления
          </h2>
          <p className="text-gray-600 text-lg">
            Здесь будет основная функциональность банковского приложения
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            title="Баланс"
            variant="elevated"
            className="text-center"
          >
            <p className="text-3xl font-bold text-indigo-600">₽0.00</p>
          </Card>
          
          <Card 
            title="Транзакции"
            variant="elevated"
            className="text-center"
          >
            <p className="text-3xl font-bold text-green-600">0</p>
          </Card>
          
          <Card 
            title="Карты"
            variant="elevated"
            className="text-center"
          >
            <p className="text-3xl font-bold text-blue-600">0</p>
          </Card>
        </div>
        
        {session.isAdmin && (
          <Card 
            title="Панель администратора"
            variant="outlined"
            className="border-red-200 bg-red-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-gray-900 mb-2">Пользователи</h4>
                <p className="text-2xl font-bold text-red-600">0</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium text-gray-900 mb-2">Активные сессии</h4>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
