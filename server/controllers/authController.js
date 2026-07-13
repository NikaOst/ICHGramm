import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const username = (req.body.username || '').trim();

    if (/[A-Z]/.test(username)) {
      return res.status(400).json('Username must be lowercase');
    }

    const existUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existUser) return res.status(409).json('User with this email or username already exist!');

    const user = await User.create({ name, username, email, password });

    res.status(201).json({ status: 'success', body: { id: user._id, email, username, name } });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email_or_username, password } = req.body;

    if (!email_or_username || !password)
      return res.status(400).json('Email and password are required!');

    const user = await User.findOne({
      $or: [{ email: email_or_username }, { username: email_or_username }],
    });
    if (!user) {
      return res.status(401).json('Invalid email or password');
    }

    const equelPasswords = await bcrypt.compare(password, user.password);
    if (!equelPasswords) {
      return res.status(401).json('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: 'Internal server error' });
  }
};
