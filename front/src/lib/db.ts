import { Pool } from 'pg';

// Создаем пул подключений к PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'bank_db',
  user: process.env.DB_USER || 'bank_user',
  password: process.env.DB_PASSWORD || 'bank_password',
});

export interface User {
  id: string;
  yandex_id: string | null;
  name: string;
  email: string;
  avatar: string | null;
  isAdmin: boolean;
  last_login: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncUserData {
  yandex_id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

/**
 * Синхронизация пользователя из Яндекс OAuth
 * Если пользователь существует - обновляем данные
 * Если нет - создаем нового
 */
export async function syncYandexUser(data: SyncUserData): Promise<User> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Ищем пользователя по email (приоритет) или yandex_id
    let user = await client.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [data.email]
    );
    
    if (user.rows.length === 0) {
      user = await client.query<User>(
        'SELECT * FROM users WHERE yandex_id = $1',
        [data.yandex_id]
      );
    }
    
    if (user.rows.length > 0) {
      // Обновляем существующего пользователя
      const result = await client.query<User>(
        `UPDATE users 
         SET yandex_id = $1, name = $2, avatar = $3, last_login = NOW(), "updatedAt" = NOW()
         WHERE id = $4
         RETURNING *`,
        [data.yandex_id, data.name, data.avatar || null, user.rows[0].id]
      );
      
      await client.query('COMMIT');
      return result.rows[0];
    } else {
      // Создаем нового пользователя
      const result = await client.query<User>(
        `INSERT INTO users (yandex_id, name, email, avatar, last_login, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, NOW(), NOW(), NOW())
         RETURNING *`,
        [data.yandex_id, data.name, data.email, data.avatar || null]
      );
      
      await client.query('COMMIT');
      return result.rows[0];
    }
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error syncing user:', error);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Проверка является ли пользователь администратором
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT COUNT(*) as count FROM admins WHERE user_id = $1',
      [userId]
    );
    return parseInt(result.rows[0].count) > 0;
  } finally {
    client.release();
  }
}

/**
 * Получить пользователя по ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const client = await pool.connect();
  
  try {
    const result = await client.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
}

export default pool;

