"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import { FullScreenLoader } from "@/components/fullscreen-loader";

import { getUsers } from "./actions";

type User = { id: string; name: string; avatar: string };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
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
      authEndpoint="/api/liveblocks-auth"
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
      resolveUsers={({ userIds }) =>
        userIds.map((userId) => users.find((user) => user.id === userId)) ?? []
      }
      throttle={16}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
