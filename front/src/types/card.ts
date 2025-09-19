export interface Card {
  id: string;
  amount: number;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardProps {
  card: Card;
  onTopUp: (cardId: string) => void;
  onDetails: (cardId: string) => void;
  className?: string;
}
