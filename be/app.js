import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

console.log(process.env.CLIENT_URL)

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running!");
});