import { CreateDocumentDto, DocumentData, DocumentStatus, DocumentListParams, DocumentListItem } from "../types/document.types";
import { v4 as uuidv4 } from 'uuid';
import db from "../config/db";

class DocumentModel {
  private tableName = 'documents';

  // Create a new document
  async create(documentData: CreateDocumentDto): Promise<DocumentData> {
    const id = uuidv4();
    const now = new Date();
    
    const document: DocumentData = {
      id,
      title: documentData.title,
      source_type: documentData.source_type,
      file_path: documentData.file_path,
      file_size: documentData.file_size,
      content_text: documentData.content_text,
      status: documentData.source_type === 'text_input' ? 'completed' : 'pending',
      user_id: documentData.user_id,
      created_at: now,
      updated_at: now
    };

    const query = `
      INSERT INTO ${this.tableName} 
      (id, title, source_type, file_path, file_size, content_text, status, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    
    const values = [
      document.id,
      document.title,
      document.source_type,
      document.file_path,
      document.file_size,
      document.content_text,
      document.status,
      document.user_id,
      document.created_at,
      document.updated_at
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  
   // Find document by ID
   
  async findById(id: string): Promise<DocumentData | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  
   // Check if user owns the document
   
  async isOwnedByUser(id: string, userId: string): Promise<boolean> {
    const query = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE id = $1 AND user_id = $2`;
    const result = await db.query(query, [id, userId]);
    return parseInt(result.rows[0].count) > 0;
  }

  
   // Update document status
   
  async updateStatus(id: string, status: DocumentStatus): Promise<void> {
    const query = `
      UPDATE ${this.tableName}
      SET status = $1, updated_at = $2
      WHERE id = $3
    `;
    
    await db.query(query, [status, new Date(), id]);
  }

  
   // Delete document
   
  async delete(id: string): Promise<boolean> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  
   // List documents with pagination and filtering
   
  async list(params: DocumentListParams): Promise<{
    documents: DocumentListItem[];
    total: number;
    pages: number;
  }> {
    const { page = 1, limit = 10, status, user_id } = params;
    const offset = (page - 1) * limit;
    
    // Build query with conditions
    let conditions = ['user_id = $1'];
    let queryParams: any[] = [user_id];
    let paramIndex = 2;
    
    if (status) {
      conditions.push(`status = $${paramIndex}`);
      queryParams.push(status);
      paramIndex++;
    }
    
    // Count total matching documents
    const countQuery = `
      SELECT COUNT(*) as total
      FROM ${this.tableName}
      WHERE ${conditions.join(' AND ')}
    `;
    
    const countResult = await db.query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].total);
    
    // Get paginated results
    const documentsQuery = `
      SELECT id, title, status, created_at
      FROM ${this.tableName}
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    
    const documentsResult = await db.query(
      documentsQuery, 
      [...queryParams, limit, offset]
    );
    
    const pages = Math.ceil(total / limit);
    
    return {
      documents: documentsResult.rows,
      total,
      pages
    };
  }
}

export default new DocumentModel();