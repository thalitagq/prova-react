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
  gamesSaved: Item[];
  error: string | null;
  isBetsStoredEmpty : boolean
};

const initialState = () =>
  ({
    cart: [],
    totalPrice: 0,
    gamesSaved: [],
    error: null,
    isBetsStoredEmpty: true,
  } as InitialStateType);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState(),
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.cart.push({ ...action.payload, id: new Date().getTime() });
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; price: number }>
    ) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.totalPrice -= action.payload.price;
    },
    saveGame: (state) => {
      if (state.totalPrice < 30) {
        return
      }
      state.gamesSaved = state.gamesSaved.concat(state.cart);

      state.cart = [];
      state.totalPrice = 0;
    },
    resetSavedGames: (state) => {
      state.gamesSaved = [];
    },
    resetState: (state) => initialState(),
  },
  extraReducers: (builder) => {
    builder.addCase(getBets.fulfilled, (state, { payload }) => {
      if (payload.length !== 0) {
        state.isBetsStoredEmpty = false;
        state.gamesSaved = payload;
      }
    });

    builder.addCase(saveBet.rejected, (state, { payload }) => {
      state.error =
        payload?.message.response.data[0].message ||
        "Error ao carregar os jogos";
    });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;