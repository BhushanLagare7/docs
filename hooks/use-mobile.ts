/**
 * @file Mobile detection hook.
 * Detects if the viewport width is below the mobile breakpoint.
 * @module hooks/use-mobile
 */

import * as React from "react";

/**
 * Mobile breakpoint in pixels.
 * Viewports below this width are considered mobile.
 * @constant {number}
 */
const MOBILE_BREAKPOINT = 768;

/**
 * A custom hook that detects if the current viewport is mobile-sized.
 * Uses a media query to listen for viewport changes.
 *
 * @returns {boolean} True if viewport width is less than 768px
 *
 * @example
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile UI
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    /**
     *
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
