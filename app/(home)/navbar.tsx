/**
 * @file Navigation bar component for the home page.
 * Contains the application logo, search input, organization switcher, and user button.
 * @module app/(home)/navbar
 */

import Image from "next/image";
import Link from "next/link";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { SearchInput } from "./search-input";

/**
 * The main navigation bar component for the home page.
 * Displays the application logo with a link to home, a search input for filtering documents,
 * an organization switcher for Clerk authentication, and a user button for profile management.
 *
 * @returns {JSX.Element} The rendered navigation bar component
 *
 * @example
 * <Navbar />
 */
export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-full">
      <div className="flex gap-3 items-center pr-6 shrink-0">
        <Link href="/">
          <Image alt="Logo" height={36} src="/logo.svg" width={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div className="flex items-center gap-3 pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>
    </nav>
  );
};
