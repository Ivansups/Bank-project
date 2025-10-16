import { updateUser } from "@/dal/user" 
import { auth } from "@/lib/auth"

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
        <div>
            <h1>Перед тем, как Вы начнете пользоваться сервисом, необходимо заполнить следующие данные:</h1>
            <ul>
                <li>Номер телефона</li>
                <li>Возраст</li>
                <li>Пол</li>
                <li>Серия паспорта</li>
            </ul>
        </div>
    )
}