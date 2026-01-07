/**
 * @file Root layout component for the application.
 * Configures fonts, providers, metadata, and global styles.
 * @module app/layout
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";

/**
 * Public Sans font configuration.
 * @constant
 */
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" });

/**
 * Geist Sans font configuration.
 * @constant
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono font configuration.
 * @constant
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application metadata for SEO and social sharing.
 * Includes title, description, keywords, Open Graph, and Twitter cards.
 * @constant {Metadata}
 */
export const metadata: Metadata = {
  title: {
    default: "Docs",
    template: "%s | Docs",
  },
  description:
    "A modern, real-time collaborative document editor built with Next.js, inspired by Google Docs. This project features a rich text editor, real-time user presence, and seamless authentication, providing a premium document editing experience.",
  keywords: [
    "Docs",
    "Next.js",
    "React",
    "TypeScript",
    "Convex",
    "Real-time",
    "LiveBlocks",
    "Clerk",
    "Tiptap",
    "Shadcn",
  ],
  authors: [{ name: "Bhushan Lagare" }],
  creator: "Bhushan Lagare",
  publisher: "Bhushan Lagare",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Docs",
    title: "Docs",
    description:
      "A modern, real-time collaborative document editor built with Next.js, inspired by Google Docs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs",
    description:
      "A modern, real-time collaborative document editor built with Next.js, inspired by Google Docs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Root layout component that wraps all pages.
 * Provides font configurations, Convex client, nuqs adapter, and toast notifications.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} The rendered root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${publicSans.variable}`} lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
