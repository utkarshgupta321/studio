
/**
 * @fileOverview Admin threads management page.
 * 
 * This page allows administrators to view, search, and manage forum threads.
 * It includes functionality for filtering threads and performing actions such as
 * locking/unlocking, marking as important/resolved, editing, and deleting threads.
 */
"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AdminThreadTable } from "@/components/admin/AdminThreadTable";
import type { EditThreadFormData } from "@/components/admin/EditThreadDialog";
import { mockThreads } from "@/lib/mock-data";
import type { Thread } from "@/lib/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

const filterOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'locked', label: 'Locked' },
  { value: 'unlocked', label: 'Unlocked' },
  { value: 'important', label: 'Important' },
  { value: 'not-important', label: 'Not Important' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'unresolved', label: 'Unresolved' },
];

function AdminThreadsPageComponent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSearchQuery = searchParams.get('q') || '';
  const initialStatusFilter = searchParams.get('filter') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(initialStatusFilter);
  const [threads, setThreads] = useState<Thread[]>([...mockThreads]); // Main state for threads
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>(threads);

  const applyFilters = useCallback(() => {
    let currentFilteredThreads = [...threads]; // Start with all threads from state

    // Apply search query filter
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (lowerCaseQuery) {
      currentFilteredThreads = currentFilteredThreads.filter(thread =>
        thread.title.toLowerCase().includes(lowerCaseQuery) ||
        (thread.posts && thread.posts.length > 0 && thread.posts[0].content.toLowerCase().includes(lowerCaseQuery))
      );
    }

    // Apply status filter
    if (selectedStatusFilter !== 'all') {
      currentFilteredThreads = currentFilteredThreads.filter(thread => {
        switch (selectedStatusFilter) {
          case 'locked':
            return thread.isLocked === true;
          case 'unlocked':
            return !thread.isLocked;
          case 'important':
            return thread.isImportant === true;
          case 'not-important':
            return !thread.isImportant;
          case 'resolved':
            return thread.isResolved === true;
          case 'unresolved':
            return !thread.isResolved;
          default:
            return true;
        }
      });
    }
    setFilteredThreads(currentFilteredThreads);
  }, [threads, searchQuery, selectedStatusFilter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Effect to update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedStatusFilter !== 'all') params.set('filter', selectedStatusFilter);
    
    const queryString = params.toString();
    const newPath = queryString ? `/admin/threads?${queryString}` : '/admin/threads';
    
    // Check if current URL search params match what we are about to push to avoid redundant pushes
    if (searchParams.toString() !== queryString) {
      router.push(newPath, { scroll: false }); // Use router.push for Next.js navigation
    }
  }, [searchQuery, selectedStatusFilter, router, searchParams]);
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setSelectedStatusFilter(value);
  };

  const updateThreadInState = (threadId: string, updateFn: (thread: Thread) => Thread) => {
    const updatedThreads = threads.map(t => 
      t.id === threadId ? updateFn(t) : t
    );
    setThreads(updatedThreads); // This will trigger the applyFilters effect

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
    const newThreads = threads.filter(t => t.id !== threadId);
    setThreads(newThreads); // This will trigger the applyFilters effect
    
    const mockThreadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (mockThreadIndex !== -1) {
        mockThreads.splice(mockThreadIndex, 1);
    }
    toast({ title: "Thread Deleted", description: `Thread "${threadTitle}" has been deleted.`, variant: "destructive" });
  };

  const handleUpdateThread = (threadId: string, data: EditThreadFormData) => {
    let originalTitle = "";
    updateThreadInState(threadId, t => {
      originalTitle = t.title; 
      const updatedThread = { ...t, title: data.title };
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
       <div className="flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-grow sm:max-w-sm">
          <Label htmlFor="search-threads">Search Threads</Label>
          <Input 
            id="search-threads"
            placeholder="Search by title or first post..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <Label htmlFor="status-filter">Filter by Status</Label>
          <Select value={selectedStatusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <AdminThreadTable 
        threads={filteredThreads}
        onToggleLock={handleToggleLock}
        onToggleImportant={handleToggleImportant}
        onToggleResolved={handleToggleResolved}
        onDeleteThread={handleDeleteThread}
        onUpdateThread={handleUpdateThread}
      />
    </div>
  );
}

function AdminThreadsPageLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Skeleton className="h-9 w-64" />
      </div>
      <div className="flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-grow sm:max-w-sm space-y-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[200px] space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <Skeleton className="h-64 w-full" /> {/* Placeholder for table */}
    </div>
  );
}

export default function AdminThreadsPage() {
  return (
    <Suspense fallback={<AdminThreadsPageLoadingSkeleton />}>
      <AdminThreadsPageComponent />
    </Suspense>
  );
}
