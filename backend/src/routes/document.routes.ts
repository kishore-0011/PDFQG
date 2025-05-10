// routes/document.routes.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import DocumentController from '../controllers/document.controller';
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/documents'));
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept only PDFs
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Document Routes
router.post('/documents', authenticate, upload.single('file'), DocumentController.uploadDocument);
router.post('/documents/text', authenticate, DocumentController.addTextContent);
router.get('/documents', authenticate, DocumentController.listDocuments);
router.get('/documents/:id', authenticate, DocumentController.getDocument);
router.delete('/documents/:id', authenticate, DocumentController.deleteDocument);

export default router;