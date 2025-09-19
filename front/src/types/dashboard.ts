import { User } from "./user";

export interface DashboardStats {
    balance: number;
    transactionsCount: number;
    cardsCount: number;
    usersCount?: number;
    activeSessions?: number;
  }
  
  export interface DashboardPageProps {
    user: User;
    stats: DashboardStats;
  }