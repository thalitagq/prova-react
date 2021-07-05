import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { forgotPassword, loginUser, newPassword, signupUser } from "./api";

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

const initialState: InitialStateType = {
  user_id: Number(localStorage.getItem("user_id")) || null,
  user: {
    email: localStorage.getItem("email") || null,
    password: localStorage.getItem("password"),
  },
  status: "idle",
  error: null,
  token: localStorage.getItem("token"),
  tokenPassword: null,
};

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
      localStorage.removeItem("user_id")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.user!.email = payload.email;
      state.token = payload.token.token;
      state.user_id = payload["user_id"].id
      localStorage.setItem("token", payload.token.token);
      localStorage.setItem("email", payload.email);
      localStorage.setItem("user_id", payload["user_id"].id.toString());
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
