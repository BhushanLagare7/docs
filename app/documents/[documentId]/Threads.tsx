import { useThreads } from "@liveblocks/react/suspense";
import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from "@liveblocks/react-tiptap";
import { Editor } from "@tiptap/react";

export function Threads({ editor }: { editor: Editor | null }) {
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
