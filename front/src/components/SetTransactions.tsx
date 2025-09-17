import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Transaction {
  id: string;
  amount: number;
  user_id: string;
  transaction_type: string;
  createdAt: string;
  updatedAt: string;
}

export default function SetTransactionsComponent() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await apiClient.getTransactionsFromOneUser(session?.user?.id || "");
        if (response.error) {
          throw new Error(response.error);
        }
        setTransactions(response.data as Transaction[]);
      } catch (error) {
        console.error(error);
        setError("There are no transactions");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      getUserTransactions();
    }
  }, [session?.user?.id]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">Transactions</h1>
      {loading && <p className="text-sm text-gray-500 mb-2">Loading...</p>}
      {error && <p className="text-sm text-red-500 mb-2">Error: {error}</p>}
      <div className="flex flex-col gap-4">
        {transactions.map((transaction: Transaction, index: number) => (
          <div
            key={index}
            className="border rounded-md p-4 bg-gray-50 flex flex-col gap-1"
          >
            <div className="text-sm text-gray-700">
              <span className="font-medium">ID:</span> {transaction.id}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">User ID:</span> {transaction.user_id}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Amount:</span> {transaction.amount}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Type:</span> {transaction.transaction_type}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Created:</span> {transaction.createdAt}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Updated:</span> {transaction.updatedAt}
            </div>
          </div>
        ))}
        {!loading && !error && transactions.length === 0 && (
          <p className="text-sm text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
}