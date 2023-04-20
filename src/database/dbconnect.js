import mongoose from "mongoose";

import { MONGO_URL } from "../utils/config.js";

export const connectDB = async () => {
  if (!MONGO_URL) {
    console.log(`${MONGO_URL} is not defined in the env`);
  }

  try {
    mongoose.set("strictQuery", false);
    const res = await mongoose.connect(MONGO_URL);
    if (res.connection.readyState === 1)
      console.log("DB connection is successfully!");
    else console.log("DB connecting");
  } catch (error) {
    console.log("DB connection is failed");
    throw new Error(error);
  }
};
