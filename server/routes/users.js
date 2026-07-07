import express from 'express';
import {
  getMe,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  subscribeOnUser,
} from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createImageUpload } from '../middlewares/uploadImage.js';

const userRouter = express.Router();
const uploadAvatar = createImageUpload('avatars');

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
// http://127.0.0.1:3333/users
userRouter.put('/', authMiddleware, uploadAvatar.single('avatar'), updateUser);

// delete user
// http://127.0.0.1:3333/users
userRouter.delete('/', authMiddleware, deleteUser);

// subscribe on user
// http://127.0.0.1:3333/users/:id/subscribe
userRouter.post('/:id/subscribe', authMiddleware, subscribeOnUser);

export default userRouter;
