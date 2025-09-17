"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { signOut } from "@/lib/auth-client"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-xl font-semibold text-gray-900">Bank App</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {session.isAdmin && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Администратор
                </span>
              )}
              <span className="text-sm text-gray-700">
                Здравствуйте, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="max-w-4xl w-full px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Панель управления
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Здесь будет основная функциональность банковского приложения
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Баланс
                </h3>
                <p className="text-3xl font-bold text-indigo-600">₽0.00</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Транзакции
                </h3>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Карты
                </h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
            </div>
            
            {session.isAdmin && (
              <div className="mt-12 max-w-2xl mx-auto">
                <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-900 mb-4">
                    Панель администратора
                  </h3>
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
