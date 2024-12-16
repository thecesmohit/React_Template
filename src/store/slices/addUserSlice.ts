import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import getAzureADToken from '../api/getAzureADToken';

export const addUser = createAsyncThunk(
  'addUser/addUser',
  async (addUserData: any, thunkAPI) => {
    
    const token = await getAzureADToken();

    try {
      const response = await apiClient(token).post('/users', addUserData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add category');
    }
  }
);

const addUserSlice = createSlice({
  name: 'addUser',
  initialState: {
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? String(action.payload) : null;
      });
  },
});

export default addUserSlice.reducer;