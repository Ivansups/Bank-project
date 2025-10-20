// front/src/app/page.tsx
import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import { checkUserDataIsValid } from "@/dal/user";
import UpdateUserData from "@/components/UpdateUserData";

export default async function Home() {
  const session = await auth()
  const userDataIsValid = await checkUserDataIsValid(session?.user?.id ?? '')

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full px-4">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
              Добро пожаловать, {session.user?.name}!
            </h1>
            <p className="mt-4 text-xl text-white/80 mb-8">
              Ваш банковский аккаунт готов к использованию
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {userDataIsValid ? (
              <Link
                href="/controlPanel"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all duration-200 hover:scale-105"
              >
                Перейти в панель управления
              </Link>
              ): (
                <Link
                href="/updatePage"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all duration-200 hover:scale-105"
              >
                Дополнить данные
              </Link>
              )}

              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 border border-white/20 text-lg font-medium rounded-lg text-white bg-transparent hover:bg-white/10 shadow-lg transition-all duration-200 hover:scale-105"
                >
                  Выйти
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full px-4">
        <div className="text-center">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-white sm:text-7xl mb-8">
            Современный{" "}
            <span className="relative whitespace-nowrap text-yellow-300">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-yellow-200/70"
                preserveAspectRatio="none"
              >
                <path d="m203.371.916c-26.013-21.846-46.425-11.845-46.425 11.845V42h92.85V12.761c0-23.69-20.412-33.691-46.425-11.845Z" />
              </svg>
              <span className="relative">банковский</span>
            </span>{" "}
            сервис
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-white/80 mb-10">
            Безопасные транзакции, удобное управление финансами и современный интерфейс для всех ваших банковских потребностей.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              className="group inline-flex items-center justify-center rounded-full py-4 px-8 text-lg font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-800 active:bg-gray-200 active:text-gray-700 focus-visible:outline-white shadow-lg transition-all duration-200 hover:scale-105"
              href="/auth/signin"
            >
              Войти через Яндекс
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}