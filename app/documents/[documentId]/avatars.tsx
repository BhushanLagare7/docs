"use client";

import Image from "next/image";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Separator } from "@/components/ui/separator";

const AVATAR_SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

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
      <Separator className="h-6" orientation="vertical" />
    </>
  );
};

interface AvatarProps {
  name: string;
  src: string;
}

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
