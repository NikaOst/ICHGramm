import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { getPostsComments } from '../middlewares/getPostsComments.js';

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

    const { body } = req.body;
    const updateData = { body };

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
    await Comment.deleteMany({ post: req.params.id });
    const postsArr = await Post.find()
      .populate('author', 'username image')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username image',
        },
      });

    const posts = postsArr.map((post) => {
      const created = new Date(post.createdAt);
      const now = new Date();

      const diffMs = now - created;
      const dayMs = 1000 * 60 * 60 * 24;
      const diffDays = Math.floor(diffMs / dayMs);
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      let dateStr = '';

      if (diffDays < 7 && diffDays !== 0) {
        dateStr = `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
      } else if (diffDays === 0) {
        dateStr = `${diffHours} h.`;
      } else {
        const diffWeeks = Math.floor(diffDays / 7);
        dateStr = `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
      }

      return {
        ...post.toObject(),
        date: dateStr,
      };
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const postsArr = await Post.find()
      .populate('author', 'username image')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username image',
        },
      });

    const posts = postsArr.map((post) => {
      const created = new Date(post.createdAt);
      const now = new Date();

      const diffMs = now - created;
      const dayMs = 1000 * 60 * 60 * 24;
      const diffDays = Math.floor(diffMs / dayMs);
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      let dateStr = '';

      if (diffDays < 7 && diffDays !== 0) {
        dateStr = `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
      } else if (diffDays === 0) {
        dateStr = `${diffHours} h.`;
      } else {
        const diffWeeks = Math.floor(diffDays / 7);
        dateStr = `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
      }

      return {
        ...post.toObject(),
        date: dateStr,
      };
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username image')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username image',
        },
      });
    if (!post) return res.status(404).json('Post not found');

    const created = new Date(post.createdAt);
    const now = new Date();

    const diffMs = now - created;
    const dayMs = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(diffMs / dayMs);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    let dateStr = '';

    if (diffDays < 7) {
      dateStr = `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      dateStr = `${diffHours} h.`;
    } else {
      const diffWeeks = Math.floor(diffDays / 7);
      dateStr = `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
    }

    res.status(200).json({ ...post.toObject(), date: dateStr });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
