/**
 * @file Avatar components for displaying collaborative users.
 * Shows avatars of users currently viewing or editing the document.
 * @module app/documents/[documentId]/avatars
 */

"use client";

import Image from "next/image";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Separator } from "@/components/ui/separator";

/**
 * Size of avatar images in pixels.
 * @constant {number}
 */
const AVATAR_SIZE = 36;

/**
 * Container component for displaying user avatars with suspense handling.
 * Renders null as fallback while loading.
 *
 * @returns {JSX.Element} The rendered avatars container with suspense
 */
export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

/**
 * Displays a stack of avatars for all users in the room.
 * Shows the current user's avatar and all other connected users.
 *
 * @returns {JSX.Element | null} The rendered avatar stack, or null if no other users
 */
const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar name="You" src={currentUser.info.avatar} />
          </div>
        )}
        <div className="flex">
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} name={info.name} src={info.avatar} />
          ))}
        </div>
      </div>
      <Separator className="h-8" orientation="vertical" />
    </>
  );
};

/**
 * Props for the Avatar component.
 * @interface AvatarProps
 * @property {string} name - The user's display name
 * @property {string} src - URL of the user's avatar image
 */
interface AvatarProps {
  name: string;
  src: string;
}

/**
 * Displays a single user avatar with hover tooltip.
 * Shows the user's name on hover.
 *
 * @param {AvatarProps} props - The component props
 * @param {string} props.name - The user's display name
 * @param {string} props.src - URL of the user's avatar image
 * @returns {JSX.Element} The rendered avatar component
 */
const Avatar = ({ name, src }: AvatarProps) => {
  return (
    <div
      aria-label={name}
      className="flex relative place-content-center -ml-2 bg-gray-400 rounded-full border-4 group shrink-0 border-background dark:bg-gray-600"
      role="img"
      style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
    >
      <div
        aria-hidden="true"
        className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-xs rounded-lg mt-2.5 z-10 bg-background whitespace-nowrap text-foreground transition-opacity"
        role="tooltip"
      >
        {name}
      </div>
      <Image
        alt={name}
        className="rounded-full size-full"
        height={AVATAR_SIZE}
        src={src}
        width={AVATAR_SIZE}
      />
    </div>
  );
};
