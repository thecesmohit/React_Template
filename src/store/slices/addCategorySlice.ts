import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import getAzureADToken from '../api/getAzureADToken';

export const addCategory = createAsyncThunk(
  'addCategory/addCategory',
  async (categoryData: any, thunkAPI) => {
    
    const token = await getAzureADToken();

    try {
      const response = await apiClient(token).post('/users', categoryData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add category');
    }
  }
);

const addCategorySlice = createSlice({
  name: 'addCategory',
  initialState: {
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? String(action.payload) : null;
      });
  },
});

export default addCategorySlice.reducer;