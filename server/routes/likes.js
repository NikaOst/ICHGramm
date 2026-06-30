import express from 'express';
import { likePost } from '../controllers/likeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const likeRouter = express.Router();

// like post/unlike post
// http://127.0.0.1:3333/likes/post/:id
likeRouter.post('/post/:id', authMiddleware, likePost);

export default likeRouter;
