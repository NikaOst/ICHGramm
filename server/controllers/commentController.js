import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const commentPost = async (req, res) => {
  try {
    const { body } = req.body;
    const authorId = req.user.userId;
    const postId = req.params.id;

    const newComment = await Comment.create({ body, author: authorId, post: postId });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const userId = req.user.userId;

    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: userId },
      req.body.body,
      {
        runValidators: true,
        new: true,
      },
    );
    if (!comment) return res.status(404).json('Comment not found!');
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: userId });
    if (!comment) return res.status(404).json('Comment not found');
    res.status(200).json('Comment was deleted!');
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
