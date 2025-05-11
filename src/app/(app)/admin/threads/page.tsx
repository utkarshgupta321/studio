
/**
 * @fileOverview Admin threads management page.
 * 
 * This page allows administrators to view, search, and manage forum threads.
 * It includes functionality for filtering threads and performing actions such as
 * locking/unlocking, marking as important/resolved, editing, and deleting threads.
 */
"use client";

import { useState, useEffect, useCallback } from 'react';
import { AdminThreadTable } from "@/components/admin/AdminThreadTable";
import type { EditThreadFormData } from "@/components/admin/EditThreadDialog";
import { mockThreads } from "@/lib/mock-data";
import type { Thread } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AdminThreadsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [threads, setThreads] = useState<Thread[]>([...mockThreads]); // Main state for threads
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>(threads);

  const filterAndSetThreads = useCallback((query: string, currentThreadsToFilter: Thread[]) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
      setFilteredThreads([...currentThreadsToFilter]);
      return;
    }
    const results = currentThreadsToFilter.filter(thread =>
      thread.title.toLowerCase().includes(lowerCaseQuery) ||
      (thread.posts && thread.posts.length > 0 && thread.posts[0].content.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredThreads(results);
  }, []); 

  useEffect(() => {
    filterAndSetThreads(searchQuery, threads);
  }, [searchQuery, threads, filterAndSetThreads]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const updateThreadInState = (threadId: string, updateFn: (thread: Thread) => Thread) => {
    const updatedThreads = threads.map(t => 
      t.id === threadId ? updateFn(t) : t
    );
    setThreads(updatedThreads);

    // Also update mockThreads for demo persistence
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
      mockThreads[mockThreadIndex] = updateFn(mockThreads[mockThreadIndex]);
    }
  };

  const handleToggleLock = (threadId: string, currentStatus: boolean) => {
    updateThreadInState(threadId, t => ({ ...t, isLocked: !currentStatus }));
    toast({ title: "Thread Action", description: `Thread ${!currentStatus ? 'locked' : 'unlocked'}.` });
  };

  const handleToggleImportant = (threadId: string, currentStatus: boolean) => {
    updateThreadInState(threadId, t => ({ ...t, isImportant: !currentStatus }));
    toast({ title: "Thread Action", description: `Thread marked as ${!currentStatus ? 'important' : 'not important'}.` });
  };

  const handleToggleResolved = (threadId: string, currentStatus: boolean) => {
    updateThreadInState(threadId, t => ({ ...t, isResolved: !currentStatus }));
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

  const handleUpdateThread = (threadId: string, data: EditThreadFormData) => {
    let originalTitle = "";
    updateThreadInState(threadId, t => {
      originalTitle = t.title; // Capture original title for toast message
      const updatedThread = { ...t, title: data.title };
      // If content editing was part of EditThreadFormData and implemented:
      // if (data.content && updatedThread.posts && updatedThread.posts.length > 0) {
      //   updatedThread.posts[0] = { ...updatedThread.posts[0], content: data.content, updatedAt: new Date().toISOString() };
      // }
      updatedThread.updatedAt = new Date().toISOString();
      return updatedThread;
    });
    toast({ title: "Thread Updated", description: `Thread "${originalTitle}" has been updated to "${data.title}".` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Thread Management</h1>
      </div>
       <div className="flex items-center gap-2">
        <Input 
          placeholder="Search threads by title or first post..." 
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <AdminThreadTable 
        threads={filteredThreads}
        onToggleLock={handleToggleLock}
        onToggleImportant={handleToggleImportant}
        onToggleResolved={handleToggleResolved}
        onDeleteThread={handleDeleteThread}
        onUpdateThread={handleUpdateThread} // Pass the new handler
      />
    </div>
  );
}
