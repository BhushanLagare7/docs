/**
 * @file Document page route component.
 * Handles dynamic document routes with metadata generation and authentication.
 * @module app/documents/[documentId]/page
 */

import { Metadata } from "next";

import { fetchQuery, preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Document } from "./document";

/**
 * Props for the DocumentIdPage component.
 * @interface DocumentIdPageProps
 * @property {Promise<{ documentId: Id<"documents"> }>} params - Route parameters containing the document ID
 */
interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}

/**
 * Generates dynamic metadata for the document page.
 * Fetches document data and creates SEO-friendly metadata including
 * Open Graph and Twitter card information.
 *
 * @async
 * @param {DocumentIdPageProps} props - The page props
 * @param {Promise<{ documentId: Id<"documents"> }>} props.params - Route parameters
 * @returns {Promise<Metadata>} The generated metadata object
 */
export async function generateMetadata({
  params,
}: DocumentIdPageProps): Promise<Metadata> {
  const { documentId } = await params;

  const document = await fetchQuery(api.documents.getById, { id: documentId });

  if (!document) {
    return {
      title: "Document not found",
      description: "The requested document could not be found.",
    };
  }

  // Truncate description to optimal length for search engines and social previews
  const truncatedDescription = document.initialContent
    ? document.initialContent.length > 160
      ? `${document.initialContent.substring(0, 157)}...`
      : document.initialContent
    : "Document content not available";

  return {
    title: document.title,
    description: truncatedDescription,
    openGraph: {
      title: document.title,
      description: truncatedDescription,
      type: "article",
      locale: "en_US",
      siteName: "Docs",
      publishedTime: new Date(document._creationTime).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: document.title,
      description: truncatedDescription,
    },
    publisher: "Bhushan Lagare",
  };
}

/**
 * The document page component.
 * Authenticates the user and preloads the document data before rendering.
 *
 * @async
 * @param {DocumentIdPageProps} props - The page props
 * @param {Promise<{ documentId: Id<"documents"> }>} props.params - Route parameters
 * @returns {Promise<JSX.Element>} The rendered document page
 * @throws {Error} Throws if user is unauthorized
 */
const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
