import { LoaderIcon } from "lucide-react";

interface FullScreenLoaderProps {
  label?: string;
}

export const FullScreenLoader = ({ label }: FullScreenLoaderProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
      <LoaderIcon className="animate-spin size-6 text-muted-foreground" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
