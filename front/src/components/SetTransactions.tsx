// import { Transaction as TransactionType } from "@/types/transaction";
// import { Card as UICard } from "@/components/ui";

// interface SetTransactionsProps {
//   transactions: TransactionType[];
//   loading?: boolean;
//   error?: string;
// }

// export default function SetTransactions({ 
//   transactions, 
//   loading = false, 
//   error 
// }: SetTransactionsProps) {
//   return (
//     <UICard 
//       title="Транзакции"
//       variant="elevated"
//       className="w-full max-w-6xl mx-auto"
//     >
//       {loading && (
//         <div className="flex justify-center items-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           <span className="ml-2">Загрузка транзакций...</span>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//           <p className="text-red-600">{error}</p>
//         </div>
//       )}

//       {!loading && !error && (
//         <>
//           {transactions.length > 0 ? (
//             <div className="space-y-4">
//               {transactions.map((transaction: TransactionType) => (
//                 <div
//                   key={transaction.id}
//                   className="border rounded-lg p-4 bg-white shadow-sm"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="font-medium">Транзакция #{transaction.id.slice(0, 8)}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(transaction.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className={`font-bold ${
//                         transaction.transaction_type === 'ADD' ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                         {transaction.transaction_type === 'ADD' ? '+' : '-'}{transaction.amount} ₽
//                       </p>
//                       <p className="text-sm text-gray-500 capitalize">
//                         {transaction.transaction_type.toLowerCase()}
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-sm mt-2">
//                     Статус: <span className="font-medium">{transaction.status}</span>
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Транзакции не найдены
//               </h3>
//               <p className="text-gray-500">
//                 У вас пока нет транзакций
//               </p>
//             </div>
//           )}
//         </>
//       )}
//     </UICard>
//   );
// }