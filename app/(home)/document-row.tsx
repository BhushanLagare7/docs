import { SiGoogledocs } from "react-icons/si";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { Building2Icon, CircleUserIcon } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";

import { TableCell, TableRow } from "@/components/ui/table";

import { DocumentMenu } from "./document-menu";

interface DocumentRowProps {
  document: Doc<"documents">;
}

export const DocumentRow = ({ document }: DocumentRowProps) => {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => router.push(`/documents/${document._id}`)}
    >
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-primary" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="hidden gap-2 items-center text-muted-foreground md:flex">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
        />
      </TableCell>
    </TableRow>
  );
};
