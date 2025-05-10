import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import DocumentModel from '../models/document.models';
import { 
  DocumentData, 
  DocumentListItem, 
  PaginatedResponse, 
  CreateDocumentDto, 
  CreateTextDocumentDto,
  DocumentListParams
} from '../types/document.types';

const unlinkAsync = promisify(fs.unlink);
const UPLOAD_DIR = path.join(__dirname, '../uploads/documents');

class DocumentService {
  
  // Upload a new document from a file
   
  async uploadDocument(
    title: string, 
    filePath: string, 
    fileSize: number, 
    userId: string
  ): Promise<DocumentData> {
    const documentData: CreateDocumentDto = {
      title,
      source_type: 'pdf',
      file_path: filePath,
      file_size: fileSize,
      user_id: userId
    };
    
    const document = await DocumentModel.create(documentData);
    
    
    
    return document;
  }
  
  
    // Create document from text input
   
  async createTextDocument(data: CreateTextDocumentDto): Promise<DocumentData> {
    const documentData: CreateDocumentDto = {
      title: data.title,
      content_text: data.content_text,
      source_type: 'text_input',
      user_id: data.user_id
    };
    
    return await DocumentModel.create(documentData);
  }
  
  
    // Get document by ID
   
  async getDocument(id: string, userId: string): Promise<DocumentData> {
    const document = await DocumentModel.findById(id);
    
    if (!document) {
      throw new Error('Document not found');
    }
    
    // Check if the user has access to this document
    if (document.user_id !== userId) {
      throw new Error('Not authorized to access this document');
    }
    
    return document;
  }
  
  
  // List documents with pagination and filtering
   
  async listDocuments(params: DocumentListParams): Promise<PaginatedResponse<DocumentListItem>> {
    const { page = 1, limit = 10 } = params;
    
    const { documents, total, pages } = await DocumentModel.list(params);
    
    return {
      data: documents,
      pagination: {
        total,
        page,
        limit,
        pages
      }
    };
  }
  
  
   // Delete a document
   
  async deleteDocument(id: string, userId: string): Promise<void> {
    const document = await DocumentModel.findById(id);
    
    if (!document) {
      throw new Error('Document not found');
    }
    
    // Check if the user has permission to delete this document
    if (document.user_id !== userId) {
      throw new Error('Not authorized to delete this document');
    }
    
    
    if (document.source_type === 'pdf' && document.file_path) {
      try {
        await unlinkAsync(path.join(UPLOAD_DIR, path.basename(document.file_path)));
      } catch (error) {
        console.error(`Could not delete file ${document.file_path}:`, error);
        
      }
    }
    
    const deleted = await DocumentModel.delete(id);
    
    if (!deleted) {
      throw new Error('Failed to delete document');
    }
  }
}

export default new DocumentService();