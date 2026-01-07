/**
 * @file Reusable toolbar button component.
 * A basic button with icon, label, and active state styling.
 * @module components/toolbar/toolbar-button
 */

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Props for the ToolbarButton component.
 * @interface ToolbarButtonProps
 * @property {string} label - The button label (used for aria-label and title)
 * @property {LucideIcon} icon - The Lucide icon component to display
 * @property {function} [onClick] - Optional click handler
 * @property {boolean} [isActive] - Whether the button is in an active state
 */
interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

/**
 * A reusable toolbar button component with icon display.
 * Supports active state styling and accessibility attributes.
 *
 * @param {ToolbarButtonProps} props - The component props
 * @param {string} props.label - The button label for accessibility
 * @param {LucideIcon} props.icon - The icon to display
 * @param {function} [props.onClick] - Optional click handler
 * @param {boolean} [props.isActive] - Active state for styling
 * @returns {JSX.Element} The rendered toolbar button
 */
export const ToolbarButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
}: ToolbarButtonProps) => {
  return (
    <button
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        "flex justify-center items-center h-7 text-sm rounded-sm min-w-7 hover:bg-muted-foreground/30",
        isActive && "bg-muted-foreground/30"
      )}
      title={label}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </button>
  );
};
