import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string | null;
  password: string | null;
}

type InitialStateType = {
  user: User | null
};

const initialState: InitialStateType = {
 user: {email: localStorage.getItem('email') || null, password: localStorage.getItem('password')} 
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{email: string, password: string}>) => {
      state.user = {...action.payload}
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem("password", action.payload.password);
    },
    logout: (state) => {
      state.user = {email: '', password: ''}
      localStorage.removeItem('email')
      localStorage.removeItem("password");
    },
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer 