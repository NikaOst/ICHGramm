import Like from '../models/Like.js';
import Post from '../models/Post.js';

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const existingLike = await Like.findOne({ post: postId, author: userId });
    if (existingLike) {
      await Like.findByIdAndDelete(existingLike.id);

      const post = await Post.findById(postId);
      post.likes--;
      await post.save();

      res.status(200).json(`You unliked the post!`);
    } else {
      const like = await Like.create({ post: postId, author: userId });

      const post = await Post.findById(postId);
      post.likes++;
      await post.save();

      res.status(200).json(`You liked the post!`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
