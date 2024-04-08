import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import {router as usersRoutes} from './routes/users';
import {router as authRoutes} from './routes/auth';
import cookieParser from 'cookie-parser';
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';
import {router as hotelRoutes} from './routes/hotels';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use(express.static(path.join(__dirname, "../../client/dist")));

// app/test là endpoint
app.get("/api/test", async (req: Request, res: Response) =>{
    res.json( {message: "hello from express endpoint!"});
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes)
app.use("/api/my-hotels",myHotelRoutes)
app.use("/api/hotels", hotelRoutes);

// app.get("*", (req: Request, res: Response) =>{
//     res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
// })

app.listen(7000 , () => {
    console.log("server running on localhost:7000");
});


