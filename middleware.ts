// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import {jwtDecode} from "jwt-decode";
// import { hasFeature } from "@/utils/hasFeature";
// import { dashboardMenu, analyticsMenu, settingsMenu, liveStreamingMenu } from "./src/app/config/menuConfig";

// interface JwtPayload {
//   userId: string;
//   userName: string;
//   roles: string;
//   features: string[];
//   exp: number;
//   iat: number;
//   org_id: string;
// }

// // Flatten all menu items into a single array
// const allMenuItems = [
//   ...liveStreamingMenu,
//   ...dashboardMenu.flatMap(cat => cat.items),
//   ...settingsMenu.flatMap(cat => cat.items),
//   ...analyticsMenu.flatMap(cat => cat.items),
// ];

// function getFeatureIdByPath(pathname: string): string | undefined {
//   const menuItem = allMenuItems.find(item => item.path === pathname);
//   return menuItem?.featureId;
// }

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Public paths
//   const publicPaths = ["/login", "/signup", "/"];

//   if (publicPaths.includes(pathname) || pathname.startsWith("/_next/")) {
//     return NextResponse.next();
//   }

//   // Get token from Authorization header
//   const authHeader = req.headers.get("authorization");
//   if (!authHeader?.startsWith("Bearer ")) {
//     return NextResponse.redirect(new URL("/Login", req.url));
//   }

//   const token = authHeader.split(" ")[1];

//   let decoded: JwtPayload;
//   try {
//     decoded = jwtDecode<JwtPayload>(token);
//   } catch (err) {
//     console.error("Invalid token:", err);
//     return NextResponse.redirect(new URL("/Login", req.url));
//   }

//   // Check if token is expired
//   const now = Math.floor(Date.now() / 1000);
//   if (decoded.exp && decoded.exp < now) {
//     return NextResponse.redirect(new URL("/Login", req.url));
//   }

//   const userFeatures = decoded.features || [];

//   // Feature guard: check if the user has permission for this route
//   const requiredFeatureId = getFeatureIdByPath(pathname);
//   if (requiredFeatureId && !hasFeature(userFeatures, requiredFeatureId)) {
//     return NextResponse.redirect(new URL("/UnauthorizedAccess", req.url));
//   }

//   return NextResponse.next();
// }

// // Apply middleware to all routes except static files, API routes, images
// // middleware.ts
// export const config = {
//   matcher: [
//     /*
//       Match all routes except:
//       - api routes
//       - _next static files
//       - images
//       - favicon
//     */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

// middleware.ts (ROOT LEVEL)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { hasFeature } from "@/utils/hasFeature";
import {
  dashboardMenu,
  analyticsMenu,
  settingsMenu,
  liveStreamingMenu,
} from "./src/app/config/menuConfig";

interface JwtPayload {
  features: string[];
  exp: number;
}

// Flatten all routes
const allRoutes = [
  ...liveStreamingMenu,
  ...dashboardMenu.flatMap(c => c.items),
  ...analyticsMenu.flatMap(c => c.items),
  ...settingsMenu.flatMap(c => c.items),
];

const getFeatureForPath = (path: string) =>
  allRoutes.find(r => r.path === path)?.featureId;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🌍 Public routes
  const publicRoutes = [
    "/",
    "/Login",
    "/UnauthorizedAccess",
  ];

  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // 🔐 Read token from COOKIE
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  let decoded: JwtPayload;
  try {
    decoded = jwtDecode(token);
  } catch {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  // ⏰ Token expiry
  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp < now) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  // 🧩 Feature guard
  const requiredFeature = getFeatureForPath(pathname);

  if (
    requiredFeature &&
    !hasFeature(decoded.features || [], requiredFeature)
  ) {
    return NextResponse.redirect(
      new URL("/UnauthorizedAccess", req.url)
    );
  }

  // ✅ Access granted
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
