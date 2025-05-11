import type { User, ForumCategory, Thread, Post } from '@/lib/types';
import { MessageSquare, ShieldCheck, Users, Code, HelpCircle, Briefcase } from 'lucide-react';

export const mockUsers: User[] = [
  { id: 'user1', username: 'MichaelDeSanta', email: 'michael@example.com', profileImageUrl: 'https://picsum.photos/seed/michael/40/40', joinDate: '2022-01-15T10:00:00Z', isAdmin: true, dataAiHint: 'man face' },
  { id: 'user2', username: 'FranklinClinton', email: 'franklin@example.com', profileImageUrl: 'https://picsum.photos/seed/franklin/40/40', joinDate: '2022-03-22T14:30:00Z', dataAiHint: 'man portrait' },
  { id: 'user3', username: 'TrevorPhilips', email: 'trevor@example.com', profileImageUrl: 'https://picsum.photos/seed/trevor/40/40', joinDate: '2021-11-05T08:20:00Z', isBanned: true, banEndDate: '2024-12-31T23:59:59Z', dataAiHint: 'person closeup' },
  { id: 'user4', username: 'LesterCrest', email: 'lester@example.com', profileImageUrl: 'https://picsum.photos/seed/lester/40/40', joinDate: '2022-05-10T12:00:00Z', dataAiHint: 'man glasses' },
];

export const mockPosts: Post[] = [
  {
    id: 'post1-1',
    author: mockUsers[1],
    content: 'Hey everyone, just started playing GTA Online. Any tips for beginners?',
    createdAt: '2023-05-01T10:00:00Z',
  },
  {
    id: 'post1-2',
    author: mockUsers[0],
    content: 'Welcome! Best tip: grind contact missions or heists to make money fast. Don\'t trust anyone with a jetpack.',
    createdAt: '2023-05-01T10:05:00Z',
  },
  {
    id: 'post1-3',
    author: mockUsers[3],
    content: 'I can help with heists. Add me: LesterCrest. We\'ll make some serious paper.',
    createdAt: '2023-05-01T10:15:00Z',
  },
  {
    id: 'post2-1',
    author: mockUsers[0],
    content: 'What\'s the best armored vehicle for missions these days? Kuruma still good?',
    createdAt: '2023-05-02T12:00:00Z',
  },
  {
    id: 'post2-2',
    author: mockUsers[1],
    content: 'Kuruma is solid for PVE. For PVP, maybe Insurgent Pick-Up Custom or Nightshark.',
    createdAt: '2023-05-02T12:10:00Z',
  },
];

export const mockThreads: Thread[] = [
  {
    id: 'thread1',
    title: 'New Player Guide & FAQ',
    author: mockUsers[0],
    categoryId: 'general',
    createdAt: '2023-05-01T09:00:00Z',
    posts: [mockPosts[0], mockPosts[1], mockPosts[2]],
    viewCount: 1250,
    replyCount: 2,
    isImportant: true,
    lastReplyAt: mockPosts[2].createdAt,
    lastReplyBy: mockPosts[2].author,
  },
  {
    id: 'thread2',
    title: 'Best Armored Vehicles for Missions?',
    author: mockUsers[0],
    categoryId: 'gameplay',
    createdAt: '2023-05-02T11:30:00Z',
    posts: [mockPosts[3], mockPosts[4]],
    viewCount: 875,
    replyCount: 1,
    isResolved: true,
    lastReplyAt: mockPosts[4].createdAt,
    lastReplyBy: mockPosts[4].author,
  },
  {
    id: 'thread3',
    title: 'Looking for Heist Crew (PS5)',
    author: mockUsers[1],
    categoryId: 'crews',
    createdAt: '2023-05-03T14:00:00Z',
    posts: [{ id: 'post3-1', author: mockUsers[1], content: 'Need 2 more for Pacific Standard. Mics required. Add FranklinClinton.', createdAt: '2023-05-03T14:00:00Z' }],
    viewCount: 300,
    replyCount: 0,
    lastReplyAt: '2023-05-03T14:00:00Z',
    lastReplyBy: mockUsers[1],
  },
  {
    id: 'thread4',
    title: 'Site Rules and Guidelines Update',
    author: mockUsers[0],
    categoryId: 'announcements',
    createdAt: '2023-04-28T10:00:00Z',
    posts: [{ id: 'post4-1', author: mockUsers[0], content: 'Please review the updated community guidelines. TL;DR: Be excellent to each other.', createdAt: '2023-04-28T10:00:00Z' }],
    viewCount: 5000,
    replyCount: 0,
    isImportant: true,
    isLocked: true,
    lastReplyAt: '2023-04-28T10:00:00Z',
    lastReplyBy: mockUsers[0],
  },
];

export const mockCategories: ForumCategory[] = [
  { 
    id: 'announcements', 
    name: 'Announcements', 
    description: 'Official news and announcements from the GTA5Grand team.',
    threadsCount: 1,
    postsCount: 1,
    lastThread: { id: 'thread4', title: 'Site Rules and Guidelines Update', authorName: mockUsers[0].username, timestamp: '2023-04-28T10:00:00Z'},
    icon: ShieldCheck,
  },
  { 
    id: 'general', 
    name: 'General Discussion', 
    description: 'Talk about anything GTA 5 related.',
    threadsCount: 1,
    postsCount: 3,
    lastThread: { id: 'thread1', title: 'New Player Guide & FAQ', authorName: mockUsers[0].username, timestamp: '2023-05-01T10:15:00Z'},
    icon: MessageSquare,
  },
  { 
    id: 'gameplay', 
    name: 'Gameplay & Strategy', 
    description: 'Discuss missions, heists, vehicles, and tactics.',
    threadsCount: 1,
    postsCount: 2,
    lastThread: { id: 'thread2', title: 'Best Armored Vehicles for Missions?', authorName: mockUsers[0].username, timestamp: '2023-05-02T12:10:00Z'},
    icon: Code, // Using Code as a placeholder for strategy/gameplay
  },
  { 
    id: 'crews', 
    name: 'Crews & Recruitment', 
    description: 'Find a crew or recruit members for your own.',
    threadsCount: 1,
    postsCount: 1,
    lastThread: { id: 'thread3', title: 'Looking for Heist Crew (PS5)', authorName: mockUsers[1].username, timestamp: '2023-05-03T14:00:00Z'},
    icon: Users,
  },
  { 
    id: 'support', 
    name: 'Technical Support', 
    description: 'Get help with game issues or site problems.',
    threadsCount: 0,
    postsCount: 0,
    icon: HelpCircle,
  },
  { 
    id: 'offtopic', 
    name: 'Off-Topic', 
    description: 'Discuss anything not related to GTA 5.',
    threadsCount: 0,
    postsCount: 0,
    icon: Briefcase, // Placeholder for off-topic
  },
];
