"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  setUserFromToken,
  clearUser,
  restoreUser,
} from "@/app/store/slices/authSlice";
import {
  JwtPayload,
  StoredUser,
} from "@/app/(unprotectedRoutes)/Login/Login.types";

const STORAGE_USER_KEY = "scout_user";
const STORAGE_TOKEN_KEY = "scout_access_token";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, features, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = localStorage.getItem(STORAGE_TOKEN_KEY);
      const storedUser = localStorage.getItem(STORAGE_USER_KEY);

      if (!token || !storedUser) {
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser: StoredUser = JSON.parse(storedUser);

        // ✅ Do not validate token here; just restore state
        dispatch(restoreUser(parsedUser));
        dispatch(setUserFromToken(jwtDecode<JwtPayload>(token)));
      } catch (err) {
        console.error("Auth restore failed", err);
        localStorage.removeItem(STORAGE_USER_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
        dispatch(clearUser());
        router.push("/Login");
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAuth();
  }, [dispatch, router]);

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      //  FORCE RESET FLOW
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
        role: decoded.roles[0]?.roleName || "",
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
    features,
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth,
  };
};
