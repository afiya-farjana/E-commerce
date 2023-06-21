import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import userService from './userService';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, thunkAPI) => {
    try {
      return await userService.createUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetState = createAction('Reset_all');

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
