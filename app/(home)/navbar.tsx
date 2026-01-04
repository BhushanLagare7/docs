import Image from "next/image";
import Link from "next/link";

import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full h-full">
      <div className="flex gap-3 items-center pr-6 shrink-0">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Docs</h3>
      </div>
      <SearchInput />
      <div />
    </nav>
  );
};
