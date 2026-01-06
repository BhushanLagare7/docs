import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export async function POST(req: Request) {
  // Validate environment variables
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    console.error("Missing NEXT_PUBLIC_CONVEX_URL environment variable");
    return new Response("Server configuration error: Missing Convex URL", {
      status: 500,
    });
  }

  const liveblocksSecret = process.env.LIVEBLOCKS_SECRET_KEY;
  if (!liveblocksSecret) {
    console.error("Missing LIVEBLOCKS_SECRET_KEY environment variable");
    return new Response(
      "Server configuration error: Missing Liveblocks secret",
      {
        status: 500,
      }
    );
  }

  const convex = new ConvexHttpClient(convexUrl);
  const liveblocks = new Liveblocks({
    secret: liveblocksSecret,
  });

  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized session claims", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized user", { status: 401 });
  }

  // Validate request body
  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON in request body", { status: 400 });
  }

  const { room } = body;

  // Validate room parameter
  if (!room || typeof room !== "string" || room.trim() === "") {
    return new Response("Bad Request: 'room' must be a non-empty string", {
      status: 400,
    });
  }

  // Sanitize room value (trim whitespace) and cast to Id<"documents">
  const sanitizedRoom = room.trim() as Id<"documents">;

  const document = await convex.query(api.documents.getById, {
    id: sanitizedRoom,
  });

  if (!document) {
    return new Response("Document not found", { status: 404 });
  }

  const isOwner = document.ownerId === user.id;
  const isOrganizationMember = !!(
    document.organizationId && document.organizationId === sessionClaims.o?.id
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized document", { status: 401 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName ?? "Anonymous",
      avatar: user.imageUrl,
    },
  });

  session.allow(sanitizedRoom, session.FULL_ACCESS);

  try {
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks authorization failed:", error);
    return new Response("Authorization failed", { status: 500 });
  }
}
