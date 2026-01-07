/**
 * @file Tiptap editor component with real-time collaboration.
 * Configures and renders the rich text editor with Liveblocks integration,
 * custom extensions, and collaborative features.
 * @module app/documents/[documentId]/editor
 */

"use client";

import ImageResize from "tiptap-extension-resize-image";
import { useStorage } from "@liveblocks/react";
import {
  FloatingToolbar,
  useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import {
  Color,
  FontFamily,
  // NOTE: This is not required as we are using our own extension
  // FontSize,
  // LineHeight,
  TextStyle,
} from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { useEditorStore } from "@/store/use-editor-store";

import { Ruler } from "./ruler";
import { Threads } from "./Threads";

/**
 * Props for the Editor component.
 * @interface EditorProps
 * @property {string | undefined} initialContent - Initial content to populate the editor with
 */
interface EditorProps {
  initialContent: string | undefined;
}

/**
 * A rich text editor component with real-time collaboration support.
 * Features include:
 * - Liveblocks integration for real-time collaborative editing
 * - Custom font size and line height extensions
 * - Text formatting (bold, italic, underline, highlighting)
 * - Lists, tables, images, and links
 * - Collaborative comments via threads
 * - Adjustable document margins via ruler
 *
 * @param {EditorProps} props - The component props
 * @param {string | undefined} props.initialContent - Initial content for the editor
 * @returns {JSX.Element} The rendered editor component
 */
export const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin =
    useStorage((storage) => storage.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const rightMargin =
    useStorage((storage) => storage.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    autofocus: true,
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    /**
     *
     */
    onDestroy: () => {
      setEditor(null);
    },
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    /**
     *
     * @param root0
     * @param root0.editor
     */
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px`,
        class:
          "focus:outline-none print:border-0 bg-background border border-custom-3 flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      liveblocks,
      FontSizeExtension,
      LineHeightExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
      TextStyle,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TableKit.configure({
        table: { resizable: true },
      }),
      Image,
      ImageResize,
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <div className="overflow-x-auto px-4 bg-custom-2 size-full print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
        <FloatingToolbar editor={editor} />
      </div>
    </div>
  );
};
