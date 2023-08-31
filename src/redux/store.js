import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import quizReducer from "./quizReducer";
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
// Persist configuration
const persistConfig = {
  key: "root", // key for storage
  version: 1,
  storage, // storage method (e.g., local storage)
};

const persistedReducer = persistReducer(persistConfig, quizReducer);

export const store = configureStore({
  reducer: {
    quizReducer: persistedReducer, // Use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // Create the persistor

export const useAppSelector = useSelector;
