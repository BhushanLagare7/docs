import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const removeById = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const document = await ctx.db.get("documents", args.id);

    if (!document) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Document not found",
      });
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authorized",
      });
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authorized",
      });
    }

    await ctx.db.delete("documents", args.id);
  },
});

export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const document = await ctx.db.get("documents", args.id);

    if (!document) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Document not found",
      });
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authorized",
      });
    }

    const isOwner = document.ownerId === user.subject;

    if (!isOwner) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authorized",
      });
    }

    await ctx.db.patch("documents", args.id, {
      title: args.title,
    });
  },
});
