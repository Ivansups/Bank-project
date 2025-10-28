'use client'

import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui";
import LoginInterseptopClient from "./LoginInterseptopClient";

function LoginModalContent() {
  const handleYandexSignIn = () => {
    signIn("yandex", { callbackUrl: "/controlPanel" })
  }

  return (
    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-auto my-8 shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Войти в Bank App
        </h2>
        <p className="text-sm text-gray-600">
          Безопасный банковский сервис
        </p>
      </div>
      
      <Button
        onClick={handleYandexSignIn}
        variant="primary"
        size="lg"
        fullWidth={true}
        className="bg-red-600 hover:bg-red-700 focus:ring-red-500 mb-4"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Войти через Яндекс
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        Безопасная авторизация через Яндекс ID
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <LoginInterseptopClient>
      <LoginModalContent />
    </LoginInterseptopClient>
  )
}
