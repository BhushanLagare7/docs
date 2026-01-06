"use client";

import Link from "next/link";

import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 min-h-screen">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="p-3 bg-rose-100 rounded-full dark:bg-rose-900">
            <AlertTriangleIcon className="text-rose-600 size-10 dark:text-rose-400" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Something went wrong
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {error.message || "Please try again later."}
          </p>
        </div>
        <div className="flex gap-x-3 justify-center items-center">
          <Button className="px-6 font-medium" onClick={reset}>
            Try again
          </Button>
          <Button asChild className="font-medium" variant="ghost">
            <Link href="/">Go back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
