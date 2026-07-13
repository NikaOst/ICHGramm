import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllPosts = createAsyncThunk('/posts', async (_, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403) dispatch(logout());

    return rejectWithValue({
      status,
      data: error.response?.data,
      message: error.message,
    });
  }
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ body, image }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('body', body);
      formData.append('image', image);

      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) dispatch(logout());

      return rejectWithValue({
        status,
        data: error.response?.data,
        message: error.message,
      });
    }
  },
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`${BASE_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) dispatch(logout());

      return rejectWithValue({
        status,
        data: error.response?.data,
        message: error.message,
      });
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
    post: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase('auth/logout', (state) => {
        state.posts = null;
        state.post = null;
        state.status = null;
        state.error = null;
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
