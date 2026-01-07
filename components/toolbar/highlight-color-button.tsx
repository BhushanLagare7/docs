/**
 * @file Highlight color picker button for the editor toolbar.
 * Provides a color picker dropdown for setting text highlight color.
 * @module components/toolbar/highlight-color-button
 */

import { type ColorResult, SketchPicker } from "react-color";

import { HighlighterIcon } from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/**
 * A dropdown button component with color picker for text highlighting.
 * Uses the SketchPicker for color selection.
 *
 * @returns {JSX.Element} The rendered highlight color button with color picker
 */
export const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight")?.color;

  /**
   * Applies the selected highlight color to the editor.
   *
   * @param {ColorResult} color - The selected color from the picker
   */
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Highlight color"
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-foreground/30 px-1.5 overflow-hidden text-sm"
        >
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 w-fit">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
