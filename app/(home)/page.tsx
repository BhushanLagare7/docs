"use client";

import { usePaginatedQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { DocumentsTable } from "./documents-table";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";

const Page = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
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
