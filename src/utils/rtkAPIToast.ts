import { store } from "../../src/app/store/store";
import {
  showToast,
  hideToast,
} from "../app/components/organisms/toaster/toasterSlice";
import { v4 as uuidv4 } from "uuid";

/**
 * Utility to trigger global toast notifications without needing useDispatch.
 *
 * @param message - The message to display in the toast
 * @param severity - The alert severity type ('success' | 'info' | 'warning' | 'error')
 */
export function triggerToast(
  message: string,
  severity: "success" | "info" | "warning" | "error" = "success",
  duration: number = 4000
): void {
  const id = uuidv4();

  store.dispatch(
    showToast({
      id,
      message,
      severity,
    })
  );

  // auto-remove from Redux after timeout
  setTimeout(() => {
    store.dispatch(hideToast(id));
  }, duration);
}
