import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';


export const updateUser = createAsyncThunk('users/updateUser', async (userData: any, { rejectWithValue }) => {
  try {
    const response = await apiClient.put(`users/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to update user');
  }
});


const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState: {
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // existing cases...
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
  
});

export default updateUserSlice.reducer;