import express, { Router } from "express";
import cookieParser from "cookie-parser";
import userRouter from './route/user.router.js'
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user route
app.use('/api/v1/user',userRouter)

export { app };
