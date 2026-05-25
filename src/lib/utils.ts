/**
 * Utility Functions for the Deconstruction Project
 * 
 * This module provides helper functions for class name management and other
 * common operations used throughout the application.
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with proper conflict resolution.
 * 
 * Combines clsx for conditional classes with twMerge for Tailwind class deduplication.
 * Use this function whenever you need to conditionally apply Tailwind classes.
 * 
 * @example
 * const buttonClass = cn(
 *   "px-4 py-2 rounded-lg",
 *   active && "bg-primary",
 *   !active && "bg-gray-200"
 * )
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
