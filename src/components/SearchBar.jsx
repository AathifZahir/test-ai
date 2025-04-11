import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { searchCountriesByName } from "../api/countriesApi";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onSearchResults, onSearching }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullTextSearch, setIsFullTextSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const inputRef = useRef(null);

  // Effect for debounced search
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        onSearchResults([]);
        onSearching(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        onSearching(true);

        const results = await searchCountriesByName(
          debouncedSearchQuery,
          isFullTextSearch
        );
        onSearchResults(results);
      } catch (err) {
        setError("Error performing search. Please try again.");
        onSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery, isFullTextSearch, onSearchResults, onSearching]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
    setError(null);
    onSearchResults([]);
    onSearching(false);
    inputRef.current?.focus();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for a country..."
            className="w-full pl-10 pr-10 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isFullTextSearch}
              onChange={() => setIsFullTextSearch(!isFullTextSearch)}
              className="rounded border-input"
            />
            Exact match
          </label>

          {isLoading && (
            <div className="flex items-center justify-center w-8 h-8">
              <div className="animate-spin w-5 h-5 border-2 border-primary rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default SearchBar;
