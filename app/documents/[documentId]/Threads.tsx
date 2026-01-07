/**
 * @file Collaborative threads component for Liveblocks comments.
 * Displays anchored and floating threads for document comments and discussions.
 * @module app/documents/[documentId]/Threads
 */

import { ClientSideSuspense, useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

/**
 * Container component for collaborative threads with suspense handling.
 * Wraps the threads list with a suspense boundary.
 *
 * @param {Object} props - The component props
 * @param {Editor | null} props.editor - The Tiptap editor instance
 * @returns {JSX.Element} The rendered threads container
 */
export const Threads = ({ editor }: { editor: Editor | null }) => {
  return (
    <ClientSideSuspense fallback={null}>
      <ThreadsList editor={editor} />
    </ClientSideSuspense>
  );
};

/**
 * Displays the list of unresolved threads with anchored and floating views.
 * Renders anchored threads attached to specific content, floating threads,
 * and a floating composer for new comments.
 *
 * @param {Object} props - The component props
 * @param {Editor | null} props.editor - The Tiptap editor instance
 * @returns {JSX.Element | null} The rendered threads list, or null if no editor
 */
function ThreadsList({ editor }: { editor: Editor | null }) {
  const { threads } = useThreads({ query: { resolved: false } });

  // Guard against null editor to prevent passing invalid instance to Liveblocks components
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="anchored-threads">
        <AnchoredThreads editor={editor} threads={threads} />
      </div>
      <FloatingThreads
        className="floating-threads"
        editor={editor}
        threads={threads}
      />
      <FloatingComposer className="floating-composer" editor={editor} />
    </>
  );
}
