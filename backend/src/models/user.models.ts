import pool from "../config/db"
import { User, UserDto } from '../types/user.types';
import { v4 as uuidv4 } from 'uuid';



export class UserModel {
  // Create a new user in the database
  async create(username: string, email: string, hashedPassword: string, fullName?: string): Promise<UserDto> {
    const id = uuidv4();
    const now = new Date();
    
    const query = `
      INSERT INTO users (id, username, email, password, full_name, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, username, email, full_name as "fullName"
    `;
    
    const values = [id, username, email, hashedPassword, fullName || null, now, now];
    
    const result = await pool.query(query, values);
    return result.rows[0] as UserDto;
  }

  // Find a user by email
  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, username, email, password, full_name as "fullName", created_at as "createdAt", updated_at as "updatedAt"
      FROM users
      WHERE email = $1
    `;
    
    const result = await pool.query(query, [email]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as User;
  }

  // Find a user by username
  async findByUsername(username: string): Promise<User | null> {
    const query = `
      SELECT id, username, email, password, full_name as "fullName", created_at as "createdAt", updated_at as "updatedAt"
      FROM users
      WHERE username = $1
    `;
    
    const result = await pool.query(query, [username]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as User;
  }

  // Find a user by ID
  async findById(id: string): Promise<UserDto | null> {
    const query = `
      SELECT id, username, email, full_name as "fullName"
      FROM users
      WHERE id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as UserDto;
  }
}

export default new UserModel();