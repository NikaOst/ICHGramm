import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(409).json('User with this email already exist!');

    const user = await User.create({ name, email, password });

    res.status(201).json({ status: 'success', body: { id: user._id, email } });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json('Email and password are required!');

    const user = await User.findOne({ email });
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
