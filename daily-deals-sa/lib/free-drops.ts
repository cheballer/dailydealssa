import { FREE_DROPS_CONFIG } from './constants';

/**
 * Get current time in Africa/Johannesburg timezone
 */
export function getSASTTime(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: FREE_DROPS_CONFIG.timezone }));
}

/**
 * Check if a free drop is currently active (dropped and not claimed)
 */
export function isDropActive(dropAt: Date, claimedAt: Date | null): boolean {
  const now = new Date();
  const dropTime = new Date(dropAt);
  
  // Drop is active if:
  // 1. Current time is at or after drop time
  // 2. It hasn't been claimed yet
  return now >= dropTime && !claimedAt;
}

/**
 * Generate random drop times for today between start and end hours (SAST)
 */
export function generateDropTimes(count: number): Date[] {
  const now = getSASTTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const startMs = today.getTime() + (FREE_DROPS_CONFIG.startHour * 60 * 60 * 1000);
  const endMs = today.getTime() + (FREE_DROPS_CONFIG.endHour * 60 * 60 * 1000);
  const rangeMs = endMs - startMs;
  
  const times: Date[] = [];
  for (let i = 0; i < count; i++) {
    const randomMs = startMs + Math.random() * rangeMs;
    times.push(new Date(randomMs));
  }
  
  // Sort chronologically
  return times.sort((a, b) => a.getTime() - b.getTime());
}

/**
 * Check if we're currently in the drop window (08:00-12:00 SAST)
 */
export function isInDropWindow(): boolean {
  const now = getSASTTime();
  const hour = now.getHours();
  return hour >= FREE_DROPS_CONFIG.startHour && hour < FREE_DROPS_CONFIG.endHour;
}

/**
 * Get start of today in SAST
 */
export function getStartOfToday(): Date {
  const now = getSASTTime();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

/**
 * Get end of today in SAST
 */
export function getEndOfToday(): Date {
  const now = getSASTTime();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
}

