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
    console.log('Connecting to database...');
    
    // Create users table if it doesn't exist
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
      
      -- Create indexes on commonly queried fields
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);
    
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error);
    throw error;
  }
};

// Function to check database connection
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the PostgreSQL database');
    client.release();
    return true;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    return false;
  }
};


export default pool;
