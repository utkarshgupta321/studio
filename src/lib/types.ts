
import type { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  username: string;
  email?: string; // For login, not necessarily public
  profileImageUrl?: string;
  dataAiHint?: string; // For next/image data-ai-hint attribute
  joinDate: string; // ISO Date string
  isAdmin?: boolean;
  isBanned?: boolean;
  banEndDate?: string; // ISO Date string if temporary ban
}

export interface Post {
  id:string;
  author: User;
  content: string;
  createdAt: string; // ISO Date string
  updatedAt?: string; // ISO Date string
}

export interface Thread {
  id: string;
  title: string;
  author: User;
  categoryId: string;
  createdAt: string; // ISO Date string
  updatedAt?: string; // ISO Date string
  posts: Post[];
  isLocked?: boolean;
  isImportant?: boolean;
  isResolved?: boolean;
  viewCount: number;
  replyCount: number; 
  lastReplyAt?: string; // ISO Date string
  lastReplyBy?: User;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  threadsCount: number;
  postsCount: number;
  lastThread?: {
    id: string;
    title: string;
    authorName: string;
    timestamp: string;
  };
  icon?: LucideIcon;
}
