import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from './index'

const axios = require("axios").default;

type User = {
  username?: string | null;
  email: string | null;
  password: string | null;
};

type InitialStateType = {
  user_id: number | null;
  user: User | null;
  status: "idle" | "loading" | "pending";
  error: string | null;
  token: string | null;
  tokenPassword: string | null;
};

export type Error = {
  message: { response: { data: [{ message: string }] } }
};

type LoginReturnType = {
  email: string;
  token: string;
  user_id: number;
};

const initialState: InitialStateType = {
  user_id: Number(localStorage.getItem("id")) || null,
  user: {
    email: localStorage.getItem("email") || null,
    password: localStorage.getItem("password"),
  },
  status: "idle",
  error: null,
  token: localStorage.getItem("password"),
  tokenPassword: null,
};

export const loginUser = createAsyncThunk<
  // Return type of the payload creator
  LoginReturnType,
  // First argument to the payload creator
  { email: string; password: string },
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    }
    rejectValue: Error;
  }
>("auth/loginUser", async ({ email, password }, thunkApi) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3333/sessions",
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { email: email, token: response.data.token, user_id: response.data.user_id };
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

export const signupUser = createAsyncThunk<
  // Return type of the payload creator
  { email: string; password: string; token: string },
  // First argument to the payload creator
  {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
  },
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    }
    rejectValue: Error;
  }
>(
  "auth/signupUser",
  async ({ username, email, password, password_confirm }, thunkApi) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3333/users",
        data: {
          username,
          email,
          password,
          password_confirmation: password_confirm,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ message: error } as Error);
    }
  }
);

export const forgotPassword = createAsyncThunk<
  // Return type of the payload creator
  {data: string},
  // First argument to the payload creator
  string,
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    };
    rejectValue: Error;
  }
>("auth/forgotPassword", async (email, thunkApi) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3333/passwords",
      data: {
        email,
        redirect_url: "http://localhost:3000/new_password",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

export const newPassword = createAsyncThunk<
  // Return type of the payload creator
  null,
  // First argument to the payload creator
  { password: string; password_confirmation: string },
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    }
    state: RootState
    rejectValue: Error
  }
>("auth/newPassword", async ({ password, password_confirmation }, thunkApi) => {
  const { tokenPassword } = thunkApi.getState().auth;
  try {
    const response = await axios({
      method: "put",
      url: "http://localhost:3333/passwords",
      data: {
        password,
        password_confirmation,
        token: tokenPassword,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.user = { ...action.payload };
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("password", action.payload.password);
    },
    logout: (state) => {
      state.user = { email: "", password: "" };
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("token");
      localStorage.removeItem("id")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user!.email = payload.email;
      state.token = payload.token;
      state.user_id = payload["user_id"]
      localStorage.setItem("token", payload.token);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("id", payload["user_id"].toString());
      state.status = "idle";
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Não foi possível fazer o login";
      state.status = "idle";
    });

    builder.addCase(signupUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Não foi possível realizar o cadastro";
      state.status = "idle";
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.tokenPassword = null;
    });

    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.tokenPassword = payload.data
    });

    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Algo deu errado. Tente novamente";
      state.status = "idle";
    }) 

    builder.addCase(newPassword.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(newPassword.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Algo deu errado. Tente novamente";
      state.status = "idle";
    }); 
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
