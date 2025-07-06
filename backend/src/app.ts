import express, { Application } from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";
import quizRoutes from './routes/quiz.routes';
import cors from "cors";
import cookieParser from 'cookie-parser';
import verificationRoutes from "./routes/verification.routes"

dotenv.config();


const app:Application = express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'https://pdfqg.vercel.app',
  credentials: true
}));



// Api Routes
app.use('/api/auth', authRoutes);

// Doc Routes
app.use('/api',documentRoutes )

// Email Verification Routes
app.use('/api',verificationRoutes)

// Quiz Routes
app.use('/api/quizzes', quizRoutes);




export default app;