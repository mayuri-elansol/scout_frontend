
// utils/getErrorMessage.ts
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getErrorMessage(
  err: unknown,
  fallback = "Failed to assign features"
): string {
  // RTK Query error
  if (isFetchBaseQueryError(err)) {
    if (
      typeof err.data === "object" &&
      err.data !== null &&
      "message" in err.data
    ) {
      return String((err.data as { message?: string }).message);
    }
    return fallback;
  }

  // Redux SerializedError
  if (
    typeof err === "object" &&
    err !== null &&
    "message" in err
  ) {
    return String((err as SerializedError).message);
  }

  // Native Error
  if (err instanceof Error) {
    return err.message;
  }

  // String error
  if (typeof err === "string") {
    return err;
  }

  return fallback;
}

// utils/typeGuards.ts

 function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error
  );
}
