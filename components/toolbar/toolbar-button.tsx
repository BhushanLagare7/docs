import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
}

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
