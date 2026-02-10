

// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoredUser } from "@/app/(unprotectedRoutes)/Login/Login.types";
export interface Role {
  appId: string;
  roleId: string;
  appName: string;
  roleName: string;
  userRoleId: string;
}

export interface License {
  appId: string;
  features: string[];
  expiresOn: string;
  licenseId: string;
  licenseTypeId: string;
  licenseTypeName: string;
}
interface AuthState {
  user: StoredUser | null;   // UI identity
  token: string | null;      // auth
  roles: Role[];             // from JWT
  licenses: License[];       // from JWT
  features: string[];
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  roles: [],
  licenses: [],
  features: [],
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔐 LOGIN (JWT decoded)
    setUserFromToken: (
      state,
      action: PayloadAction<{
        token: string;
        user: StoredUser;
        roles: Role[];
        licenses: License[];
        features?: string[];
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.licenses = action.payload.licenses;
      state.features = action.payload.features ?? [];
      state.isAuthenticated = true;
    },

    // 🔁 RESTORE (localStorage only)
    restoreUser: (
      state,
      action: PayloadAction<{
        user: StoredUser;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    // 🚪 LOGOUT
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.licenses = [];
      state.features = [];
      state.isAuthenticated = false;
    },
  },
});

export const { setUserFromToken, restoreUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
