
import type { User, ForumCategory, Thread, Post, Server } from '@/lib/types';
import { MessageSquare, ShieldCheck, Users, Code, HelpCircle, Briefcase, LayoutList } from 'lucide-react';

export let mockUsers: User[] = [
  { id: 'user1', username: 'MichaelDeSanta', email: 'michael@example.com', profileImageUrl: 'https://picsum.photos/seed/michael/40/40', joinDate: '2022-01-15T10:00:00Z', isAdmin: true, dataAiHint: 'man face' },
  { id: 'user2', username: 'FranklinClinton', email: 'franklin@example.com', profileImageUrl: 'https://picsum.photos/seed/franklin/40/40', joinDate: '2022-03-22T14:30:00Z', dataAiHint: 'man portrait' },
  { id: 'user3', username: 'TrevorPhilips', email: 'trevor@example.com', profileImageUrl: 'https://picsum.photos/seed/trevor/40/40', joinDate: '2021-11-05T08:20:00Z', isBanned: true, banEndDate: '2024-12-31T23:59:59Z', dataAiHint: 'person closeup' },
  { id: 'user4', username: 'LesterCrest', email: 'lester@example.com', profileImageUrl: 'https://picsum.photos/seed/lester/40/40', joinDate: '2022-05-10T12:00:00Z', dataAiHint: 'man glasses' },
];

