// src/store/featureFlagsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FeatureFlagsState {
  [key: string]: boolean; // e.g., "dashboard": true
}

const initialState: FeatureFlagsState = {};

const featureFlagsSlice = createSlice({
  name: "featureFlags",
  initialState,
  reducers: {
    setFeatureFlags: (state, action: PayloadAction<FeatureFlagsState>) => action.payload,
    updateFeatureFlag: (
      state,
      action: PayloadAction<{ key: string; value: boolean }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setFeatureFlags, updateFeatureFlag } = featureFlagsSlice.actions;
export default featureFlagsSlice.reducer;
