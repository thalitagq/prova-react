import { AnyAction, combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import gamesReducer from './games'
import cartReducer from './cart'
import authReducer from './auth'
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['games', 'cart']
};

const combinedReducer = combineReducers({
  games: gamesReducer,
  cart: cartReducer,
  auth: authReducer,
});

const rootReducer = (
  state: RootState,
  action: AnyAction
) => {
  return combinedReducer(state, action);
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

// const store = configureStore({
//   reducer: {
//     games: gamesReducer,
//     cart: cartReducer,
//     auth: authReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof combinedReducer>;
export default store
export type AppDispatch = typeof store.dispatch