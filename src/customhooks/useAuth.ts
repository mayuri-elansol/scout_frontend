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
        const decoded = jwtDecode<JwtPayload>(token);

        // ✅ FIXED: Pass correct payload structure
        dispatch(restoreUser({ 
          user: parsedUser, 
          token: token 
        }));

        // ✅ FIXED: Build complete payload for setUserFromToken
        dispatch(setUserFromToken({
          token: token,
          user: parsedUser,
          roles: decoded.roles,
          licenses: decoded.licenses,
          features: decoded.features ?? []
        }));

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

      // FORCE RESET FLOW
      if (decoded.sid) {
        router.push(`/ResetPassword/${decoded.sid}`);
        return { type: "RESET_REQUIRED" as const };
      }

      // ✅ NORMAL LOGIN FLOW
      const userForStorage: StoredUser = {
        userId: decoded.userId,
        userName: decoded.userName,
        role: decoded.roles[0]?.roleName || "",
        org_id: decoded.org_id,
      };

      // Store in localStorage
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userForStorage));

      // ✅ FIXED: Pass complete payload
      dispatch(setUserFromToken({
        token: token,
        user: userForStorage,
        roles: decoded.roles,
        licenses: decoded.licenses,
        features: decoded.features ?? []
      }));

      router.push("/Dashboard");
      return { type: "LOGIN_SUCCESS" as const };
    } catch (err) {
      console.error("Invalid token", err);
      return { type: "LOGIN_FAILED" as const };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    dispatch(clearUser());
    router.push("/Login");
  };

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

