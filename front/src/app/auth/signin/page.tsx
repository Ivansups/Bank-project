"use client"

import { signIn } from "@/lib/auth-client"
import { AuthLayout } from "@/components/layout";
import { Button, Card } from "@/components/ui";

export default function SignInPage() {
  const handleYandexSignIn = () => {
    signIn("yandex", { callbackUrl: "/dashboard" })
  }

  const yandexIcon = (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );

  return (
    <AuthLayout 
      title="Добро пожаловать в Bank App"
      subtitle="Войдите через Яндекс для доступа к вашему банковскому аккаунту"
      showBackButton={true}
      backButtonHref="/"
    >
      <div className="space-y-6">
        <Button
          onClick={handleYandexSignIn}
          variant="primary"
          size="lg"
          fullWidth={true}
          icon={yandexIcon}
          iconPosition="left"
          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
        >
          Войти через Яндекс
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Безопасная авторизация через Яндекс ID
          </p>
        </div>

        <Card 
          variant="filled"
          className="bg-blue-50 border-blue-200"
        >
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
        </Card>
      </div>
    </AuthLayout>
  )
}
