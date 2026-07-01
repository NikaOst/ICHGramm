import Like from '../models/Like.js';
import Post from '../models/Post.js';

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const existingLike = await Like.findOne({ post: postId, author: userId });
    if (existingLike) {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json('Post not found');

      await Like.findByIdAndDelete(existingLike.id);

      post.likes--;
      await post.save();

      res.status(200).json(`You unliked the post!`);
    } else {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json('Post not found');

      const like = await Like.create({ post: postId, author: userId });

      post.likes++;
      await post.save();

      res.status(200).json(`You liked the post!`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
