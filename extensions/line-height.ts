/**
 * @file Line height extension for Tiptap editor.
 * Adds commands to set and unset line height on block-level nodes.
 * @module extensions/line-height
 */

import { Extension } from "@tiptap/react";

import "@tiptap/extension-text-style";

/**
 * Augments Tiptap's Commands interface with line height commands.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Sets the line height on selected block nodes.
       * @param lineHeight - Line height value (e.g., "1.5", "2", "normal")
       */
      setLineHeight: (lineHeight: string) => ReturnType;
      /**
       * Resets line height to default on selected block nodes.
       */
      unsetLineHeight: () => ReturnType;
    };
  }
}

/**
 * Tiptap extension that adds line height support for paragraphs and headings.
 * Works with block-level elements to apply line-height CSS.
 * Provides setLineHeight and unsetLineHeight commands.
 */
export const LineHeightExtension = Extension.create({
  name: "lineHeight",
  /**
   * Default options for the extension.
   * @returns {Object} Default options
   */
  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "normal",
    };
  },
  /**
   * Global attributes added by this extension.
   * @returns {Array} Global attributes configuration
   */
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            /**
             *
             * @param element
             */
            parseHTML: (element) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            /**
             *
             * @param attributes
             */
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }

              return {
                style: `line-height: ${attributes.lineHeight};`,
              };
            },
          },
        },
      },
    ];
  },
  /**
   * Commands added by this extension.
   * @returns {Object} Command definitions
   */
  addCommands() {
    return {
      /**
       *
       * @param lineHeight
       */
      setLineHeight:
        (lineHeight: string) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          if (dispatch) dispatch(tr);

          return true;
        },
      /**
       * Command to reset line height to default.
       * @returns {Function} Command implementation
       */
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);

          const { from, to } = selection;
          state.doc.nodesBetween(from, to, (node, pos) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight,
              });
            }
          });

          if (dispatch) dispatch(tr);

          return true;
        },
    };
  },
});
