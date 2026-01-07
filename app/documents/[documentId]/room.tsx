/**
 * @file Liveblocks room provider component.
 * Wraps children with Liveblocks real-time collaboration context including
 * authentication, user resolution, and storage initialization.
 * @module app/documents/[documentId]/room
 */

"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { Id } from "@/convex/_generated/dataModel";

import { FullScreenLoader } from "@/components/fullscreen-loader";

import { getDocuments, getUsers } from "./actions";

/**
 * User object type for Liveblocks integration.
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} name - User display name
 * @property {string} avatar - URL to user's avatar image
 * @property {string} color - User's assigned color for collaboration
 */
type User = { id: string; name: string; avatar: string; color: string };

/**
 * Liveblocks room provider component.
 * Sets up the real-time collaboration environment with:
 * - Custom authentication endpoint
 * - User resolution for mentions and presence
 * - Room information resolution
 * - Initial storage for document margins
 *
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - Child components to render within the room context
 * @returns {JSX.Element} The rendered room provider
 */
export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    /**
     *
     */
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
      resolveUsers={({ userIds }) =>
        userIds.map((userId) => users.find((user) => user.id === userId)) ?? []
      }
      throttle={16}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
