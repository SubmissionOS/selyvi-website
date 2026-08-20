import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui-Standardhelfer: Klassen zusammenfuehren, Tailwind-Konflikte aufloesen. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
