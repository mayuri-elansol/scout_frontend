// store/slices/routeLoaderSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface RouteLoaderState {
  loading: boolean;
}

const initialState: RouteLoaderState = {
  loading: false,
};

const routeLoaderSlice = createSlice({
  name: "routeLoader",
  initialState,
  reducers: {
    startRouteLoading(state) {
      state.loading = true;
    },
    stopRouteLoading(state) {
      state.loading = false;
    },
  },
});

export const { startRouteLoading, stopRouteLoading } =
  routeLoaderSlice.actions;

export default routeLoaderSlice.reducer;
