import { alignments } from "@/constants/toolbar";
import { useEditorStore } from "@/store/use-editor-store";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AlignButton = () => {
  const { editor } = useEditorStore();

  const currentAlignment =
    alignments.find(({ value }) => editor?.isActive({ textAlign: value })) ||
    alignments[0]; // Default to first alignment (Left)

  const CurrentIcon = currentAlignment.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`Align ${currentAlignment.label.toLowerCase()}`}
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-foreground/30 px-1.5 overflow-hidden text-sm"
        >
          <CurrentIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-muted-foreground/30",
              editor?.isActive({ textAlign: value }) && "bg-muted-foreground/30"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
