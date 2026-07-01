import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/postImg/${req.file.filename}`;
    }

    updateData.author = userId;

    const newPost = await Post.create(updateData);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { title, body } = req.body;
    const updateData = { title, body };

    if (req.file) {
      updateData.image = `/uploads/postImg/${req.file.filename}`;
    }

    const post = await Post.findOneAndUpdate({ _id: req.params.id, author: userId }, updateData, {
      runValidators: true,
      new: true,
    });
    if (!post) return res.status(404).json('Post not found!');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: userId });
    if (!post) return res.status(404).json('Post not found');
    res.status(200).json('Post was deleted!');
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json('Post not found');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getPostsComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId })
      .populate('author', 'username')
      .select('-post');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
