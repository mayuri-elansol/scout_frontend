"use client";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { startRouteLoading } from "@/app/store/slices/routeLoaderSlice";

export const useRouteNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (path?: string) => {
    if (!path || pathname === path) return;

    dispatch(startRouteLoading());
    router.push(path);
  };
};
