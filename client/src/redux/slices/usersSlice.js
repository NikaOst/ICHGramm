import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMe = createAsyncThunk('users/getMe', async (_, { rejectWithValue, dispatch }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      dispatch(logout());
    }
    return rejectWithValue({
      status,
      data: error.response?.data,
      message: error.message,
    });
  }
});

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        dispatch(logout());
      }
      return rejectWithValue({
        status,
        data: error.response?.data,
        message: error.message,
      });
    }
  },
);

export const followUser = createAsyncThunk(
  'users/followUser',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/users/${id}/subscribe`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        dispatch(logout());
      }
      return rejectWithValue({
        status,
        data: error.response?.data,
        message: error.message,
      });
    }
  },
);

export const updateMe = createAsyncThunk(
  'users/updateMe',
  async ({ data, selectedAvatar }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('username', data.username ?? '');
      formData.append('about', data.about ?? '');
      formData.append('website', data.website ?? '');

      let avatarToSend = selectedAvatar || null;
      formData.append('avatar', avatarToSend);

      const response = await axios.put(`${BASE_URL}/users`, formData, {
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

export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async ({ username, name }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      const params = {};

      if (username?.trim()) params.username = username.trim();
      if (name?.trim()) params.name = name.trim();

      const response = await axios.get(`${BASE_URL}/users`, {
        params,
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

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    me: null,
    myPosts: [],
    user: null,
    userPosts: [],
    searchResults: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.me = action.payload.user;
        state.myPosts = action.payload.usersPosts;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.userPosts = action.payload.usersPosts;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(followUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.me) state.me.subscribes = action.payload.user.subscribes;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase('auth/logout', (state) => {
        state.me = null;
        state.myPosts = [];
        state.status = null;
        state.error = null;
      })
      .addCase(updateMe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.me = action.payload;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchUsers.pending, (state) => {
        state.status = 'loading';
        state.searchResults = [];
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.searchResults = [];
      });
  },
});

export default usersSlice.reducer;
