/**
 * @file Document removal confirmation dialog.
 * Displays an alert dialog to confirm permanent document deletion.
 * @module components/remove-dialog
 */

"use client";

import { useState } from "react";

import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Props for the RemoveDialog component.
 * @interface RemoveDialogProps
 * @property {Id<"documents">} documentId - The ID of the document to remove
 * @property {React.ReactNode} children - Trigger element for the dialog
 */
interface RemoveDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
}

/**
 * A confirmation dialog for removing documents.
 * Displays a warning message and handles the deletion mutation.
 *
 * @param {RemoveDialogProps} props - The component props
 * @param {Id<"documents">} props.documentId - The ID of the document to remove
 * @param {React.ReactNode} props.children - Trigger element for the dialog
 * @returns {JSX.Element} The rendered alert dialog
 */
export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById);

  const [isRemoving, setIsRemoving] = useState(false);

  /**
   * Handles document removal when the delete button is clicked.
   * Stops event propagation to prevent parent click handlers.
   *
   * @async
   * @param {React.MouseEvent} e - The mouse click event
   */
  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoving(true);

    try {
      await remove({ id: documentId });
      toast.success("Document removed successfully");
    } catch (error) {
      console.error("Failed to remove document:", error);
      toast.error("Failed to remove document");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            variant="destructive"
            onClick={handleRemove}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
