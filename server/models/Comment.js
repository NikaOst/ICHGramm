import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
