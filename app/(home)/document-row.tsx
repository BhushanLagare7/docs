/**
 * @file Document row component for displaying a single document in the documents table.
 * Shows document title, ownership type, creation date, and action menu.
 * @module app/(home)/document-row
 */

import { SiGoogledocs } from "react-icons/si";
import { useRouter } from "next/navigation";

import { format } from "date-fns";
import { Building2Icon, CircleUserIcon } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";

import { TableCell, TableRow } from "@/components/ui/table";

import { DocumentMenu } from "./document-menu";

/**
 * Props for the DocumentRow component.
 * @interface DocumentRowProps
 * @property {Doc<"documents">} document - The document data to display
 */
interface DocumentRowProps {
  document: Doc<"documents">;
}

/**
 * A table row component that displays a single document's information.
 * Clicking the row navigates to the document editor page.
 * Displays the document icon, title, ownership type (personal/organization),
 * creation date, and an action menu.
 *
 * @param {DocumentRowProps} props - The component props
 * @param {Doc<"documents">} props.document - The document data to display
 * @returns {JSX.Element} The rendered table row component
 *
 * @example
 * <DocumentRow document={documentData} />
 */
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
