
import fs from 'fs';
import path from 'path';
import db from '../config/db'

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    
    const migrationsPath = path.join(__dirname, '..', 'migrations');
    
    
    const migrationFiles = fs.readdirSync(migrationsPath)
      .filter(file => file.endsWith('.sql'))
      .sort(); 
    
    
    for (const file of migrationFiles) {
      console.log(`Running migration: ${file}`);
      const filePath = path.join(migrationsPath, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      
      await db.query(sql);
      console.log(`Migration ${file} completed successfully`);
    }
    
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    
    await db.end();
  }
}

runMigrations();