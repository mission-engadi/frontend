'use client';

import { ReactNode } from 'react';

/**
 * SafeHydration wrapper component that suppresses hydration warnings
 * for content that may differ between server and client (dates, numbers with locale formatting)
 */
export function SafeHydration({ children }: { children: ReactNode }) {
  return <span suppressHydrationWarning>{children}</span>;
}

/**
 * Safely formats a number with locale-specific formatting
 * Suppresses hydration warnings automatically
 */
export function SafeNumber({ value }: { value: number }) {
  return <span suppressHydrationWarning>{value.toLocaleString()}</span>;
}

/**
 * Safely formats a date with locale-specific formatting
 * Suppresses hydration warnings automatically
 */
export function SafeDate({ date, options }: { date: Date | string; options?: Intl.DateTimeFormatOptions }) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return <span suppressHydrationWarning>{dateObj.toLocaleString(undefined, options)}</span>;
}

/**
 * Safely formats a date as date-only (no time)
 * Suppresses hydration warnings automatically
 */
export function SafeDateOnly({ date }: { date: Date | string }) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return <span suppressHydrationWarning>{dateObj.toLocaleDateString()}</span>;
}

/**
 * Safely formats a date as time-only (no date)
 * Suppresses hydration warnings automatically
 */
export function SafeTime({ date }: { date: Date | string }) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return <span suppressHydrationWarning>{dateObj.toLocaleTimeString()}</span>;
}
