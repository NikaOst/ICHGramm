import express from 'express';
import { commentPost, updateComment, deleteComment } from '../controllers/commentController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const commentRouter = express.Router();

// create comment
// http://127.0.0.1:3333/comments/post/:id
commentRouter.post('/post/:id', authMiddleware, commentPost);

// update comment
// http://127.0.0.1:3333/comments/:id/post/:id
commentRouter.put('/:id/post/:id', authMiddleware, updateComment);

// delete comment
// http://127.0.0.1:3333/comments/:id/post/:id
commentRouter.delete('/:id/post/:id', authMiddleware, deleteComment);

export default commentRouter;
