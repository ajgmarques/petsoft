import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function differenceInDays(date: Date) {
  if (!date) {
    return 1;
  }

  const dateField = new Date(date);
  const today = new Date();

  const differenceInTime = today.getTime() - date.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}
