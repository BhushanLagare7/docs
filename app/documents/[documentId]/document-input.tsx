import { BsCloudCheck } from "react-icons/bs";

export const DocumentInput = () => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <BsCloudCheck />
    </div>
  );
};
