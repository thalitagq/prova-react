import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "./index";
import { RootState } from "./index";

const axios = require("axios").default;

type User = {
  username?: string | null;
  email: string | null;
  password: string | null;
};

type InitialStateType = {
  user: User | null;
  status: "idle" | "loading" | "pending";
  error: string | null;
  token: string | null;
};

type Error = {
  message: string;
};

type ErrorsignUp = {
  message: { response: { data: [{ message: string }] } };
};

type LoginReturnType = {
  email: string;
  token: string;
};

const initialState: InitialStateType = {
  user: {
    email: localStorage.getItem("email") || null,
    password: localStorage.getItem("password"),
  },
  status: "idle",
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk<
  // Return type of the payload creator
  LoginReturnType,
  // First argument to the payload creator
  { email: string; password: string },
  // Types for ThunkAPI
  { rejectValue: ErrorsignUp }
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

    return { email: email, token: response.data.token };
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as ErrorsignUp);
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
    };
    rejectValue: ErrorsignUp;
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
      return thunkApi.rejectWithValue({ message: error } as ErrorsignUp);
    }
  }
);

export const forgotPassword = createAsyncThunk<
  // Return type of the payload creator
  string,
  // First argument to the payload creator
  {
    token: string,

  },
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    };
    rejectValue: ErrorsignUp;
  }
>(
  "auth/signupUser",
  async (email, thunkApi) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3333/passwords",
        data: {
          email
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue({ message: error } as ErrorsignUp);
    }
  }
);

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
      localStorage.setItem("email", payload.email);
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

    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
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
    });

    builder.addCase(forgotPassword.fulfilled, (state, { payload }) => {
      state.status = "idle";
      
    });

    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Algo deu errado. Tente novamente";
      state.status = "idle";
    }) 
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
