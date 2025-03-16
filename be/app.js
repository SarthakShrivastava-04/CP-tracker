import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import contestsRoutes from "./routes/contests.route.js";
import statsRoutes from "./routes/stats.route.js";

const app = express();

dotenv.config();

// app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/stats", statsRoutes)
app.use("/api/contests", contestsRoutes)
// app.use("/api/solutions", solutionsRoutes)
// app.use("/api/user", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: "Something went wrong!" })
  })  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server is running!");
});