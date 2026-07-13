import Comment from '../models/Comment.js';

export const getPostsComments = async (postId) => {
  try {
    const comments = await Comment.find({ post: postId })
      .populate('author', 'username image')
      .select('-post');
    return comments;
  } catch (error) {
    return [];
  }
};
