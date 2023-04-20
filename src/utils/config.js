import "dotenv/config";

export const MONGO_URL = process.env.MONGODB_URL;

export const PORT = process.env.PORT || 6000;

export const TOKEN_SECRET = process.env.TOKEN_SECRET_KEY;

export const JWT_SECRET = process.env.JWT_SECRET;

export const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;

export const EMAIL_NAME = process.env.EMAIL_NAME;

export const URL_SERVER = process.env.URL_SERVER;
