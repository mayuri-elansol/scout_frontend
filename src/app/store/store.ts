import { configureStore } from "@reduxjs/toolkit";
import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import toasterReducer from "@/app/components/organisms/toaster/toasterSlice";
import featureFlagsReducer from "./fetureFlagSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    toasterGlobal: toasterReducer,
    featureFlags: featureFlagsReducer,
    language: languageReducer,
    [baseProtectedApi.reducerPath]: baseProtectedApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseProtectedApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
