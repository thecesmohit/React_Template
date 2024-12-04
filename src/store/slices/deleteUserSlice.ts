import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';


export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: number, { rejectWithValue }) => {
  try {
    const response = await apiClient.delete(`Users/${userId}`)
    return userId;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState: {
    User: [],
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.User = state.User.filter(user => user !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error =  action.payload as string;
      
      });
  },
});

export default deleteUserSlice.reducer;