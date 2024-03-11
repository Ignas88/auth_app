import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export const initialState: {isLoggedIn: boolean; token: string | null} = {
  isLoggedIn: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn: (_,action: PayloadAction<{token: string}>) => ({isLoggedIn: true, ...action.payload}),
    setIsLoggedOut: () => ({...initialState}),
  },
});

export const { setIsLoggedIn, setIsLoggedOut } = authSlice.actions;
export default authSlice.reducer