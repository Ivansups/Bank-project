import { auth } from "@/lib/auth";

export interface AuthResult {
  isAuthenticated: boolean;
  userId?: string;
  isAdmin?: boolean;
  error?: string;
}

/**
 * Проверяет авторизацию пользователя
 * @returns AuthResult с информацией о пользователе
 */
export async function checkAuth(): Promise<AuthResult> {
  try {
    const session = await auth();
    
    if (!session) {
      return {
        isAuthenticated: false,
        error: "Unauthorized"
      };
    }

    return {
      isAuthenticated: true,
      userId: session.user.id,
      isAdmin: session.isAdmin || false
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      error: error instanceof Error ? error.message : "Authentication failed"
    };
  }
}

/**
 * Проверяет авторизацию и выбрасывает ошибку если пользователь не авторизован
 * @returns Promise с данными сессии
 */
export async function requireAuth() {
  const authResult = await checkAuth();
  
  if (!authResult.isAuthenticated) {
    throw new Error(authResult.error || "Unauthorized");
  }
  
  return authResult;
}

/**
 * Проверяет права администратора
 * @returns Promise с данными сессии (только для админов)
 */
export async function requireAdmin() {
  const authResult = await requireAuth();
  
  if (!authResult.isAdmin) {
    throw new Error("Admin access required");
  }
  
  return authResult;
}
