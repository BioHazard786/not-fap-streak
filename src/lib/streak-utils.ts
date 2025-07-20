/**
 * Utility functions for streak calculations
 */

/**
 * Calculate the current streak
 */
export function getDateDifference(startDate: string) {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();

  if (diffMs < 0) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const totalDays = Math.floor(hours / 24);

  const years = Math.floor(totalDays / 365.25);
  const remainingDays = totalDays - Math.floor(years * 365.25);
  const months = Math.floor(remainingDays / 30.44);
  const days = Math.floor(remainingDays % 30.44);

  return {
    years,
    months,
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
  };
}

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 */
export function getTodayISOString(): string {
  return new Date().toISOString();
}

/**
 * Hash a secret using a simple hash function
 * Note: For production, consider using a more secure hashing library
 */
export async function hashSecret(secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(secret);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verify a secret against its hash
 */
export async function verifySecret(
  secret: string,
  hash: string
): Promise<boolean> {
  const secretHash = await hashSecret(secret);
  return secretHash === hash;
}
