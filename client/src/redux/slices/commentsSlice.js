import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, body }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/comments/post/${postId}`,
        { body },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return { postId: String(postId), comment: response.data };
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

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    byPostId: {},
    status: null,
    error: null,
  },
  reducers: {
    setCommentsForPost: (state, action) => {
      const { postId, comments } = action.payload;
      state.byPostId[String(postId)] = Array.isArray(comments) ? comments : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { postId, comment } = action.payload;
        if (!state.byPostId[postId]) state.byPostId[postId] = [];
        state.byPostId[postId].push(comment);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase('auth/logout', (state) => {
        state.byPostId = {};
        state.status = null;
        state.error = null;
      });
  },
});

export const { setCommentsForPost } = commentsSlice.actions;
export default commentsSlice.reducer;
