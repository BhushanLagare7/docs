import { useRef, useState } from "react";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";

import { useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useDebounce } from "@/hooks/use-debounce";

interface DocumentInputProps {
  id: Id<"documents">;
  title: string;
}

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

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
