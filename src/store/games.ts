import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import gamesJson from './games.json'

type Game = {
  type: string;
  description: string;
  range: number;
  price: number;
  "max-number": number;
  color: string;
  "min-cart-value": number;
};

type InitialStateType = {
  games: Game[],
  selectedGame: Game,
  selectedNumbers: string[],
}

const initialStateObj: InitialStateType = {
  games: gamesJson.types,
  selectedGame: gamesJson.types[0],
  selectedNumbers: [],
};

const generateRandomNumber = (range: number) => {
  return Math.ceil(Math.random() * range);
}

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
      state.selectedNumbers = state.selectedNumbers.filter(
        (item) => item !== action.payload
      );
    },
    clearGame: (state) => {
      state.selectedNumbers = [];
    },
    completeGame: (state) => {
      const remainingNumbers =
        state.selectedGame["max-number"] - state.selectedNumbers.length;
      for (let index = 0; index < remainingNumbers; index++) {
        let randomNumber = generateRandomNumber(state.selectedGame.range);
        while (state.selectedNumbers.includes(randomNumber.toString())) {
          randomNumber = generateRandomNumber(remainingNumbers);
        }
        state.selectedNumbers.push(randomNumber.toString());
      }
    }
  },
});

export const gamesActions = gamesSlice.actions;
export default gamesSlice.reducer;