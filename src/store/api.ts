import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".";
import { Game } from "./games";
import { Error } from "./auth";
import { Item } from "./cart";

type LoginReturnType = {
  email: string;
  token: { token: string };
  user_id: {id: number};
};

export type BetsReturnType = {
  id: number;
  user_id: number;
  game_id: number;
  total_price: number;
  date: string;
  numbers: string;
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
    };
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

    return {
      email: email,
      token: response.data.token,
      user_id: response.data.user_id,
    };
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

export const signupUser = createAsyncThunk<
  // Return type of the payload creator
  void,
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
    rejectValue: Error;
  }
>("auth/signupUser", async ({ username, email, password, password_confirm }, thunkApi) => {
    try {
      await axios({
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
      })
      return;
    } catch (error) {
      return thunkApi.rejectWithValue({ message: error } as Error);
    }
  }
);

export const forgotPassword = createAsyncThunk<
  // Return type of the payload creator
  { data: string },
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
  void,
  // First argument to the payload creator
  { password: string; password_confirmation: string },
  // Types for ThunkAPI
  {
    extra: {
      jwt: string;
    };
    state: RootState;
    rejectValue: Error;
  }
>("auth/newPassword", async ({ password, password_confirmation }, thunkApi) => {
  const { tokenPassword } = thunkApi.getState().auth;
  try {
    await axios({
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
    })
    return;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

export const getGames = createAsyncThunk<
  { data: Game[] },
  void,
  {
    extra: {
      jwt: string;
    };
    state: RootState;
    rejectValue: Error;
  }
>("games/getGames", async (_, thunkApi) => {
  const { token } = thunkApi.getState().auth;
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3333/games",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

export const saveBet = createAsyncThunk<
  null,
  void,
  {
    extra: {
      jwt: string;
    };
    state: RootState;
    rejectValue: Error;
  }
>("games/saveBet", async (_, thunkApi) => {
  const { token, user_id } = thunkApi.getState().auth
  const { games } = thunkApi.getState().games
  const { cart, totalPrice } = thunkApi.getState().cart;

  if (totalPrice < 30) {
    alert("As apostas devem ser de no mínimo R$ 30,00");
    return null;
  }
  
  const betsTransformed = tranformToBetType(cart, games, user_id as number);
  
  try {
    await axios({
      method: "post",
      url: "http://localhost:3333/bets",
      data: {
        bets: [...betsTransformed ],
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    return null;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
})

export const getBets = createAsyncThunk<
  null,
  {
    total: string;
    perPage: number;
    page: number;
    lastPage: number;
    data: BetsReturnType[];
  },
  {
    extra: {
      jwt: string;
    };
    state: RootState;
    rejectValue: Error;
  }
>("games/getBets", async (_, thunkApi) => {
  const { token } = thunkApi.getState().auth;

  try {
    await axios({
      method: "get",
      url: "http://localhost:3333/bets",
      headers: { Authorization: `Bearer ${token}` },
    });
    return null;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

function tranformToBetType(items: Item[], games: Game[], user_id: number){
  return items.map(item => {
    const info = returnGameInfo(games, item.type)
    return {
      user_id,
      game_id: info.id,
      total_price: item.price,
      date: new Date(item.date).toISOString(),
      numbers: item.numbers,
    };
  });
}

function returnGameInfo(games: Game[], type: string): Game{
  const game: Game[] = games.filter((game: Game) => {
    return game.type === type
  })

  return game[0]
}

