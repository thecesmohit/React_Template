import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export const getCategories = createAsyncThunk(
  'getCategories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch categories');
    }
  }
);

const getCategoriesSlice = createSlice({
  name: 'getCategories',
  initialState: {
    categories: [],
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? String(action.payload) : null;
      
      });
  },
});

export default getCategoriesSlice.reducer;