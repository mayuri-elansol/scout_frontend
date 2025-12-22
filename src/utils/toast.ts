import { store } from "../../src/app/store/store";
import {
  showToast,
  hideToast,
} from "../app/store/slices/toasterSlice";
import { v4 as uuidv4 } from "uuid";

/**
 * Utility to trigger global toast notifications
 */
export function triggerToast(
  message: string,
  severity: "success" | "info" | "warning" | "error" = "success",
  duration: number = 4000
): void {
  const id = uuidv4();

  store.dispatch(showToast({ id, message, severity }));

  // Auto-remove after duration
  setTimeout(() => {
    store.dispatch(hideToast(id));
  }, duration);
}
