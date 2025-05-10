import express, { Application } from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";

dotenv.config();


const app:Application = express()


app.use(express.json());


// Api Routes
app.use('/api/auth', authRoutes);

// Doc Routes
app.use('/api',documentRoutes )




export default app;