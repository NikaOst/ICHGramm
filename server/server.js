import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import likeRouter from './routes/likes.js';
import commentRouter from './routes/comments.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/likes', likeRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
