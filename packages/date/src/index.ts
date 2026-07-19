import dayjs from "dayjs";
import type { ConfigType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const APP_TIMEZONE = "Europe/Paris";
dayjs.tz.setDefault(APP_TIMEZONE);

export function toAppTime(date?: ConfigType) {
  return dayjs(date).tz(APP_TIMEZONE);
}

export function formatDate(date?: ConfigType, template = "DD/MM/YYYY HH:mm") {
  return toAppTime(date).format(template);
}

// ISO 8601 avec l'offset Europe/Paris (ex: "2026-07-19T11:45:00+02:00").
export function formatISO(date?: ConfigType) {
  return toAppTime(date).format();
}

export { dayjs };
export type { ConfigType, Dayjs } from "dayjs";
