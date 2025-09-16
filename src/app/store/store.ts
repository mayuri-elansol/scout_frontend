import { configureStore } from "@reduxjs/toolkit";
import toasterReducer from "../../../src/app/components/organisms/toaster/toasterSlice";
import featureFlagsReducer from "./fetureFlag";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    toasterGlobal: toasterReducer, // ✅ correct key
    featureFlags: featureFlagsReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
