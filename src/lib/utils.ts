import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatError(error: any): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unknown error occurred';
}