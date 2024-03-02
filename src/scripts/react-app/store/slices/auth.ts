import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLoggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (_,action) => ({...action.payload}),
    logOut: () => ({...initialState}),
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer