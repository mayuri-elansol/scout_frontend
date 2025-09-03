// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import featureFlagsReducer from "./fetureFlag";

export const store = configureStore({
  reducer: {
    featureFlags: featureFlagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
