/**
 * @file Document rename dialog component.
 * Provides a modal dialog for changing document titles.
 * @module components/rename-dialog
 */

"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

/**
 * Props for the RenameDialog component.
 * @interface RenameDialogProps
 * @property {Id<"documents">} documentId - The ID of the document to rename
 * @property {string} initialTitle - The current title of the document
 * @property {React.ReactNode} children - Trigger element for the dialog
 */
interface RenameDialogProps {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}

/**
 * A dialog component for renaming documents.
 * Provides an input field for the new title and handles the rename mutation.
 *
 * @param {RenameDialogProps} props - The component props
 * @param {Id<"documents">} props.documentId - The ID of the document to rename
 * @param {string} props.initialTitle - The current title of the document
 * @param {React.ReactNode} props.children - Trigger element for the dialog
 * @returns {JSX.Element} The rendered dialog component
 */
export const RenameDialog = ({
  documentId,
  initialTitle,
  children,
}: RenameDialogProps) => {
  const rename = useMutation(api.documents.updateById);

  const [isRenaming, setIsRenaming] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);

  /**
   * Handles form submission for renaming the document.
   * Trims whitespace and uses a fallback title if empty.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
   */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRenaming(true);

    try {
      await rename({
        id: documentId,
        title: title.trim() || "Untitled Document",
      });
      toast.success("Document renamed successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to rename document:", error);
      toast.error("Failed to rename document");
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for your document.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              placeholder="Document Name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              disabled={isRenaming}
              type="button"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isRenaming}
              type="submit"
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
