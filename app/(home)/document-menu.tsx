/**
 * @file Document menu component for the home page document list.
 * Provides actions like rename, delete, and open in new tab for each document.
 * @module app/(home)/document-menu
 */

import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVerticalIcon,
  TrashIcon,
} from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";

import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Props for the DocumentMenu component.
 * @interface DocumentMenuProps
 * @property {Id<"documents">} documentId - The unique identifier for the document
 * @property {string} title - The current title of the document
 * @property {function} onNewTab - Callback function to open the document in a new tab
 */
interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}

/**
 * A dropdown menu component that provides document actions.
 * Displays options to rename, delete, or open the document in a new tab.
 *
 * @param {DocumentMenuProps} props - The component props
 * @param {Id<"documents">} props.documentId - The unique identifier for the document
 * @param {string} props.title - The current title of the document
 * @param {function} props.onNewTab - Callback function to open the document in a new tab
 * @returns {JSX.Element} The rendered dropdown menu component
 *
 * @example
 * <DocumentMenu
 *   documentId="doc123"
 *   title="My Document"
 *   onNewTab={(id) => window.open(`/documents/${id}`, '_blank')}
 * />
 */
export const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: DocumentMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Document actions"
          className="rounded-full"
          size="icon"
          variant="ghost"
        >
          <MoreVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <FilePenIcon className="mr-2 size-4" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            variant="destructive"
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <TrashIcon className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="mr-2 size-4" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
