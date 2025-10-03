import { configureStore } from "@reduxjs/toolkit";
import toasterReducer from "../../../src/app/components/organisms/toaster/toasterSlice";
import featureFlagsReducer from "./fetureFlagSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    toasterGlobal: toasterReducer, 
    featureFlags: featureFlagsReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
