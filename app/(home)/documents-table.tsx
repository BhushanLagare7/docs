/**
 * @file Documents table component for displaying a paginated list of documents.
 * Shows documents in a table format with infinite scroll pagination.
 * @module app/(home)/documents-table
 */

import { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DocumentRow } from "./document-row";

/**
 * Props for the DocumentsTable component.
 * @interface DocumentsTableProps
 * @property {Doc<"documents">[] | undefined} documents - Array of documents to display, or undefined while loading
 * @property {function} loadMore - Callback function to load more documents
 * @property {PaginationStatus} status - Current pagination status ('LoadingMore', 'CanLoadMore', 'Exhausted')
 */
interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

/**
 * A table component that displays a list of documents with pagination support.
 * Shows a loading spinner while documents are being fetched, displays an empty
 * state when no documents exist, and provides a "Load more" button for pagination.
 *
 * @param {DocumentsTableProps} props - The component props
 * @param {Doc<"documents">[] | undefined} props.documents - Array of documents to display
 * @param {function} props.loadMore - Callback function to load more documents
 * @param {PaginationStatus} props.status - Current pagination status
 * @returns {JSX.Element} The rendered documents table component
 *
 * @example
 * <DocumentsTable
 *   documents={documents}
 *   loadMore={loadMore}
 *   status={status}
 * />
 */
export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="flex flex-col gap-5 px-16 py-6 mx-auto max-w-7xl">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="border-none hover:bg-transparent">
                <TableCell
                  className="h-24 text-center text-muted-foreground"
                  colSpan={4}
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents?.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      {documents?.length !== 0 && (
        <div className="flex items-center justify-center">
          {status === "LoadingMore" ? (
            <LoaderIcon className="animate-spin text-muted-foreground size-5" />
          ) : (
            <Button
              disabled={status !== "CanLoadMore"}
              size="sm"
              variant="ghost"
              onClick={() => loadMore(5)}
            >
              {status === "CanLoadMore" ? "Load more" : "End of results"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
