/**
 * @file Full-screen loading indicator component.
 * Displays a centered spinner with optional label text.
 * @module components/fullscreen-loader
 */

import { LoaderIcon } from "lucide-react";

/**
 * Props for the FullScreenLoader component.
 * @interface FullScreenLoaderProps
 * @property {string} [label] - Optional label text to display below the spinner
 */
interface FullScreenLoaderProps {
  label?: string;
}

/**
 * A full-screen loading indicator component.
 * Displays a centered animated spinner with an optional text label.
 *
 * @param {FullScreenLoaderProps} props - The component props
 * @param {string} [props.label] - Optional label text to display
 * @returns {JSX.Element} The rendered loader component
 *
 * @example
 * <FullScreenLoader label="Loading..." />
 */
export const FullScreenLoader = ({ label }: FullScreenLoaderProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
      <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
