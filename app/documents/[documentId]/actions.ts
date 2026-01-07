"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient } from "@clerk/nextjs/server";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Generate a consistent color for a user based on their ID.
 * Uses a simple hash function to convert the user ID into an HSL color.
 *
 * @param userId - The user's unique identifier
 * @returns A color string in HSL format (e.g., "hsl(240, 70%, 50%)")
 */
function generateUserColor(userId: string): string {
  // Simple hash function to generate a number from the user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash | 0; // Convert to 32-bit integer
  }

  // Generate hue (0-360) from the hash
  const hue = Math.abs(hash % 360);

  // Use fixed saturation and lightness for vibrant, readable colors
  return `hsl(${hue}, 70%, 50%)`;
}

export async function getDocuments(ids: Id<"documents">[]) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!convexUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
  }

  const convex = new ConvexHttpClient(convexUrl);

  return await convex.query(api.documents.getByIds, { ids });
}

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
