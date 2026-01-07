/**
 * @file Main document component wrapper.
 * Combines the room provider, navbar, toolbar, and editor into the complete document view.
 * @module app/documents/[documentId]/document
 */

"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";

/**
 * Props for the Document component.
 * @interface DocumentProps
 * @property {Preloaded<typeof api.documents.getById>} preloadedDocument - Preloaded document data from server
 */
interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

/**
 * The main document view component.
 * Wraps the entire document editing experience with the Liveblocks room provider
 * and renders the navigation bar, toolbar, and editor.
 *
 * @param {DocumentProps} props - The component props
 * @param {Preloaded<typeof api.documents.getById>} props.preloadedDocument - Preloaded document data
 * @returns {JSX.Element} The rendered document view
 */
export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen bg-custom-1">
        <div className="flex fixed top-0 right-0 left-0 z-10 flex-col gap-y-2 px-4 pt-2 bg-custom-1 print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:p-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};
