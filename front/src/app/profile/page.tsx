import { auth } from "@/lib/auth";
import { PageLayout } from "@/components/layout";
import SetCards from "@/components/SetCards";
import SetTransactions from "@/components/SetTransactions";
import { getUser } from "@/dal/user";

export default async function ProfilePage() {
  const session = await auth();

  try {
    const user = await getUser(session!.user.id);

    return (
      <PageLayout 
        title="Профиль"
        subtitle={`Добро пожаловать, ${user.name}`}
        maxWidth="2xl"
        className="py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SetTransactions transactions={user.transactions || []} />
          <SetCards cards={user.cards || []} />
        </div>
      </PageLayout>
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