/**
 * @file Server actions for document operations.
 * Provides server-side functions for fetching documents and users.
 * @module app/documents/[documentId]/actions
 */

"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { generateUserColor } from "@/lib/user-colors";

/**
 * Fetches multiple documents by their IDs.
 *
 * @async
 * @param {Id<"documents">[]} ids - Array of document IDs to fetch
 * @returns {Promise<Array<{id: string, name: string}>>} Array of document objects with id and name
 * @throws {Error} Throws if NEXT_PUBLIC_CONVEX_URL is not configured
 */
export async function getDocuments(ids: Id<"documents">[]) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
  }

  const convex = new ConvexHttpClient(convexUrl);

  return await convex.query(api.documents.getByIds, { ids });
}

/**
 * Fetches all users in the current organization.
 * Returns user information including ID, name, avatar, and generated color.
 *
 * @async
 * @returns {Promise<Array<{id: string, name: string, avatar: string, color: string}>>} Array of user objects
 */
export async function getUsers() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.o?.id as string],
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
    color: generateUserColor(user.id),
  }));

  return users;
}
