/**
 * @file Heading level selection button for the editor toolbar.
 * Provides a dropdown to select heading levels (H1-H5) or normal text.
 * @module components/toolbar/heading-level-button
 */

import { ChevronDownIcon } from "lucide-react";
import { type Level } from "@tiptap/extension-heading";

import { headings } from "@/constants/toolbar";
import { useEditorStore } from "@/store/use-editor-store";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * A dropdown button component for heading level selection.
 * Displays options for H1-H5 headings and normal paragraph text.
 *
 * @returns {JSX.Element} The rendered heading level button with dropdown
 */
export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  /**
   * Gets the label for the currently active heading level.
   *
   * @returns {string} The heading label (e.g., "Heading 1") or "Normal Text"
   */
  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 w-fit shrink-0 flex items-center justify-center rounded-sm hover:bg-muted-foreground/30 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1 w-fit">
        {headings.map(({ label, value, fontSize }) => (
          <DropdownMenuItem
            key={value}
            className={cn(
              "flex gap-x-2 items-center px-2 py-1 rounded-sm hover:bg-muted-foreground/30",
              ((value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: value })) &&
                "bg-muted-foreground/30"
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
