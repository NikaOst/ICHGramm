import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import userReducer from './slices/usersSlice.js';
import postReducer from './slices/postsSlice.js';
import likeReducer from './slices/likesSlice.js';
import commentReducer from './slices/commentsSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentReducer,
    likes: likeReducer,
    posts: postReducer,
    users: userReducer,
  },
});
export default store;
