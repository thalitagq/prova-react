import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBets, saveBet } from "./api";

export type Item = {
  id: number
  type: string;
  numbers: string[];
  date: string;
  price: number;
  color: string
}

type InitialStateType = {
  cart: Item[];
  totalPrice: number;
  gamesSaved: Item[]
};

const initialState: InitialStateType = {
  cart: [],
  totalPrice: 0,
  gamesSaved: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.cart.push({ ...action.payload, id: new Date().getTime() });
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<{id: number, price: number}>)=>{
      state.cart = state.cart.filter( item => item.id !== action.payload.id)
      state.totalPrice -= action.payload.price;
    },
    saveGame: (state) => {
      // if (state.totalPrice < 30) {
      //   return alert('As apostas devem ser de no mínimo R$ 30,00')
      // }
      state.gamesSaved.push(state.cart)

      state.cart = []
      state.totalPrice = 0
    },
    resetSavedGames: (state) => {
      state.gamesSaved = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBets.fulfilled , (state, {payload})=>{
      if (payload) {
        state.gamesSaved = payload.data
      }
    })
  }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;