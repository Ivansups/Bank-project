import { updateUser } from "@/dal/user" 
import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function UpdateUserData() {
    const session = await auth()
    const user = await updateUser(session?.user?.id || '', {
        phone: "",
        age: 0,
        gender: "",
        passport_series: "",
        passport_number: "",
        place_of_registration: "",
        place_of_work: "",
        position: "",
        cout_of_credits: 0,
        count_of_cards: 0,
    })
return (
  <div className="flex flex-col">
    <h1 className="font-semibold text-xl">Перед тем, как Вы начнете пользоваться сервисом, необходимо заполнить следующие данные:</h1>
    <div className="border-2 border-gray-200 rounded-xl p-4 mt-4">
      <ul className="grid grid-cols-[auto_1fr] gap-y-4 items-center">
        <span>Номер телефона</span>
        <input className="border border-gray-300 rounded-lg p-2 w-full" />
        <span>Ваш пол</span>
        <input className="border border-gray-300 rounded-lg p-2 w-full" />
      </ul>
    </div>
    <div className="flex justify-center mt-8">
      <Link
        href="/controlPanel"
        className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all duration-200 hover:scale-105"
      >
        Пропустить
      </Link>
    </div>
  </div>
)
}