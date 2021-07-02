import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import gamesJson from './games.json'
import { Error } from './auth'
import { RootState } from './index'

const axios = require('axios')

export type Game = {
  type: string;
  description: string;
  range: number;
  price: number;
  "max-number": number;
  color: string;
  "min-cart-value": number;
};

type Bet = {
  user_id: number;
  game_id: number;
  total_price: number;
  date: Date;
  numbers: string[]
}

type InitialStateType = {
  games: Game[],
  selectedGame: Game,
  selectedNumbers: string[],
  isGameCompleted: boolean,
  status: 'idle' | 'loading' | 'pending',
  error: string | null
}

const generateRandomNumber = (range: number) => {
  return Math.ceil(Math.random() * range);
}

export const getGames = createAsyncThunk<
  {data: Game[]},
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
      headers: { Authorization: `Bearer ${token}`},
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
})

export const saveBet = createAsyncThunk<
  null,
  {bets: Bet[]},
  {
    extra: {
      jwt: string;
    };
    state: RootState;
    rejectValue: Error;
  }
>("games/saveBet", async (bets, thunkApi) => {
  const { token } = thunkApi.getState().auth;
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:3333/bets",
      data:{
        bets: {bets}
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error } as Error);
  }
});

const initialStateObj: InitialStateType = {
  games: [],
  selectedGame: gamesJson.types[0],
  selectedNumbers: [],
  isGameCompleted: false,
  status: "idle",
  error: null,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState: initialStateObj,
  reducers: {
    selectGame: (state, action: PayloadAction<string>) => {
      state.selectedGame = state.games.filter(
        (game) => game.type === action.payload
      )[0];
    },
    addNumber: (state, action: PayloadAction<string>) => {
      state.selectedNumbers.push(action.payload);
    },
    removeNumber: (state, action: PayloadAction<string>) => {
      console.log("remove number");

      state.selectedNumbers = state.selectedNumbers.filter(
        (item) => item !== action.payload
      );
    },
    clearGame: (state) => {
      state.selectedNumbers = [];
    },
    completeGame: (state) => {
      let remainingNumbers =
        state.selectedGame["max-number"] - state.selectedNumbers.length;

      if (remainingNumbers === 0) {
        remainingNumbers = state.selectedGame["max-number"];
        state.selectedNumbers = [];
        state.isGameCompleted = false;
      }

      for (let index = 0; index < remainingNumbers; index++) {
        let randomNumber = generateRandomNumber(state.selectedGame.range);
        while (state.selectedNumbers.includes(randomNumber.toString())) {
          randomNumber = generateRandomNumber(remainingNumbers);
        }
        console.log(randomNumber);

        state.selectedNumbers.push(randomNumber.toString());
      }

      state.isGameCompleted = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGames.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    
    builder.addCase(getGames.fulfilled, (state, { payload }) => {
      state.games = payload.data
      state.status = "idle";
    });

    builder.addCase(getGames.rejected, (state, { payload }) => {
      console.log("GET GAMES ERROR:", payload);
      state.error =
        payload?.message.response.data[0].message ||
        "Error ao carregar os jogos";
      state.status = "idle";
    });


  },
});

export const gamesActions = gamesSlice.actions;
export default gamesSlice.reducer;