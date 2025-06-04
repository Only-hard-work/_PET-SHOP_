import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../reducers/auth.reducer";
import cartReduer from "../reducers/cart.reducer";
import petReducer from "../reducers/pet.reducer";
import petsReducer from "../reducers/pets.reducer";
import { useDispatch } from "react-redux";

const PERSISTS_CONFIGS = {
  authPersistConfig: {
    key: "auth",
    storage,
  },
};

const persistedAuthReducer = persistReducer(
  PERSISTS_CONFIGS.authPersistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: cartReduer,
    pets: petsReducer,
    pet: petReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
