import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from './games'
import cartReducer from './cart'

const store = configureStore({
  reducer: {
    games: gamesReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;