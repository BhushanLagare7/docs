/**
 * @file Image insertion button for the editor toolbar.
 * Provides options to upload an image or paste an image URL.
 * @module components/toolbar/image-button
 */

import { useState } from "react";

import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

/**
 * A button component for inserting images into the editor.
 * Supports file upload and URL-based image insertion.
 *
 * @returns {JSX.Element} The rendered image button with dropdown and dialog
 */
export const ImageButton = () => {
  const { editor } = useEditorStore();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  /**
   * Sets the image source in the editor.
   *
   * @param {string} src - The image source URL
   */
  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  /**
   * Opens a file picker and uploads the selected image.
   * Creates a temporary object URL for the uploaded file.
   */
  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    /**
     *
     * @param e
     */
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
    };

    input.click();
  };

  /**
   * Handles image URL form submission.
   * Clears the input and closes the dialog after insertion.
   */
  const handleImageUrlSubmit = () => {
    if (!imageUrl) return;
    onChange(imageUrl);
    setImageUrl("");
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted-foreground/30 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="mr-2 size-4" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="mr-2 size-4" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
