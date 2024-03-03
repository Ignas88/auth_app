import { createSlice } from '@reduxjs/toolkit';


export const initialState = {
  isLoggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (state,action) => ({isLoggedIn: true, ...action.payload}),
    setIsLoggedOut: () => ({...initialState}),
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = authSlice.actions;
export default authSlice.reducer