import Image from "next/image";
import Link from "next/link";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { SearchInput } from "./search-input";

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
