
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getUserCards, getUserTransactions } from "@/lib/server-action";
import { PageLayout } from "@/components/layout";
import SetCards from "@/components/SetCards";
import SetTransactions from "@/components/SetTransactions";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/auth/signin');
  }

  // Загружаем данные на сервере
  const [cards, transactions] = await Promise.all([
    getUserCards(session.user.id),
    getUserTransactions(session.user.id),
  ]);

  return (
    <PageLayout 
      title="Профиль"
      subtitle={`Добро пожаловать, ${session.user.name || "User"}`}
      maxWidth="2xl"
      className="py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SetTransactions transactions={transactions} />
        <SetCards cards={cards} />
      </div>
    </PageLayout>
  );
}