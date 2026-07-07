import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// если выйти из аккаунта и зайти, то картинка сбиваться будет
export const toggleLike = createAsyncThunk(
  '/likes/toggleLike',
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/likes/post/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
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

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    byPostId: JSON.parse(localStorage.getItem('likedMap')) || {},
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const postId = String(action.payload.postId);
        state.byPostId[postId] = {
          liked: Boolean(action.payload.liked),
          likesCount: Number(action.payload.likesCount || 0),
          authorId: String(action.payload.authorId),
        };
        localStorage.setItem('likedMap', JSON.stringify(state.byPostId));
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase('auth/logout', (state) => {
        state.byPostId = {};
        state.status = null;
        state.error = null;
        // localStorage.removeItem('likedMap');
      });
  },
});

export default likesSlice.reducer;
