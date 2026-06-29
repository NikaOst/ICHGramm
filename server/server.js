import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/auth', authRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
