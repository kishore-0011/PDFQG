// controllers/document.controller.ts
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import DocumentService from '../services/document.services';
import { CreateTextDocumentDto, DocumentStatus } from '../types/document.types';

const mkdirAsync = promisify(fs.mkdir);
const UPLOAD_DIR = path.join(__dirname, '../uploads/documents');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB


(async () => {
  try {
    await mkdirAsync(UPLOAD_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating upload directory:', err);
  }
})();

class DocumentController {
  
   // Upload a document file
  
  async uploadDocument(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      // Check if file exists in the request
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
      }
      
      // Validate source_type
      // const sourceType = req.body.source_type;
      // if (sourceType !== 'pdf') {
      //   res.status(400).json({ message: 'Invalid source type. Must be "pdf"' });
      //   return;
      // }

      
      
      // Validate title
      if (!req.body.title) {
        res.status(400).json({ message: 'Title is required' });
        return;
      }
      
      // Validate file size
      if (req.file.size > MAX_FILE_SIZE) {
        res.status(413).json({ message: 'File exceeds size limit of 10MB' });
        return;
      }
      
      // Validate file type
      if (req.file.mimetype !== 'application/pdf') {
        res.status(400).json({ message: 'Only PDF files are allowed' });
        return;
      }
      
      const document = await DocumentService.uploadDocument(
        req.body.title,
        req.file.path,
        req.file.size,
        req.user.userId
      );
      
      res.status(201).json({
        id: document.id,
        title: document.title,
        source_type: document.source_type,
        file_size: document.file_size,
        status: document.status,
        created_at: document.created_at
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
  
  
    //Create document from text content
   
  async addTextContent(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const { title, content_text } = req.body;
      
      // Validate required fields
      if (!title || !content_text) {
        res.status(400).json({ message: 'Title and content_text are required' });
        return;
      }
      
      // Check content size (arbitrary limit, adjust as needed)
      if (content_text.length > 100000) { // 100KB
        res.status(413).json({ message: 'Content exceeds size limit' });
        return;
      }
      
      const documentData: CreateTextDocumentDto = {
        title,
        content_text,
        user_id: req.user.userId
      };
      
      const document = await DocumentService.createTextDocument(documentData);
      
      res.status(201).json({
        id: document.id,
        title: document.title,
        source_type: document.source_type,
        status: document.status,
        created_at: document.created_at
      });
    } catch (error) {
      console.error('Error creating text document:', error);
      
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
  
  
    // List documents with pagination and filtering
   
  async listDocuments(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const status = req.query.status as DocumentStatus | undefined;
      
      const result = await DocumentService.listDocuments({
        page,
        limit,
        status,
        user_id: req.user.userId
      });
      
      res.status(200).json(result);
    } catch (error) {
      console.error('Error listing documents:', error);
      
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
  
  
   // Get a document by ID
   
  async getDocument(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const documentId = req.params.id;
      
      try {
        const document = await DocumentService.getDocument(documentId, req.user.userId);
        
        res.status(200).json({
          id: document.id,
          title: document.title,
          file_path: document.file_path,
          file_size: document.file_size,
          status: document.status,
          created_at: document.created_at,
          updated_at: document.updated_at
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Document not found') {
            res.status(404).json({ message: 'Document not found' });
          } else if (error.message === 'Not authorized to access this document') {
            res.status(403).json({ message: 'Not authorized to access this document' });
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error getting document:', error);
      
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
  
  
    // Delete a document
   
  async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const documentId = req.params.id;
      
      try {
        await DocumentService.deleteDocument(documentId, req.user.userId);
        res.status(204).end();
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Document not found') {
            res.status(404).json({ message: 'Document not found' });
          } else if (error.message === 'Not authorized to delete this document') {
            res.status(403).json({ message: 'Not authorized to delete this document' });
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  }
}

export default new DocumentController();