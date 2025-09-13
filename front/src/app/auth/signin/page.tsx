"use client"

import { signIn } from "@/lib/auth-client"

export default function SignInPage() {
  const handleYandexSignIn = () => {
    signIn("yandex", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Добро пожаловать в Bank App
          </h2>
          <p className="text-gray-600 mb-8">
            Войдите через Яндекс для доступа к вашему банковскому аккаунту
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleYandexSignIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Войти через Яндекс
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Безопасная авторизация через Яндекс ID
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Безопасность
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Ваши данные защищены современными методами шифрования. 
                  Мы не храним пароли и используем OAuth 2.0 для безопасной авторизации.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
