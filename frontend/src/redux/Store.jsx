import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/Slices/Slice";
import productsReducer from "./ProductSlice";
import authReducer from "./Slices/AuthSlice";

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

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
