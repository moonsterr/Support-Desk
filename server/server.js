import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutesUsers from './Routes/users.js';
import connectDb from './config/db.js';
import path from 'path';
console.log('🔎 Looking for .env at:', path.resolve('.env'));
dotenv.config();
connectDb();
const port = 3000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', apiRoutesUsers);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
