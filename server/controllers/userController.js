import Post from '../models/Post.js';
import User from '../models/User.js';

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('subscribers subscribes', 'name username');
    const usersPosts = await Post.find({ author: req.user.userId });
    res.status(200).json({ user, usersPosts });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, about, website } = req.body;
    const updateData = { username, about, website };

    if (req.file) {
      updateData.image = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
      runValidators: true,
      new: true,
    })
      .select('-password')
      .populate('subscribers subscribes', 'name username');
    if (!user) return res.status(404).json('User not found');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json('User not found');
    res.status(200).json('User was deleted');
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    //   search
    const { name, username } = req.query;

    const filters = [];

    if (name?.trim()) {
      filters.push({ name: { $regex: name.trim(), $options: 'i' } });
    }
    if (username?.trim()) {
      filters.push({ username: { $regex: username.trim(), $options: 'i' } });
    }

    // -----------------------------------
    const users = await User.find(filters.length ? { $or: filters } : {})
      .select('-password')
      .populate('subscribers subscribes', 'name username');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select('-password')
      .populate('subscribers subscribes', 'name username');
    if (!user) return res.status(404).json('User not found');
    const usersPosts = await Post.find({ author: userId });
    res.status(200).json({ user, usersPosts });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};

export const subscribeOnUser = async (req, res) => {
  try {
    const curUser = req.user.userId;
    const targetUser = req.params.id;

    if (curUser === targetUser) {
      return res.status(400).json('You cannot subscribe to yourself');
    }

    const cUser = await User.findById(curUser);
    const tUser = await User.findById(targetUser);

    if (!cUser || !tUser) return res.status(404).json('User not found');

    const alreadySubscribed = cUser.subscribes.some((id) => id.equals(targetUser));

    if (alreadySubscribed) {
      cUser.subscribes = cUser.subscribes.filter((id) => !id.equals(targetUser));
      tUser.subscribers = tUser.subscribers.filter((id) => !id.equals(curUser));
      await tUser.save();
      await cUser.save();
      res.status(200).json({ user: cUser });
    } else {
      cUser.subscribes.push(targetUser);
      tUser.subscribers.push(curUser);
      await tUser.save();
      await cUser.save();
      res.status(200).json({ user: cUser });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Internal server error' });
  }
};
