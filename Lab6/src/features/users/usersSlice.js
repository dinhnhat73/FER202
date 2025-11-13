import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/users');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Lỗi khi tải users');
    }
  }
);

export const toggleUserStatus = createAsyncThunk(
  'users/toggleUserStatus',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const user = state.users.list.find(u => u.id === userId);
      if (!user) throw new Error('User not found');
      const updated = { ...user, status: user.status === 'active' ? 'banned' : 'active' };
      const res = await api.put(`/users/${userId}`, updated);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Không thể cập nhật trạng thái');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => { state.list = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.isLoading = false; state.list = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

      .addCase(toggleUserStatus.pending, (state) => { state.error = null; })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        const idx = state.list.findIndex(u => u.id === action.payload.id);
        if (idx >= 0) state.list[idx] = action.payload;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => { state.error = action.payload; });
  },
});

export default usersSlice.reducer;
