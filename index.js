import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { PORT } from "./src/utils/config.js";
import { connectDB } from "./src/database/dbconnect.js";

import userRoute from "./src/routes/User.js";

const app = express();

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", userRoute);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
