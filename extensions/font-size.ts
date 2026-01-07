/**
 * @file Font size extension for Tiptap editor.
 * Adds commands to set and unset font size on text.
 * @module extensions/font-size
 */

import { Extension } from "@tiptap/react";

import "@tiptap/extension-text-style";

/**
 * Augments Tiptap's Commands interface with font size commands.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Sets the font size on selected text.
       * @param size - Font size value (e.g., "16px", "1.5em")
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Removes font size styling from selected text.
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

/**
 * Tiptap extension that adds font size support.
 * Extends text style marks to include fontSize attribute.
 * Provides setFontSize and unsetFontSize commands.
 */
export const FontSizeExtension = Extension.create({
  name: "fontSize",
  /**
   *
   */
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  /**
   *
   */
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            /**
             *
             * @param element
             */
            parseHTML: (element) => element.style.fontSize,
            /**
             *
             * @param attributes
             */
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize};`,
              };
            },
          },
        },
      },
    ];
  },
  /**
   *
   */
  addCommands() {
    return {
      /**
       *
       * @param fontSize
       */
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      /**
       *
       */
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
