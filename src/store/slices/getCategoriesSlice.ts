import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import getAzureADToken from '../api/getAzureADToken';

export const getCategories = createAsyncThunk(
  'getCategories/getCategories',
  async (_, thunkAPI) => {

    const token = await getAzureADToken();

    try {
      console.log("thunk call",apiClient);
      const response = await apiClient(token).get('/Users');
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
        console.log("thunk call slice");
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