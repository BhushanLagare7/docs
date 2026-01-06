import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
  });

  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return new Response("Unauthorized session claims", { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized user", { status: 401 });
  }

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });

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

  session.allow(room, session.FULL_ACCESS);

  try {
    const { body, status } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error("Liveblocks authorization failed:", error);
    return new Response("Authorization failed", { status: 500 });
  }
}
