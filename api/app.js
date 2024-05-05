import cors from "cors";
import express from "express";
import authRouter from "./router/auth.router.js";
import testRouter from "./router/test.router.js";
import userRouter from "./router/user.router.js";
import postRouter from "./router/post.router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

/*
 The project is not yet complete :| - 20% 
*/

app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);
app.use("/api/user/", userRouter);
app.use("/api/post/", postRouter);

const port = process.env.APP_PORT || 5500;
app.listen(port, () => console.log(`:) App run on -P${port} | DEV: "iYOU" `));
