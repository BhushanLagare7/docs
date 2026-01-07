/**
 * @file Loading state component for the document page.
 * Displays a full-screen loading indicator while the document is being fetched.
 * @module app/documents/[documentId]/loading
 */

import { FullScreenLoader } from "@/components/fullscreen-loader";

/**
 * Loading page component displayed during document data fetching.
 * Shows a full-screen loader with a descriptive message.
 *
 * @returns {JSX.Element} The rendered loading page
 */
const LoadingPage = () => {
  return <FullScreenLoader label="Document loading..." />;
};

export default LoadingPage;
