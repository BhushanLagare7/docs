/**
 * @file Text color picker button for the editor toolbar.
 * Provides a color picker dropdown for setting text color.
 * @module components/toolbar/text-color-button
 */

import { type ColorResult, SketchPicker } from "react-color";

import { useEditorStore } from "@/store/use-editor-store";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

/**
 * A dropdown button component with color picker for text color.
 * Displays the current color as an underline and uses SketchPicker for selection.
 *
 * @returns {JSX.Element} The rendered text color button with color picker
 */
export const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  /**
   * Applies the selected text color to the editor.
   *
   * @param {ColorResult} color - The selected color from the picker
   */
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Text color"
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-foreground/30 px-1.5 overflow-hidden text-sm"
        >
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 w-fit">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
