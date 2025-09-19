export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  isAdmin: boolean;
}

export interface UserProps {
  user: User;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}
