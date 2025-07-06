import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DB,
});


// Function to initialize the database tables
export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('⏳ Initializing database...');

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        full_name VARCHAR(100),
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);

    // Documents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        source_type VARCHAR(50) NOT NULL,
        file_path VARCHAR(500),
        file_size BIGINT,
        content_text TEXT,
        status VARCHAR(50) NOT NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
      CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
    `);

    // Quizzes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        questions JSONB NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      );
    `);

    console.log('✅ Database tables ensured.');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

// Function to check database connection
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    client.release();
    return true;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    return false;
  }
};


export default pool;
