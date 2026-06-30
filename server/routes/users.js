import express from 'express';
import {
  getMe,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// getMe
// http://127.0.0.1:3333/users/me
userRouter.get('/me', authMiddleware, getMe);

// get all users
// http://127.0.0.1:3333/users/
// http://127.0.0.1:3333/users/?username=&&name=
userRouter.get('/', authMiddleware, getAllUsers);

// get user by id
// http://127.0.0.1:3333/users/:id
userRouter.get('/:id', authMiddleware, getUserById);

// update user
// http://127.0.0.1:3333/users/:id
userRouter.put('/:id', authMiddleware, updateUser);

// delete user
// http://127.0.0.1:3333/users/:id
userRouter.delete('/:id', authMiddleware, deleteUser);

export default userRouter;
