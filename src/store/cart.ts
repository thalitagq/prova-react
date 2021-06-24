import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
};

const initialState: InitialStateType = {
  cart: [],
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.cart.push({ ...action.payload, id: new Date().getTime() });
      state.totalPrice += action.payload.price;
    },

    removeFromCart: (state, action: PayloadAction<number>)=>{
      state.cart = state.cart.filter( item => item.id !== action.payload)
      state.totalPrice -= action.payload;
    },
  }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;