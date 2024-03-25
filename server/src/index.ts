import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import {router as usersRoutes} from './routes/users';
import {router as authRoutes} from './routes/auth';
import cookieParser from 'cookie-parser';

mongoose
.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))

// app/test là endpoint
app.get("/api/test", async (req: Request, res: Response) =>{
    res.json( {message: "hello from express endpoint!"});
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes)

app.listen(7000 , () => {
    console.log("server running on localhost:7000");
});