export let mockPosts: Post[] = [
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

export let mockServers: Server[] = [
  { id: 'server1', name: 'Main GTA5 Server', description: 'The primary server for all GTA V discussions.' },
  { id: 'server2', name: 'Roleplay Hub', description: 'Dedicated to GTA V roleplaying communities.' },
];

export let mockThreads: Thread[] = [
  {
    id: 'thread1',
    title: 'New Player Guide & FAQ',
    author: mockUsers[0],
    categoryId: 'general-s1', // Belongs to 'general' category in 'server1'
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
    categoryId: 'gameplay-s1', // Belongs to 'gameplay' category in 'server1'
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
    categoryId: 'crews-s1', // Belongs to 'crews' category in 'server1'
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
    categoryId: 'announcements-s1', // Belongs to 'announcements' category in 'server1'
    createdAt: '2023-04-28T10:00:00Z',
    posts: [{ id: 'post4-1', author: mockUsers[0], content: 'Please review the updated community guidelines. TL;DR: Be excellent to each other.', createdAt: '2023-04-28T10:00:00Z' }],
    viewCount: 5000,
    replyCount: 0,
    isImportant: true,
    isLocked: true,
    lastReplyAt: '2023-04-28T10:00:00Z',
    lastReplyBy: mockUsers[0],
  },
  {
    id: 'thread5',
    title: 'RP Server Introduction',
    author: mockUsers[0],
    categoryId: 'rp-general-s2', // Belongs to 'rp-general' category in 'server2'
    createdAt: '2023-06-01T10:00:00Z',
    posts: [{id: 'post5-1', author:mockUsers[0], content: 'Welcome to the RP Hub!', createdAt: '2023-06-01T10:00:00Z'}],
    viewCount: 100,
    replyCount: 0,
    isImportant: true,
    lastReplyAt: '2023-06-01T10:00:00Z',
    lastReplyBy: mockUsers[0],
  }
];

export let mockCategories: ForumCategory[] = [
  { 
    id: 'announcements-s1', 
    name: 'Announcements', 
    description: 'Official news and announcements.',
    serverId: 'server1',
    serverName: mockServers.find(s=>s.id === 'server1')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'announcements-s1').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'announcements-s1').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: mockThreads.filter(t => t.categoryId === 'announcements-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] 
        ? { id: mockThreads.filter(t => t.categoryId === 'announcements-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].id, 
            title: mockThreads.filter(t => t.categoryId === 'announcements-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].title, 
            authorName: mockThreads.filter(t => t.categoryId === 'announcements-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].author.username, 
            timestamp: mockThreads.filter(t => t.categoryId === 'announcements-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].lastReplyAt || mockThreads.filter(t => t.categoryId === 'announcements-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
          } 
        : undefined,
    iconName: 'ShieldCheck',
  },
  { 
    id: 'general-s1', 
    name: 'General Discussion', 
    description: 'Talk about anything GTA 5 related.',
    serverId: 'server1',
    serverName: mockServers.find(s=>s.id === 'server1')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'general-s1').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'general-s1').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: mockThreads.filter(t => t.categoryId === 'general-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        ? { id: mockThreads.filter(t => t.categoryId === 'general-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].id,
            title: mockThreads.filter(t => t.categoryId === 'general-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].title,
            authorName: mockThreads.filter(t => t.categoryId === 'general-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].author.username,
            timestamp: mockThreads.filter(t => t.categoryId === 'general-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].lastReplyAt || mockThreads.filter(t => t.categoryId === 'general-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
          }
        : undefined,
    iconName: 'MessageSquare',
  },
  { 
    id: 'gameplay-s1', 
    name: 'Gameplay & Strategy', 
    description: 'Discuss missions, heists, vehicles, and tactics.',
    serverId: 'server1',
    serverName: mockServers.find(s=>s.id === 'server1')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'gameplay-s1').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'gameplay-s1').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: mockThreads.filter(t => t.categoryId === 'gameplay-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        ? { id: mockThreads.filter(t => t.categoryId === 'gameplay-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].id,
            title: mockThreads.filter(t => t.categoryId === 'gameplay-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].title,
            authorName: mockThreads.filter(t => t.categoryId === 'gameplay-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].author.username,
            timestamp: mockThreads.filter(t => t.categoryId === 'gameplay-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].lastReplyAt || mockThreads.filter(t => t.categoryId === 'gameplay-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
          }
        : undefined,
    iconName: 'Code',
  },
  { 
    id: 'crews-s1', 
    name: 'Crews & Recruitment', 
    description: 'Find a crew or recruit members for your own.',
    serverId: 'server1',
    serverName: mockServers.find(s=>s.id === 'server1')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'crews-s1').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'crews-s1').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: mockThreads.filter(t => t.categoryId === 'crews-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        ? { id: mockThreads.filter(t => t.categoryId === 'crews-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].id,
            title: mockThreads.filter(t => t.categoryId === 'crews-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].title,
            authorName: mockThreads.filter(t => t.categoryId === 'crews-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].author.username,
            timestamp: mockThreads.filter(t => t.categoryId === 'crews-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].lastReplyAt || mockThreads.filter(t => t.categoryId === 'crews-s1').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
          }
        : undefined,
    iconName: 'Users',
  },
  { 
    id: 'support-s1', 
    name: 'Technical Support', 
    description: 'Get help with game issues or site problems.',
    serverId: 'server1',
    serverName: mockServers.find(s=>s.id === 'server1')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'support-s1').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'support-s1').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: undefined,
    iconName: 'HelpCircle',
  },
  { 
    id: 'offtopic-s1', 
    name: 'Off-Topic', 
    description: 'Discuss anything not related to GTA 5.',
    serverId: 'server1',
    serverName: mockServers.find(s=>s.id === 'server1')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'offtopic-s1').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'offtopic-s1').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: undefined,
    iconName: 'Briefcase',
  },
  {
    id: 'rp-general-s2',
    name: 'RP General Chat',
    description: 'General discussions for the Roleplay Hub server.',
    serverId: 'server2',
    serverName: mockServers.find(s=>s.id === 'server2')?.name,
    threadsCount: mockThreads.filter(t => t.categoryId === 'rp-general-s2').length,
    postsCount: mockThreads.filter(t => t.categoryId === 'rp-general-s2').reduce((sum, t) => sum + t.posts.length, 0),
    lastThread: mockThreads.filter(t => t.categoryId === 'rp-general-s2').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        ? { id: mockThreads.filter(t => t.categoryId === 'rp-general-s2').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].id,
            title: mockThreads.filter(t => t.categoryId === 'rp-general-s2').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].title,
            authorName: mockThreads.filter(t => t.categoryId === 'rp-general-s2').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].author.username,
            timestamp: mockThreads.filter(t => t.categoryId === 'rp-general-s2').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].lastReplyAt || mockThreads.filter(t => t.categoryId === 'rp-general-s2').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
          }
        : undefined,
    iconName: 'MessageSquare',
  },
  {
    id: 'rp-rules-s2',
    name: 'RP Server Rules',
    description: 'Rules specific to the Roleplay Hub.',
    serverId: 'server2',
    serverName: mockServers.find(s=>s.id === 'server2')?.name,
    threadsCount: 0,
    postsCount: 0,
    lastThread: undefined,
    iconName: 'ShieldCheck',
  }
];
