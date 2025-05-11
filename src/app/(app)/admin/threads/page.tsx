/**
 * @fileOverview Admin threads management page.
 * 
 * This page allows administrators to view, search, and manage forum threads.
 * It includes functionality for filtering threads and performing actions such as
 * locking/unlocking, marking as important/resolved, and deleting threads.
 */
"use client";

import { useState, useEffect, useCallback } from 'react';
import { AdminThreadTable } from "@/components/admin/AdminThreadTable";
import { mockThreads } from "@/lib/mock-data";
import type { Thread } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
// PlusCircle, Download are commented out as they are not directly used for search functionality.
// import { Button } from "@/components/ui/button";
// import { PlusCircle, Download } from "lucide-react";


export default function AdminThreadsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  // Use a state for threads that can be mutated
  const [threads, setThreads] = useState<Thread[]>([...mockThreads]);
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>(threads);

  // Function to filter threads based on query - memoized with useCallback
  const filterThreads = useCallback((query: string, currentThreadsToFilter: Thread[]) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
      setFilteredThreads([...currentThreadsToFilter]); // Show all threads if query is empty
      return;
    }
    const results = currentThreadsToFilter.filter(thread =>
      thread.title.toLowerCase().includes(lowerCaseQuery) ||
      (thread.posts && thread.posts.length > 0 && thread.posts[0].content.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredThreads(results);
  }, []); 

  useEffect(() => {
    // When the main 'threads' state changes (e.g., after an action), re-filter
    filterThreads(searchQuery, threads);
  }, [searchQuery, threads, filterThreads]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleLock = (threadId: string, currentStatus: boolean) => {
    setThreads(prevThreads =>
      prevThreads.map(t =>
        t.id === threadId ? { ...t, isLocked: !currentStatus } : t
      )
    );
    
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
        mockThreads[mockThreadIndex].isLocked = !currentStatus;
    }
    
    toast({ title: "Thread Action", description: `Thread ${!currentStatus ? 'locked' : 'unlocked'}.` });
  };

  const handleToggleImportant = (threadId: string, currentStatus: boolean) => {
    setThreads(prevThreads =>
      prevThreads.map(t =>
        t.id === threadId ? { ...t, isImportant: !currentStatus } : t
      )
    );
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
        mockThreads[mockThreadIndex].isImportant = !currentStatus;
    }

    toast({ title: "Thread Action", description: `Thread marked as ${!currentStatus ? 'important' : 'not important'}.` });
  };

  const handleToggleResolved = (threadId: string, currentStatus: boolean) => {
    setThreads(prevThreads =>
      prevThreads.map(t =>
        t.id === threadId ? { ...t, isResolved: !currentStatus } : t
      )
    );
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
        mockThreads[mockThreadIndex].isResolved = !currentStatus;
    }

    toast({ title: "Thread Action", description: `Thread marked as ${!currentStatus ? 'resolved' : 'unresolved'}.` });
  };

  const handleDeleteThread = (threadId: string, threadTitle: string) => {
    setThreads(prevThreads => prevThreads.filter(t => t.id !== threadId));
    
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
        mockThreads.splice(mockThreadIndex, 1);
    }

    toast({ title: "Thread Deleted", description: `Thread "${threadTitle}" has been deleted.`, variant: "destructive" });
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
      <AdminThreadTable 
        threads={filteredThreads}
        onToggleLock={handleToggleLock}
        onToggleImportant={handleToggleImportant}
        onToggleResolved={handleToggleResolved}
        onDeleteThread={handleDeleteThread}
      />
    </div>
  );
}
