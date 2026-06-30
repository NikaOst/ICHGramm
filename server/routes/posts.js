import express from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
} from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const postRouter = express.Router();

// create post
// http://127.0.0.1:3333/posts/
postRouter.post('/', authMiddleware, createPost);

// get all posts
// http://127.0.0.1:3333/posts/
postRouter.get('/', authMiddleware, getAllPosts);

// get post by id
// http://127.0.0.1:3333/posts/:id
postRouter.get('/:id', authMiddleware, getPostById);

// update post
// http://127.0.0.1:3333/posts/:id
postRouter.put('/:id', authMiddleware, updatePost);

// delete post
// http://127.0.0.1:3333/posts/:id
postRouter.delete('/:id', authMiddleware, deletePost);

export default postRouter;
