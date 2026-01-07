/**
 * @file Document input component for editing document titles.
 * Provides inline editing with debounced auto-save and visual status indicators.
 * @module app/documents/[documentId]/document-input
 */

import { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";

import { useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useDebounce } from "@/hooks/use-debounce";

/**
 * Props for the DocumentInput component.
 * @interface DocumentInputProps
 * @property {Id<"documents">} id - The unique identifier for the document
 * @property {string} title - The current title of the document
 */
interface DocumentInputProps {
  id: Id<"documents">;
  title: string;
}

/**
 * An inline editable input component for document titles.
 * Features auto-save with debouncing, connection status indicators,
 * and visual feedback for save operations.
 *
 * @param {DocumentInputProps} props - The component props
 * @param {Id<"documents">} props.id - The unique identifier for the document
 * @param {string} props.title - The current title of the document
 * @returns {JSX.Element} The rendered document input component
 */
export const DocumentInput = ({ id, title }: DocumentInputProps) => {
  const status = useStatus();

  const [value, setValue] = useState(title);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showLoader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";

  const mutate = useMutation(api.documents.updateById);

  /**
   * Debounced function to update the document title.
   * Only updates if the new value differs from the original title.
   *
   * @param {string} newValue - The new title value to save
   */
  const debounceUpdate = useDebounce(async (newValue: string) => {
    if (newValue === title) return;

    try {
      setIsPending(true);
      await mutate({ id, title: newValue });
      toast.success("Document updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update document");
    } finally {
      setIsPending(false);
    }
  }, 1000);

  /**
   * Handles input value changes and triggers debounced update.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  /**
   * Handles form submission for immediate title update.
   *
   * @async
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsPending(true);
      await mutate({ id, title: value });
      toast.success("Document updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update document");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {isEditing ? (
        <form className="relative w-fit max-w-[50ch]" onSubmit={handleSubmit}>
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
            value={value}
            onBlur={() => {
              setIsEditing(false);
            }}
            onChange={onChange}
          />
        </form>
      ) : (
        <span
          className="text-lg px-1.5 cursor-pointer truncate"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
        >
          {value}
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showError && !showLoader && <BsCloudCheck className="size-4" />}
      {showLoader && (
        <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
      )}
    </div>
  );
};
