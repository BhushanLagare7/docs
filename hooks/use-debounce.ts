/**
 * @file Debounce hook for delaying function execution.
 * Prevents rapid-fire function calls by waiting for a pause in invocations.
 * @module hooks/use-debounce
 */

import { useCallback, useRef } from "react";

/**
 * A custom hook that debounces a callback function.
 * Delays the execution of the callback until after a specified delay
 * has passed since the last invocation.
 *
 * @template T - The type of the callback function
 * @param {T} callback - The function to debounce
 * @param {number} [delay=500] - The debounce delay in milliseconds
 * @returns {function} A debounced version of the callback
 *
 * @example
 * const debouncedSave = useDebounce((value) => saveToServer(value), 1000);
 */
export function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
