import { User } from "./user";
import { Card } from "./card";
import { Transaction } from "./transaction";

export interface ProfileProps {
  user: User;
  cards: Card[];
  transactions: Transaction[];
}