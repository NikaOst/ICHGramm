import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMe = createAsyncThunk('users/getMe', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    me: null,
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
        state.me = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase('auth/logout', (state) => {
        state.me = null;
        state.status = null;
        state.error = null;
      });
  },
});

export default usersSlice.reducer;
