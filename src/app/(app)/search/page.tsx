
"use client"; 

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { SearchInput } from "@/components/search/SearchInput";
import { ThreadList } from "@/components/forums/ThreadList";
import { mockThreads } from "@/lib/mock-data";
import type { Thread } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    // Update URL query parameter
    const newUrl = query ? `${window.location.pathname}?q=${encodeURIComponent(query)}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);

    // Simulate API call for search
    setTimeout(() => {
      if (!query.trim()) {
        setSearchResults([]);
      } else {
        const lowerCaseQuery = query.toLowerCase();
        const results = mockThreads.filter(thread =>
          thread.title.toLowerCase().includes(lowerCaseQuery) ||
          thread.posts.some(post => post.content.toLowerCase().includes(lowerCaseQuery))
        );
        setSearchResults(results);
      }
      setIsLoading(false);
    }, 500); // Simulate network delay
  }, [setSearchQuery, setIsLoading, setSearchResults]); // mockThreads is stable and not included

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Search Forums</h1>
      <SearchInput onSearch={handleSearch} initialQuery={searchQuery} />

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && searchQuery && searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Results for &quot;{searchQuery}&quot; ({searchResults.length})
          </h2>
          <ThreadList threads={searchResults} />
        </div>
      )}

      {!isLoading && searchQuery && searchResults.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No threads found matching &quot;{searchQuery}&quot;. Try a different keyword.
        </p>
      )}

      {!isLoading && !searchQuery && (
         <p className="text-muted-foreground text-center py-8">
          Enter a keyword above to search the forums.
        </p>
      )}
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoadingSkeleton />}>
      <SearchPageComponent />
    </Suspense>
  );
}

function SearchPageLoadingSkeleton() {
  return (
     <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Search Forums</h1>
      <div className="flex w-full items-center space-x-2">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-24" />
      </div>
       <p className="text-muted-foreground text-center py-8">
          Loading search...
        </p>
    </div>
  )
}
