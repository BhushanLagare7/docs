/**
 * @file Convex database schema definition.
 * Defines the documents table with indexes and search capabilities.
 * @module convex/schema
 */

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Database schema for the application.
 * Defines tables, indexes, and search indexes for Convex.
 *
 * Documents table fields:
 * - title: Document title
 * - initialContent: Optional HTML content
 * - ownerId: User ID of the document creator
 * - roomId: Optional Liveblocks room ID
 * - organizationId: Optional organization ID for shared documents
 *
 * Indexes:
 * - by_owner_id: Fetch documents by owner
 * - by_organization_id: Fetch documents by organization
 * - search_title: Full-text search on title
 */
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),
});
