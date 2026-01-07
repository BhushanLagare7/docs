/**
 * @file Search input component for filtering documents.
 * Provides a search form with submit and clear functionality.
 * @module app/(home)/search-input
 */

"use client";

import { useRef, useState } from "react";

import { SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSearchParam } from "@/hooks/use-search-param";

/**
 * A search input component for filtering documents.
 * Uses URL search parameters to persist search state and provides
 * a styled input with search and clear buttons.
 *
 * @returns {JSX.Element} The rendered search input component
 *
 * @example
 * <SearchInput />
 */
export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState<string>(search);

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles input value changes.
   * Updates the local value state without triggering a search.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  /**
   * Clears the search input and resets the search parameter.
   * Blurs the input field after clearing.
   */
  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
    setSearch("");
  };

  /**
   * Handles form submission.
   * Updates the URL search parameter with the current value and blurs the input.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          className="px-14 w-full border-none md:text-base placeholder:text-muted-foreground focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#F0F4F8] dark:bg-[#1D2125] rounded-full h-[48px] focus-visible:ring-0 focus-visible:bg-background"
          placeholder="Search"
          value={value}
          onChange={handleChange}
        />
        <Button
          aria-label="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          size="icon"
          type="submit"
          variant="ghost"
        >
          <SearchIcon className="text-muted-foreground" />
        </Button>
        {value && (
          <Button
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full cursor-pointer"
            size="icon"
            type="button"
            variant="ghost"
            onClick={handleClear}
          >
            <XIcon className="text-muted-foreground" />
          </Button>
        )}
      </form>
    </div>
  );
};
