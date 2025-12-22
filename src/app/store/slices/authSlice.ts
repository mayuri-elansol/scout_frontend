

// import { JwtPayload, StoredUser } from "@/app/(unprotectedRoutes)/Login/Login.types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   user: JwtPayload | null;
//   features: string[];
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   features: [],
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // 🔐 Login (trusted token)
//     setUserFromToken: (state, action: PayloadAction<JwtPayload>) => {
//       state.user = action.payload;
//       state.features = action.payload.features ?? [];
//       state.isAuthenticated = true;
//     },

//     // 🔁 Restore (NO features)
//     restoreUser: (state, action: PayloadAction<StoredUser>) => {
//       state.user = action.payload as JwtPayload;
//       state.isAuthenticated = true;
//       // ❗ features remain EMPTY
//     },

//     clearUser: (state) => {
//       state.user = null;
//       state.features = [];
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const {
//   setUserFromToken,
//   restoreUser,
//   clearUser,
// } = authSlice.actions;

// export default authSlice.reducer;

// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtPayload, StoredUser } from "@/app/(unprotectedRoutes)/Login/Login.types";

interface AuthState {
  user: JwtPayload | null;
  features: string[];
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  features: [],
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔐 Login or restore from token (trusted token)
    setUserFromToken: (state, action: PayloadAction<JwtPayload>) => {
      state.user = action.payload;
      state.features = action.payload.features ?? [];
      state.isAuthenticated = true;
    },

    // 🔁 Restore minimal user from localStorage (no features)
    restoreUser: (state, action: PayloadAction<StoredUser>) => {
      state.user = {
        ...action.payload,
        features: [],     // features remain empty until token decoded
        licenses: null,   // licenses not stored in localStorage
      } as JwtPayload;
      state.features = [];
      state.isAuthenticated = true;
    },

    // 🚪 Logout
    clearUser: (state) => {
      state.user = null;
      state.features = [];
      state.isAuthenticated = false;
    },
  },
});

export const { setUserFromToken, restoreUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
