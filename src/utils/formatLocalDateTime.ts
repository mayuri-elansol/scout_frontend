import dayjs, { Dayjs } from "dayjs";

/**
 * Formats a date/time value into local datetime string
 * Format: YYYY-MM-DD HH:mm:ss.SSS
 */
export const formatLocalDateTime = (dt: string | Dayjs | undefined): string => {
  if (!dt) return "";

  const parsed = typeof dt === "string" ? dayjs(dt) : dt;
  return parsed.format("YYYY-MM-DD HH:mm:ss.SSS");
};
