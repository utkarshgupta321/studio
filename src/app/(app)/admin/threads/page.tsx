"use client";

import { useState, useEffect, useCallback } from 'react';
import { AdminThreadTable } from "@/components/admin/AdminThreadTable";
import { mockThreads } from "@/lib/mock-data";
import type { Thread } from "@/lib/types";
import { Input } from "@/components/ui/input";
// PlusCircle, Download are commented out as they are not directly used for search functionality.
// import { Button } from "@/components/ui/button";
// import { PlusCircle, Download } from "lucide-react";


export default function AdminThreadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([...mockThreads]);

  // Function to filter threads based on query - memoized with useCallback
  const filterThreads = useCallback((query: string) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
      setFilteredThreads([...mockThreads]); // Show all threads if query is empty
      return;
    }
    const results = mockThreads.filter(thread =>
      thread.title.toLowerCase().includes(lowerCaseQuery) ||
      (thread.posts && thread.posts.length > 0 && thread.posts[0].content.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredThreads(results);
  }, []); // mockThreads is a dependency; if it could change, it should be in deps array

  useEffect(() => {
    filterThreads(searchQuery);
  }, [searchQuery, filterThreads]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Thread Management</h1>
         {/* <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Thread</Button> */}
      </div>
       <div className="flex items-center gap-2">
        <Input 
          placeholder="Search threads by title or first post..." 
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Add filters for status, category etc. if needed */}
      </div>
      <AdminThreadTable threads={filteredThreads} />
    </div>
  );
}
