/**
 * @file Zustand store for Tiptap editor state.
 * Provides global access to the editor instance.
 * @module store/use-editor-store
 */

import { create } from "zustand";
import { type Editor } from "@tiptap/react";

/**
 * Editor store state interface.
 * @interface EditorState
 * @property {Editor | null} editor - The Tiptap editor instance
 * @property {function} setEditor - Function to update the editor instance
 */
interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}

/**
 * Zustand store for managing the Tiptap editor instance globally.
 * Allows components to access and update the editor from anywhere in the app.
 *
 * @example
 * const { editor, setEditor } = useEditorStore();
 */
export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  /**
   *
   * @param editor
   */
  setEditor: (editor: Editor | null) => set({ editor }),
}));
