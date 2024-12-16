import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import { loginRequest } from '../../auth-config';
import { instance } from '../..';
import getAzureADToken from '../api/getAzureADToken';

export const getUsers = createAsyncThunk(
  'getUsers/getUsers',
  async (_, thunkAPI) => {
    
    const token = await getAzureADToken();
    // const tokenResponse = await instance.acquireTokenSilent(loginRequest);
    //     const token = tokenResponse.accessToken;
    console.log("token after", token);
    try {
      console.log("thunk call",apiClient);
      const response = await apiClient(token).get('/Users');
      console.log("responseData", response.data);
      return response.data;
    } catch (error) {
      console.log('Failed to fetch Users');
      return thunkAPI.rejectWithValue('Failed to fetch Users');
    }
  }
);

const getUsersSlice = createSlice({
  name: 'getUsers',
  initialState: {
    users: [],
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        console.log("thunk call slice pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log("get user", action.payload);
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? String(action.payload) : null;
      
      });
  },
});

export default getUsersSlice.reducer;