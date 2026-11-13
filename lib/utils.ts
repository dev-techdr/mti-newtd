import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUpdated(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00.000Z`));
}

export function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
