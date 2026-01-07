/**
 * @file Font size control button for the editor toolbar.
 * Provides increment/decrement buttons and direct input for font size.
 * @module components/toolbar/font-size-button
 */

import { useState } from "react";

import { MinusIcon, PlusIcon } from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";

/**
 * A font size control component with increment/decrement buttons.
 * Allows users to adjust font size via buttons or direct text input.
 *
 * @returns {JSX.Element} The rendered font size control
 */
export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Updates the font size in the editor and local state.
   * Validates that the size is a positive number.
   *
   * @param {string} newSize - The new font size as a string
   */
  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  /**
   * Handles input value changes in edit mode.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  /**
   * Applies the font size when input loses focus.
   */
  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  /**
   * Handles Enter key to apply font size.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  /**
   * Increments the font size by 1.
   */
  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  /**
   * Decrements the font size by 1, minimum 1.
   */
  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        className="flex justify-center items-center w-7 h-7 rounded-sm shrink-0 hover:bg-muted-foreground/30"
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          className="w-10 h-7 text-sm text-center bg-transparent rounded-sm border border-muted-foreground/50 focus:outline-none focus:ring-0"
          type="text"
          value={inputValue}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <button
          className="w-10 h-7 text-sm text-center bg-transparent rounded-sm border cursor-text border-muted-foreground/50"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button
        className="flex justify-center items-center w-7 h-7 rounded-sm shrink-0 hover:bg-muted-foreground/30"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};
