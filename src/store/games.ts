import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import gamesJson from './games.json'

export type Game = {
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
  isGameCompleted: boolean
}

const initialStateObj: InitialStateType = {
  games: gamesJson.types,
  selectedGame: gamesJson.types[0],
  selectedNumbers: [],
  isGameCompleted: false
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
      console.log('remove number');
      
      state.selectedNumbers = state.selectedNumbers.filter(
        (item) => item !== action.payload
      );
    },
    clearGame: (state) => {
      state.selectedNumbers = [];
    },
    completeGame: (state) => {
      let remainingNumbers = state.selectedGame["max-number"] - state.selectedNumbers.length;
      
      if (remainingNumbers === 0) {
        remainingNumbers = state.selectedGame["max-number"];
        state.selectedNumbers = []
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

      state.isGameCompleted = true
    }
  },
});

export const gamesActions = gamesSlice.actions;
export default gamesSlice.reducer;