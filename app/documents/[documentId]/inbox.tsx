/**
 * @file Inbox notification component for Liveblocks notifications.
 * Displays a dropdown menu with real-time notifications for comments and mentions.
 * @module app/documents/[documentId]/inbox
 */

"use client";

import { BellIcon } from "lucide-react";
import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

/**
 * Container component for the inbox with suspense handling.
 * Displays a disabled loading state while fetching notifications.
 *
 * @returns {JSX.Element} The rendered inbox container with suspense
 */
export const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button
            aria-label="Inbox notifications"
            className="relative"
            disabled
            size="icon"
            variant="ghost"
          >
            <BellIcon className="size-5" />
          </Button>
          <Separator className="h-8" orientation="vertical" />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};

/**
 * Dropdown menu component displaying inbox notifications.
 * Shows notification count badge and list of unread notifications.
 *
 * @returns {JSX.Element} The rendered inbox dropdown menu
 */
const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Inbox notifications"
            className="relative"
            size="icon"
            variant="ghost"
          >
            <BellIcon className="size-5" />
            {inboxNotifications.length > 0 && (
              <span className="flex absolute -top-1 -right-1 justify-center items-center rounded-full bg-primary text-primary-foreground size-4">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((notification) => (
                <InboxNotification
                  key={notification.id}
                  inboxNotification={notification}
                />
              ))}
            </InboxNotificationList>
          ) : (
            <div className="p-2 text-center w-[400px] text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator className="h-8" orientation="vertical" />
    </>
  );
};
