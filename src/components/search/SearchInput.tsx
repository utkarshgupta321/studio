"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchInput({ onSearch, initialQuery = "" }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
      <div className="relative flex-grow">
        <Input
          type="search"
          placeholder="Search forums by keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10" 
        />
        {query && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Button type="submit">
        <SearchIcon className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}
