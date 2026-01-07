/**
 * @file Search parameter hook for URL query state.
 * Manages the 'search' query parameter for document filtering.
 * @module hooks/use-search-param
 */

import { parseAsString, useQueryState } from "nuqs";

/**
 * A custom hook that manages the 'search' URL query parameter.
 * Uses nuqs for type-safe query state management with automatic URL updates.
 *
 * @returns {[string, function]} A tuple of [searchValue, setSearchValue]
 *
 * @example
 * const [search, setSearch] = useSearchParam();
 * setSearch("some query"); // Updates URL to ?search=some+query
 */
export const useSearchParam = () => {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );
};
