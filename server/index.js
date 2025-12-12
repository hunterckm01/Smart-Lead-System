import express from 'express'
import connectDB from './config/database.js';
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
import './cron/syncLeads.js'
const app = express();


//GETTING PORT ADDRESS
const PORT = process.env.PORT;
//CONNECTING DATABASE
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use('/', userRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`)
})