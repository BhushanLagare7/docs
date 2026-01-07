/**
 * @file Home page component that displays the main document dashboard.
 * Shows the navigation bar, template gallery, and paginated documents table.
 * @module app/(home)/page
 */

"use client";

import { usePaginatedQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { useSearchParam } from "@/hooks/use-search-param";

import { DocumentsTable } from "./documents-table";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";

/**
 * The main home page component for the application.
 * Fetches and displays documents with pagination support, includes a search
 * feature via URL parameters, and shows available document templates.
 *
 * @returns {JSX.Element} The rendered home page component
 *
 * @example
 * // This component is used as the default export for the home route
 * export default Page;
 */
const Page = () => {
  const [search] = useSearchParam();
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 z-10 p-4 h-16 bg-background">
        <Navbar />
      </div>
      <main className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </main>
    </div>
  );
};

export default Page;
