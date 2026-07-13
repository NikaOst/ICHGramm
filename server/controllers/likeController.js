import Post from '../models/Post.js';

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json('Post not found');

    const userHasLiked = post.likes.some((id) => id.equals(userId));

    if (userHasLiked) {
      post.likes = post.likes.filter((id) => !id.equals(userId));
      await post.save();

      return res.status(200).json({
        postId,
        authorId: userId,
        liked: false,
        likesCount: post.likes.length,
      });
    }

    post.likes.push(userId);
    await post.save();

    return res.status(200).json({
      postId,
      authorId: userId,
      liked: true,
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
