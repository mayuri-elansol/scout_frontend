// "use client";

// import { useEffect, useState, ReactNode } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/app/store/store";
// import { showToast } from "@/app/store/slices/toasterSlice";
// import { apiRoutes } from "@/constants/apiRoutes";
// import Loader from "@/app/components/atoms/Loader/Loader";
// import { clearUser } from "@/app/store/slices/authSlice";
// import { useAuth } from "@/customhooks/useAuth"; // ✅ Import this

// type AuthGuardProps = {
//   readonly children: ReactNode;
// };

// export default function AuthGuard({ children }: AuthGuardProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const dispatch = useDispatch();

//   // ✅ Call useAuth to trigger restoration
//   const { isLoading: authLoading } = useAuth();

//   const { token, user, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth,
//   );

//   const [isChecking, setIsChecking] = useState(true);
//   const [isValid, setIsValid] = useState(false);

//   const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const validateToken = async () => {
//     if (!token || !user?.org_id) return false;

//     try {
//       const res = await fetch(
//         `${BASE_URL}/${apiRoutes.authentication.root}${apiRoutes.authentication.validateToken}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token, orgId: user.org_id }),
//         },
//       );

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Session expired");

//       return true;
//     } catch (err) {
//       dispatch(
//         showToast({
//           message:
//             err instanceof Error
//               ? err.message
//               : "Session expired. Please login again.",
//           severity: "error",
//         }),
//       );
//       return false;
//     }
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       // ✅ Wait for useAuth to finish restoring
//       if (authLoading) {
//         return;
//       }

//       // ✅ Allow login page always
//       if (pathname.toLowerCase() === "/login") {
//         setIsValid(true);
//         setIsChecking(false);
//         return;
//       }

//       // ✅ Check if we're still waiting for restoration from localStorage
//       const storedToken = localStorage.getItem("scout_access_token");

//       // Case 1: Has stored token but Redux hasn't restored yet → Wait
//       if (storedToken && !isAuthenticated) {
//         return;
//       }

//       // Case 2: No stored token and not authenticated → Redirect
//       if (!storedToken && !isAuthenticated) {
//         setIsChecking(false);
//         setIsValid(false);
//         router.replace("/Login");
//         return;
//       }

//       // Case 3: Redux restored but missing user/token → Redirect
//       if (!user || !token) {
//         setIsChecking(false);
//         setIsValid(false);
//         router.replace("/Login");
//         return;
//       }

//       // Case 4: Everything ready → Validate token
//       const valid = await validateToken();

//       if (!valid) {
//         localStorage.removeItem("scout_user");
//         localStorage.removeItem("scout_access_token");
//         dispatch(clearUser());
//         setIsValid(false);
//         setIsChecking(false);
//         router.replace("/Login");
//       } else {
//         setIsValid(true);
//         setIsChecking(false);
//       }
//     };

//     checkAuth();
//   }, [pathname, user, token, isAuthenticated, authLoading]); // ✅ Add authLoading

//   // Show loader while checking auth
//   if (authLoading || isChecking) return <Loader />;

//   // Block invalid routes
//   if (!isValid) return null;

//   // Render protected content
//   return <>{children}</>;
// }
"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { showToast } from "@/app/store/slices/toasterSlice";
import { apiRoutes } from "@/constants/apiRoutes";
import Loader from "@/app/components/atoms/Loader/Loader";
import { clearUser } from "@/app/store/slices/authSlice";
import { useAuth } from "@/customhooks/useAuth";

type AuthGuardProps = {
  readonly children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { isLoading: authLoading } = useAuth();

  const { token, user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const validateToken = async () => {
    if (token && user?.org_id) {
      try {
        const res = await fetch(
          `${BASE_URL}/${apiRoutes.authentication.root}${apiRoutes.authentication.validateToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, orgId: user.org_id }),
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Session expired");

        return true;
      } catch (err) {
        dispatch(
          showToast({
            message:
              err instanceof Error
                ? err.message
                : "Session expired. Please login again.",
            severity: "error",
          }),
        );
      }
    }
    return false;
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (authLoading) return;

      // Always allow login page
      if (pathname.toLowerCase() === "/login") {
        setIsValid(true);
        setIsChecking(false);
        return;
      }

      const storedToken = localStorage.getItem("scout_access_token");

      // Wait if stored token exists but Redux not yet restored
      if (storedToken && !isAuthenticated) return;

      // Redirect if no token/user
      if (!storedToken || !isAuthenticated || !user || !token) {
        setIsValid(false);
        setIsChecking(false);
        router.replace("/Login");
        return;
      }

      // Validate token
      const valid = await validateToken();
      if (valid) {
        setIsValid(true);
      } else {
        localStorage.removeItem("scout_user");
        localStorage.removeItem("scout_access_token");
        dispatch(clearUser());
        setIsValid(false);
        router.replace("/Login");
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, user, token, isAuthenticated, authLoading]);

  if (authLoading || isChecking) return <Loader />;
  if (!isValid) return null;

  return <>{children}</>;
}