import express from 'express';
import { register, login } from '../controllers/authController.js';

const authRouter = express.Router();

// register user
// http://127.0.0.1:3333/auth/register
authRouter.post('/register', register);

// login user
// http://127.0.0.1:3333/auth/login
authRouter.post('/login', login);

export default authRouter;
