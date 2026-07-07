import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const postSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);
export default Post;
