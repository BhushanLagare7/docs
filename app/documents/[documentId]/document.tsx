"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { Toolbar } from "./toolbar";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

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
