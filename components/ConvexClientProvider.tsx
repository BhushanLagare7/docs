/**
 * @file Convex client provider with Clerk authentication.
 * Wraps the application with Convex and Clerk providers, handling
 * authentication states and showing appropriate UI for each state.
 * @module components/ConvexClientProvider
 */

"use client";

import { ReactNode } from "react";

import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";

import { FullScreenLoader } from "./fullscreen-loader";

/**
 * Convex URL from environment variables.
 * @constant {string}
 * @throws {Error} Throws if NEXT_PUBLIC_CONVEX_URL is not configured
 */
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_CONVEX_URL environment variable. Please check your .env.local file."
  );
}

/**
 * Convex React client instance.
 * @constant {ConvexReactClient}
 */
const convex = new ConvexReactClient(convexUrl);

/**
 * Provides Convex and Clerk authentication context to the application.
 * Handles three authentication states:
 * - Authenticated: Renders children
 * - Unauthenticated: Shows Clerk sign-in form
 * - Loading: Shows full-screen loader
 *
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - Child components to render when authenticated
 * @returns {JSX.Element} The rendered provider wrapper
 */
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col justify-center items-center min-h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Auth loading..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
