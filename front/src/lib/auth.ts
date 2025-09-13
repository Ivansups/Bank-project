import NextAuth from "next-auth"
import Yandex from "next-auth/providers/yandex"
import { apiClient } from "./api-client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  useSecureCookies: false, // Для локальной разработки
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false, // Для локальной разработки
      },
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        
        // Синхронизируем пользователя с бэкендом и получаем админский статус
        try {
          const userData = await apiClient.syncYandexUser({
            yandex_id: user.id,
            email: user.email || '',
            name: user.name || '',
            avatar: user.image || undefined
          });
          
          // Получаем админский статус из ответа API
          token.isAdmin = userData.isAdmin || false
        } catch (error) {
          console.error('Failed to sync user with backend:', error);
          token.isAdmin = false // По умолчанию false при ошибке
        }
      }
      
      if (account) {
        token.accessToken = account.access_token
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
        session.accessToken = token.accessToken as string
        session.isAdmin = token.isAdmin as boolean
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
})