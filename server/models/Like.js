import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const likeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const Like = mongoose.model('Like', likeSchema);
export default Like;
