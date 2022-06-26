import dotenv from 'dotenv';
dotenv.config();

export const server_url = process.env.SERVER_URL || 'http://localhost:1337/';
export const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';

export const port = parseInt(process.env.PORT as string) || 1337;
export const dbUri = process.env.DATABASE_URL as string;
