import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from './index'
import { RootState } from './index'

type User = {
  usernmae?: string | null;
  email: string | null;
  password: string | null;
};

type InitialStateType = {
  user: User | null,
  status: 'idle' | 'loading' | 'pending',
  error: string |  null
}

type Error = {
  message: string;
};

const axios = require("axios").default

const initialState: InitialStateType = {
 user: {email: localStorage.getItem('email') || null, password: localStorage.getItem('password')},
 status: 'idle',
 error: null 
}

export const loginUser = createAsyncThunk("auth/loginUser", async (user: User) => {
  // try {
  //   const response = await axios.post("http://localhost:3333/sessions", user, {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //   });
    
  //   console.log(response);
  //   return response as string;
  // } catch (error) {
  //   console.error(error);
  //   return error as string
  // }
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3333/sessions",
      data: {
        email: user.email,
        password: user.password,
      },
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log('RESPONSE', response);
    
  } catch (error) {
    console.error(error);
  }
});


export const signupUser = createAsyncThunk("auth/signupUser", async (user: User) => {
  try {
    const response = await axios.post("localhost:3333/users", user);
    console.log(response);
    return response as string;
  } catch (error) {
    console.error(error);
    return error as string;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{email: string, password: string}>) => {
      state.user = {...action.payload}
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem("password", action.payload.password)
    },
    logout: (state) => {
      state.user = {email: '', password: ''}
      localStorage.removeItem('email')
      localStorage.removeItem("password");
    },
  },
  extraReducers:(builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      // state.user = { ...payload };
      // localStorage.setItem("email", action.payload.email);
      // localStorage.setItem("password", action.payload.password);
      console.log('FULLFILED PAYLOAD FULFILED:',payload );
      
      state.status = "idle";
    })
    
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      // if (action.payload) state.error = action.payload;
      console.log("FULLFILED PAYLOAD REJECTED:", payload);
      state.status = "idle";
    });

    builder.addCase(signupUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      // state.user = { ...payload };
      // localStorage.setItem("email", action.payload.email);
      // localStorage.setItem("password", action.payload.password);
      console.log("FULLFILED PAYLOAD FULFILED:", payload);

      state.status = "idle";
    });

    builder.addCase(signupUser.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      // if (action.payload) state.error = action.payload;
      console.log("FULLFILED PAYLOAD REJECTED:", payload);
      state.status = "idle";
    });
  
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer 