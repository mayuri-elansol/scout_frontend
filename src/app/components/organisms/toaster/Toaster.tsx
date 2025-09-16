"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import Alert from "@mui/material/Alert";
import { hideToast } from "./toasterSlice";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Toaster() {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toasterGlobal.toasts);

  // auto-hide each toast after 4s
  useEffect(() => {
    if (toasts.length > 0) {
      const timers = toasts.map((toast) =>
        setTimeout(() => {
          dispatch(hideToast(toast.id));
        }, 4000)
      );
      return () => timers.forEach((t) => clearTimeout(t));
    }
  }, [toasts, dispatch]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: "65px",
        right: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        zIndex: 1400,
      }}
    >
      {toasts.map((toast, index) => (
        <Alert
          key={toast.id}
          severity={toast.severity}
          variant="filled"
          sx={{
            fontSize: "0.75rem",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            color: "#fff !important",
            "& .MuiAlert-icon": { color: "#fff !important" },
            backgroundColor:
              toast.severity === "success"
                ? "#4caf50"
                : toast.severity === "error"
                ? "#e71d36"
                : toast.severity === "warning"
                ? "#fcca46"
                : "#0353a4",
          }}
        >
          {toast.message}
        </Alert>
      ))}
    </Box>
  );
}
