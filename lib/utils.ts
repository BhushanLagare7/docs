/**
 * @file Utility functions for className manipulation.
 * Provides the cn helper for merging Tailwind classes.
 * @module lib/utils
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS classes.
 * Uses clsx for conditional classes and tailwind-merge to deduplicate.
 *
 * @param {...ClassValue[]} inputs - Class values to merge
 * @returns {string} Merged className string
 *
 * @example
 * cn("px-4", "py-2", condition && "bg-blue-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
