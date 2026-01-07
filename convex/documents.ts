/**
 * @file Convex server functions for document management.
 * Provides queries and mutations for CRUD operations on documents.
 * @module convex/documents
 */

import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

/**
 * Query to fetch multiple documents by their IDs.
 * Returns document metadata or a placeholder for removed documents.
 *
 * @param {Object} args - The query arguments
 * @param {Array<Id<"documents">>} args.ids - Array of document IDs to fetch
 * @returns {Promise<Array<{id: Id<"documents">, name: string}>>} Array of document metadata
 */
export const getByIds = query({
  args: {
    ids: v.array(v.id("documents")),
  },
  /**
   *
   * @param ctx
   * @param args
   */
  handler: async (ctx, args) => {
    const documents = [];

    for (const id of args.ids) {
      const document = await ctx.db.get("documents", id);
      if (document) {
        documents.push({ id: document._id, name: document.title });
      } else {
        documents.push({ id, name: "[Removed]" });
      }
    }

    return documents;
  },
});

/**
 * Mutation to create a new document.
 * Requires authentication and assigns ownership to the creating user.
 * If user is in an organization, the document is associated with it.
 *
 * @param {Object} args - The mutation arguments
 * @param {string} [args.title] - Optional document title (defaults to "Untitled Document")
 * @param {string} [args.initialContent] - Optional initial content for the document
 * @returns {Promise<Id<"documents">>} The ID of the newly created document
 * @throws {ConvexError} If user is not authenticated
 */
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  /**
   *
   * @param ctx
   * @param args
   */
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

/**
 * Query to fetch documents with pagination and optional search.
 * Returns documents owned by the user or their organization.
 * Supports full-text search on document titles.
 *
 * @param {Object} args - The query arguments
 * @param {PaginationOptions} args.paginationOpts - Pagination options
 * @param {string} [args.search] - Optional search query for filtering by title
 * @returns {Promise<PaginationResult>} Paginated list of documents
 * @throws {ConvexError} If user is not authenticated
 */
export const get = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  /**
   *
   * @param ctx
   * @param root0
   * @param root0.paginationOpts
   * @param root0.search
   * @returns {Promise<any>}
   */
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

/**
 * Mutation to delete a document by ID.
 * Verifies the user is either the owner or an organization member.
 *
 * @param {Object} args - The mutation arguments
 * @param {Id<"documents">} args.id - The ID of the document to delete
 * @throws {ConvexError} If user is not authenticated, document not found, or user lacks permission
 */
export const removeById = mutation({
  args: {
    id: v.id("documents"),
  },
  /**
   *
   * @param ctx
   * @param args
   */
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

/**
 * Mutation to update a document's properties.
 * Currently supports updating the title.
 * Verifies the user is either the owner or an organization member.
 *
 * @param {Object} args - The mutation arguments
 * @param {Id<"documents">} args.id - The ID of the document to update
 * @param {string} [args.title] - Optional new title for the document
 * @throws {ConvexError} If user is not authenticated, document not found, or user lacks permission
 */
export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
  },
  /**
   *
   * @param ctx
   * @param args
   */
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

/**
 * Query to fetch a single document by ID.
 * No authorization check - relies on Liveblocks for access control.
 *
 * @param {Object} args - The query arguments
 * @param {Id<"documents">} args.id - The ID of the document to fetch
 * @returns {Promise<Document>} The document object
 * @throws {ConvexError} If document is not found
 */
export const getById = query({
  args: {
    id: v.id("documents"),
  },
  /**
   *
   * @param ctx
   * @param args
   */
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
