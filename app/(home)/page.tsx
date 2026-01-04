"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";

const Page = () => {
  const documents = useQuery(api.documents.get);

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 z-10 p-4 h-16 bg-background">
        <Navbar />
      </div>
      <main className="mt-16">
        <TemplatesGallery />
        {documents?.map((document) => (
          <div key={document._id}>{document.title}</div>
        ))}
      </main>
    </div>
  );
};

export default Page;
