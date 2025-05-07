

import cookieParser from 'cookie-parser';
import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from './db.js';

import postroutes from './routes/postroutes.js';

import userRoutes from "./routes/usersroutes.js"
dotenv.config();

const app = express(); 
app.use(express.json());
app.use(cookieParser());

connect();

app.use(cors({ origin: 'http://localhost:5173', 
  credentials: true,}));

app.use("/users",userRoutes);
app.use("/posts",  postroutes);

const PORT =5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
