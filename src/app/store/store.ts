// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import featureFlagsReducer from "./fetureFlagSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    featureFlags: featureFlagsReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
