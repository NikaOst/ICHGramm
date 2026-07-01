import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
