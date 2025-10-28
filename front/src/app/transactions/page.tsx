import { auth } from "@/lib/auth";
import { PageLayout } from "@/components/layout";
import SetTransactions from "@/components/SetTransactions";
import { getUserDataServ }from "@/services/user_serv"
import { getUserTransactionsServ } from "@/services/transaction_serv"

export default async function Transactions() {
  const session = await auth();
  const user = getUserDataServ(session!.user.id)
  const transaction = await getUserTransactionsServ(session!.user.id);
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