import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false, 
  user: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
        const data = {
            uid : action.payload.uid,
            email : action.payload.email
        }
      state.user = data; // Store only necessary user data
   
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
