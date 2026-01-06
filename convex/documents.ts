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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
      organizationId,
    });
  },
});

export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, search }) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    // Info: Search within an organization
    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    // Info: Search within user's documents (Personal)
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    // Info: Get documents within an organization (Organization)
    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId)
        )
        .paginate(paginationOpts);
    }

    // Info: Get user's documents
    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get("documents", args.id);

    if (!document) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Document not found",
      });
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember) {
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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const document = await ctx.db.get("documents", args.id);

    if (!document) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Document not found",
      });
    }

    const isOwner = document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId && document.organizationId === organizationId
    );

    if (!isOwner && !isOrganizationMember) {
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

export const getById = query({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get("documents", args.id);

    if (!document) {
      throw new ConvexError({
        code: "NOT_FOUND",
        message: "Document not found",
      });
    }

    return document;
  },
});
