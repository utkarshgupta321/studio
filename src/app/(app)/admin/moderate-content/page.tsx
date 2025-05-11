
"use client";

import { useState, useEffect, useCallback } from 'react';
import { AdminThreadTable } from "@/components/admin/AdminThreadTable";
import type { EditThreadFormData } from "@/components/admin/EditThreadDialog"; // Required by AdminThreadTable
import { mockThreads } from "@/lib/mock-data";
import type { Thread } from "@/lib/types";
import { SearchInput } from "@/components/search/SearchInput";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanSearch } from "lucide-react";

export default function ModerateContentPage() {
  const { toast } = useToast();
  const [masterThreadList, setMasterThreadList] = useState<Thread[]>([]);
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initialize master list from mock data.
    // In a real app, this might be fetched or updated based on global state changes.
    setMasterThreadList([...mockThreads]);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredThreads([]); // Clear results if query is empty
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = masterThreadList.filter(thread =>
      thread.title.toLowerCase().includes(lowerCaseQuery) ||
      thread.posts.some(post => post.content.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredThreads(results);
  }, [searchQuery, masterThreadList]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Function to update a thread in both mockThreads and masterThreadList state
  const updateThreadInMockDataAndState = (threadId: string, updateFn: (thread: Thread) => Thread) => {
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
      mockThreads[mockThreadIndex] = updateFn(mockThreads[mockThreadIndex]);
    }
    setMasterThreadList(prevList => prevList.map(t => (t.id === threadId ? updateFn(t) : t)));
  };

  const handleToggleLock = (threadId: string, currentStatus: boolean) => {
    updateThreadInMockDataAndState(threadId, t => ({ ...t, isLocked: !currentStatus }));
    toast({ title: "Thread Action", description: `Thread ${!currentStatus ? 'locked' : 'unlocked'}.` });
  };

  const handleDeleteThread = (threadId: string, threadTitle: string) => {
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
      mockThreads.splice(mockThreadIndex, 1);
    }
    setMasterThreadList(prevList => prevList.filter(t => t.id !== threadId));
    toast({ title: "Thread Deleted", description: `Thread "${threadTitle}" has been deleted.`, variant: "destructive" });
  };

  // No-op handlers for actions not relevant to this page but required by AdminThreadTable
  const noOpToggleImportant = () => { /* console.log("Toggle important (no-op on this page)") */ };
  const noOpToggleResolved = () => { /* console.log("Toggle resolved (no-op on this page)") */ };
  const noOpUpdateThread = () => { /* console.log("Update thread (no-op on this page)") */ };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ScanSearch className="mr-3 h-8 w-8 text-primary" /> Content Moderation
        </h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Content</CardTitle>
          <CardDescription>
            Search for threads by title or post content. You can then perform moderation actions like deleting or locking threads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchInput onSearch={handleSearch} initialQuery={searchQuery} />

          {searchQuery && filteredThreads.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No content found matching &quot;{searchQuery}&quot;.
            </p>
          )}
          {searchQuery && filteredThreads.length > 0 && (
             <p className="text-sm text-muted-foreground">
              Showing {filteredThreads.length} thread(s) matching your query.
            </p>
          )}
          {!searchQuery && (
             <p className="text-center text-muted-foreground py-4">
              Enter a search term above to find content to moderate.
            </p>
          )}
        </CardContent>
      </Card>

      {searchQuery && filteredThreads.length > 0 && (
        <AdminThreadTable 
          threads={filteredThreads}
          onToggleLock={handleToggleLock}
          onToggleImportant={noOpToggleImportant}
          onToggleResolved={noOpToggleResolved}
          onDeleteThread={handleDeleteThread}
          onUpdateThread={noOpUpdateThread}
        />
      )}
    </div>
  );
}
