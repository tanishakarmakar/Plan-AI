import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;  // Assuming you're setting token here too
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, setToken, logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
