import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from './games'
import cartReducer from './cart'
import authReducer from './auth'

const store = configureStore({
  reducer: {
    games: gamesReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;