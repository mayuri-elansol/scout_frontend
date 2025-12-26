
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setUserFromToken, clearUser, restoreUser } from "@/app/store/slices/authSlice";
import { JwtPayload, StoredUser } from "@/app/(unprotectedRoutes)/Login/Login.types";

const STORAGE_USER_KEY = "scout_user";
const STORAGE_TOKEN_KEY = "scout_access_token";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, features, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isLoading, setIsLoading] = useState(true);

  // 🔁 Restore auth on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_USER_KEY);
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);

    if (storedUser && token) {
      try {
        const parsedUser: StoredUser = JSON.parse(storedUser);

        // Step 1: Restore minimal user from localStorage
        dispatch(restoreUser(parsedUser));

        // Step 2: Decode token to restore full state including features/licenses
        const decoded = jwtDecode<JwtPayload>(token);
        dispatch(setUserFromToken(decoded));
      } catch (err) {
        console.error("Failed to restore auth from storage", err);
        localStorage.removeItem(STORAGE_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        dispatch(clearUser());
      }
    }

    setIsLoading(false);
  }, [dispatch]);

  // ✅ LOGIN: store token + minimal user, Redux gets full payload
  // const login = (token: string) => {
  //   try {
  //     const decoded = jwtDecode<JwtPayload>(token);

  //     // Full state for Redux
  //     const userForState: JwtPayload = {
  //       userId: decoded.userId,
  //       userName: decoded.userName,
  //       roles: decoded.roles,
  //       licenses: decoded.licenses,        // Redux only
  //       features: decoded.features ?? [],  // Redux only
  //       org_id: decoded.org_id,
  //       sid: decoded.sid,
  //     };

  //     // Minimal user for localStorage
  //     const userForStorage: StoredUser = {
  //       userId: decoded.userId,
  //       userName: decoded.userName,
  //       roles: decoded.roles,
  //       org_id: decoded.org_id,
  //     };

  //     // Save to localStorage
  //     localStorage.setItem(STORAGE_TOKEN_KEY, token);
  //     localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userForStorage));

  //     // Set Redux state
  //     dispatch(setUserFromToken(userForState));
  //  if (decoded.sid) {
  //     router.push(`/ResetPassword/${decoded.sid}`);
  //   } else {
  //     router.push("/SafetyAndComplianceDashboard");
  //   }
  //     return userForState;
  //   } catch (err) {
  //     console.error("Invalid token", err);
  //   }
  // };
const login = (token: string) => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // 🚨 FORCE RESET FLOW
    if (decoded.sid) {
      router.push(`/ResetPassword/${decoded.sid}`);
    return { type: "RESET_REQUIRED" as const };
    }

    // ✅ NORMAL LOGIN FLOW (NO sid)

    const userForState: JwtPayload = {
      userId: decoded.userId,
      userName: decoded.userName,
      roles: decoded.roles,
      licenses: decoded.licenses,
      features: decoded.features ?? [],
      org_id: decoded.org_id,
    };

    const userForStorage: StoredUser = {
      userId: decoded.userId,
      userName: decoded.userName,
      roles: decoded.roles,
      org_id: decoded.org_id,
    };

    // Store ONLY when sid is NOT present
    localStorage.setItem(STORAGE_TOKEN_KEY, token);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userForStorage));

    dispatch(setUserFromToken(userForState));

    router.push("/SafetyAndComplianceDashboard");
    // return userForState;
return { type: "LOGIN_SUCCESS" as const, user: userForState };

  } catch (err) {
    console.error("Invalid token", err);
  }
};

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    dispatch(clearUser());
    router.push("/Login");
  };

  // 🔒 Client-side auth guard
  const requireAuth = (redirectTo = "/Login") => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  return {
    user,
    features,       // always from decoded token
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth,
  };
};
