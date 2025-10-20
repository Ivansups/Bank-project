import { auth } from "@/lib/auth";
import { PageLayout } from "@/components/layout";
import SetTransactions from "@/components/SetTransactions";
import { getTransactions } from "@/dal/transaction";
import { getUser } from "@/dal/user";

export default async function Transactions() {
  const session = await auth();
  const user = getUser(session!.user.id)
  const transaction = await getTransactions(session!.user.id);
  try {
    return (
        <div>
        <PageLayout 
        title="Страница с транзакциями"
        subtitle={`Добро пожаловать, ${(await user).name}`}
        maxWidth="2xl"
        className="py-8"
      >
        <div className="gap-8">
          <SetTransactions transactions={transaction || []} />
        </div>
        </PageLayout>
        </div>
    );
  } catch (error) {
    console.error("Profile page error:", error);
    return (
      <PageLayout 
        title="Профиль"
        subtitle="Ошибка загрузки данных"
        maxWidth="2xl"
        className="py-8"
      >
        <p>Не удалось загрузить данные профиля. Попробуйте войти заново.</p>
      </PageLayout>
    );
  }
}