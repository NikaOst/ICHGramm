import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import likeRouter from './routes/likes.js';
import commentRouter from './routes/comments.js';
import userRouter from './routes/users.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/likes', likeRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running at http://127.0.0.1:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
