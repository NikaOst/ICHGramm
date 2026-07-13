import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  const connection = await mongoose.connect(uri);
  console.log('MongoDB connected!');
  return connection;
};

export default connectDB;
