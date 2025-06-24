/**
 * Script to create the mcq_generator database
 * Run this script with: node scripts/create-database.js
 */

const { Client } = require('pg');
require('dotenv').config();

// Extract database connection info from environment variables
const {
  POSTGRES_USER = 'postgres',
  POSTGRES_PASSWORD = 'your_password',
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = '5432',
  POSTGRES_DB = 'mcq_generator'
} = process.env;

async function createDatabase() {
  // Connect to default PostgreSQL database
  const client = new Client({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    database: 'postgres' // Connect to default database first
  });

  try {
    await client.connect();
    
    // Check if database already exists
    const checkResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [POSTGRES_DB]
    );
    
    if (checkResult.rows.length > 0) {
      console.log(`Database '${POSTGRES_DB}' already exists`);
    } else {
      // Create the database
      console.log(`Creating database '${POSTGRES_DB}'...`);
      await client.query(`CREATE DATABASE ${POSTGRES_DB}`);
      console.log(`Database '${POSTGRES_DB}' created successfully`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createDatabase();