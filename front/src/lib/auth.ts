import NextAuth from "next-auth"
import Yandex from "next-auth/providers/yandex"
import { syncYandexUser, isUserAdmin } from "./db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
      authorization: {
        params: {
          force_confirm: "yes", // Принудительно показывать окно подтверждения
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        try {
          console.log('🔑 JWT callback - Syncing user:', user.id, user.email);
          
          // Синхронизируем пользователя напрямую с PostgreSQL
          const dbUser = await syncYandexUser({
            yandex_id: user.id,
            email: user.email || '',
            name: user.name || '',
            avatar: user.image || null
          });
          
          console.log('🔑 JWT callback - DB user created/updated:', dbUser.id);
          
          // Проверяем является ли пользователь администратором
          const isAdmin = await isUserAdmin(dbUser.id);
          
          token.id = dbUser.id
          token.email = dbUser.email
          token.name = dbUser.name
          token.picture = dbUser.avatar
          token.isAdmin = isAdmin
        } catch (error) {
          console.error('❌ Failed to sync user with database:', error);
          token.id = user.id
          token.email = user.email
          token.name = user.name
          token.picture = user.image
          token.isAdmin = false
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