import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

interface ToasterState {
  toasts: Toast[];
}

const initialState: ToasterState = {
  toasts: [],
};

const toasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      // ✅ latest toast always on top
      state.toasts.unshift(action.payload);
    },
    hideToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { showToast, hideToast } = toasterSlice.actions;
export default toasterSlice.reducer;
