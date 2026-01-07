/**
 * @file User color generation utility.
 * Generates consistent colors for users based on their IDs.
 * @module lib/user-colors
 */

/**
 * Generate a consistent color for a user based on their ID.
 * Uses a simple hash function to convert the user ID into an HSL color.
 *
 * @param userId - The user's unique identifier
 * @returns A color string in HSL format (e.g., "hsl(240, 70%, 50%)")
 */
export function generateUserColor(userId: string): string {
  // Simple hash function to generate a number from the user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash | 0; // Convert to 32-bit integer
  }

  // Generate hue (0-360) from the hash
  const hue = Math.abs(hash % 360);

  // Use fixed saturation and lightness for vibrant, readable colors
  return `hsl(${hue}, 70%, 50%)`;
}
