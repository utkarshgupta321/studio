

"use client";

import { use, useState, useEffect, useRef } from 'react'; 
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { PostList } from "@/components/threads/PostList";
import { CreatePostForm } from "@/components/threads/CreatePostForm";
import { mockThreads, mockUsers, mockCategories, mockPosts } from "@/lib/mock-data";
import type { Thread, User as CurrentUserType, EditThreadFormData, Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, Unlock, Edit, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { EditThreadDialog } from '@/components/admin/EditThreadDialog'; 
import { EditPostDialog, type EditPostFormData } from '@/components/threads/EditPostDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ResolvedPageParams {
  threadId: string;
}

export default function ThreadPage({ params: paramsInput }: { params: ResolvedPageParams | Promise<ResolvedPageParams> }) {
  const params = (typeof (paramsInput as Promise<ResolvedPageParams>)?.then === 'function') 
    ? use(paramsInput as Promise<ResolvedPageParams>) 
    : paramsInput as ResolvedPageParams;
  
  const { threadId } = params;

  const router = useRouter();
  const { toast } = useToast();
  const [thread, setThread] = useState<Thread | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditPostDialogOpen, setIsEditPostDialogOpen] = useState(false);

  const [replyQuote, setReplyQuote] = useState<string | null>(null);
  const createPostFormRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const foundThread = mockThreads.find(t => t.id === threadId); 
    const user = mockUsers[0]; 
    
    setThread(foundThread ? {...foundThread, posts: [...foundThread.posts.map(p => ({...p}))]} : null); // Deep copy posts for local state updates
    setCurrentUser(user);
    setIsLoading(false);
  }, [threadId]); 

  const category = thread ? mockCategories.find(c => c.id === thread.categoryId) : null;
  const categoryLink = category ? `/forums/${thread?.categoryId}` : '/forums';
  const categoryName = category ? category.name : "Category";
  const backToText = category ? `Back to ${categoryName}` : "Back to Categories";

  const canManageThread = currentUser?.isAdmin || (thread && currentUser?.id === thread.author.id);

  const handleOpenEditDialog = () => {
    if (thread) {
      setIsEditDialogOpen(true);
    }
  };
  const handleCloseEditDialog = () => setIsEditDialogOpen(false);

  const handleSaveThreadEdit = (id: string, data: EditThreadFormData) => { 
    const threadIndex = mockThreads.findIndex(t => t.id === id);
    if (threadIndex !== -1) {
      const originalTitle = mockThreads[threadIndex].title;
      const updatedMockThread = {
        ...mockThreads[threadIndex],
        title: data.title,
        updatedAt: new Date().toISOString(),
      };
      mockThreads[threadIndex] = updatedMockThread;
      setThread({ ...updatedMockThread, posts: [...updatedMockThread.posts.map(p => ({...p}))] }); 
      toast({ title: "Thread Updated", description: `Thread "${originalTitle}" has been updated to "${data.title}".` });
    }
    handleCloseEditDialog();
  };

  const handleDeleteThread = () => {
    if (thread) {
      const threadIndex = mockThreads.findIndex(t => t.id === thread.id);
      if (threadIndex !== -1) {
        const deletedTitle = mockThreads[threadIndex].title;
        mockThreads.splice(threadIndex, 1);
        toast({ title: "Thread Deleted", description: `Thread "${deletedTitle}" has been deleted.`, variant: "destructive" });
        router.push(categoryLink); 
      }
    }
    setIsDeleteDialogOpen(false);
  };
  
  const handleToggleLock = () => {
     if (thread && currentUser?.isAdmin) { 
        const updatedThread = { ...thread, isLocked: !thread.isLocked };
        const threadIndex = mockThreads.findIndex(t => t.id === thread.id);
        if (threadIndex !== -1) {
            mockThreads[threadIndex] = {...updatedThread, posts: [...updatedThread.posts.map(p => ({...p}))]};
        }
        setThread(updatedThread);
        toast({ title: "Thread Action", description: `Thread ${updatedThread.isLocked ? 'locked' : 'unlocked'}.` });
     } else if (thread && !currentUser?.isAdmin) {
        toast({ title: "Permission Denied", description: "Only administrators can lock or unlock threads.", variant: "destructive" });
     }
  };

  const handleDeletePost = (postId: string) => {
    if (!thread) return;
    const postIndex = thread.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      toast({ title: "Error", description: "Post not found.", variant: "destructive" });
      return;
    }
    if (postIndex === 0 && !currentUser?.isAdmin) { 
        toast({ title: "Action Not Allowed", description: "Cannot delete the original post this way. Delete the thread instead.", variant: "destructive" });
        return;
    }
    // Admin can delete even the original post, which effectively deletes the thread.
    if (postIndex === 0 && currentUser?.isAdmin) {
        handleDeleteThread(); // Trigger thread deletion
        return;
    }


    const updatedPosts = thread.posts.filter(p => p.id !== postId);
    const updatedThreadData = { ...thread, posts: updatedPosts, replyCount: updatedPosts.length -1 };

    const mainThreadIndex = mockThreads.findIndex(t => t.id === thread.id);
    if (mainThreadIndex !== -1) {
      mockThreads[mainThreadIndex] = {...updatedThreadData, posts: [...updatedThreadData.posts.map(p => ({...p}))]};
       // Remove post from global mockPosts as well
      const globalPostIndex = mockPosts.findIndex(p => p.id === postId);
      if (globalPostIndex !== -1) {
        mockPosts.splice(globalPostIndex, 1);
      }
    }
    setThread(updatedThreadData);
    toast({ title: "Post Deleted", description: "The post has been successfully deleted." });
  };

  const handleOpenEditPostDialog = (postToEdit: Post) => {
    if (postToEdit.id === thread?.posts[0]?.id && !currentUser?.isAdmin) { 
        toast({ title: "Info", description: "To edit the original post's content, use the 'Edit Thread' option (modifies title). Non-admins cannot edit original post content.", variant: "default" });
        return;
    }
    // Admin can edit original post via this dialog
    setEditingPost(postToEdit);
    setIsEditPostDialogOpen(true);
  };

  const handleCloseEditPostDialog = () => {
    setIsEditPostDialogOpen(false);
    setEditingPost(null);
  };

  const handleSavePostEdit = (postId: string, data: EditPostFormData) => {
    if (!thread) return;
    const postIndex = thread.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      toast({ title: "Error", description: "Post not found for update.", variant: "destructive" });
      return;
    }

    const updatedPost = { ...thread.posts[postIndex], content: data.content, updatedAt: new Date().toISOString() };
    const updatedPosts = [...thread.posts];
    updatedPosts[postIndex] = updatedPost;

    const updatedThreadData = { ...thread, posts: updatedPosts };
    
    const mainThreadIndex = mockThreads.findIndex(t => t.id === thread.id);
    if (mainThreadIndex !== -1) {
      mockThreads[mainThreadIndex].posts[postIndex] = {...updatedPost}; // Update post in mockThreads
      // Update post in global mockPosts as well
      const globalPostIndex = mockPosts.findIndex(p => p.id === postId);
      if (globalPostIndex !== -1) {
        mockPosts[globalPostIndex] = {...updatedPost};
      }
    }
    setThread(updatedThreadData);
    toast({ title: "Post Updated", description: "Your post has been successfully updated." });
    handleCloseEditPostDialog();
  };

  const handleLikePost = (postId: string) => {
    if (!currentUser) {
      toast({ title: "Login Required", description: "Please log in to like posts.", variant: "destructive" });
      return;
    }
    if (!thread) return;

    const threadIndex = mockThreads.findIndex(t => t.id === thread.id);
    if (threadIndex === -1) return;

    const postIndexInThread = mockThreads[threadIndex].posts.findIndex(p => p.id === postId);
    if (postIndexInThread === -1) return;

    const targetPostInMockThreads = mockThreads[threadIndex].posts[postIndexInThread];
    
    // Initialize likedBy and likeCount if they don't exist
    if (!targetPostInMockThreads.likedBy) {
      targetPostInMockThreads.likedBy = [];
    }
    if (targetPostInMockThreads.likeCount === undefined) {
        targetPostInMockThreads.likeCount = 0;
    }

    const userHasLiked = targetPostInMockThreads.likedBy.includes(currentUser.id);

    if (userHasLiked) {
      // User has liked, so unlike
      targetPostInMockThreads.likedBy = targetPostInMockThreads.likedBy.filter(id => id !== currentUser.id);
      targetPostInMockThreads.likeCount = Math.max(0, targetPostInMockThreads.likeCount - 1); // Ensure not negative
    } else {
      // User has not liked, so like
      targetPostInMockThreads.likedBy.push(currentUser.id);
      targetPostInMockThreads.likeCount += 1;
    }

    // Update global mockPosts as well
    const postIndexInMockPosts = mockPosts.findIndex(p => p.id === postId);
    if (postIndexInMockPosts !== -1) {
      mockPosts[postIndexInMockPosts].likeCount = targetPostInMockThreads.likeCount;
      mockPosts[postIndexInMockPosts].likedBy = [...targetPostInMockThreads.likedBy]; 
    }
    
    setThread(prevThread => {
      if (!prevThread) return null;
      const updatedPosts = prevThread.posts.map(p => 
        p.id === postId ? { 
          ...p, 
          likeCount: targetPostInMockThreads.likeCount,
          likedBy: [...targetPostInMockThreads.likedBy] 
        } : p
      );
      return { ...prevThread, posts: updatedPosts };
    });

    toast({ 
      title: userHasLiked ? "Post Unliked" : "Post Liked!", 
      description: userHasLiked ? "You've unliked this post." : "You've liked this post." 
    });
  };


  const handlePrepareReply = (postContent: string, authorUsername: string) => {
    if (!currentUser) {
      toast({ title: "Login Required", description: "Please log in to reply.", variant: "destructive" });
      return;
    }
    const formattedQuote = `> **${authorUsername} wrote:**\n${postContent.split('\n').map(line => `> ${line}`).join('\n')}\n\n`;
    setReplyQuote(formattedQuote);
    
    setTimeout(() => {
        createPostFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const textarea = createPostFormRef.current?.querySelector('textarea');
        textarea?.focus();
    }, 0);
  };


  if (isLoading && !thread) { 
    return <div>Loading thread...</div>; 
  }

  if (!thread) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Thread Not Found</h1>
        <Link href="/forums" passHref>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Servers
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href={categoryLink} className="text-sm text-[hsl(var(--primary-text-light))] dark:text-primary hover:underline flex items-center mb-2">
          <ChevronLeft className="h-4 w-4 mr-1" /> {backToText}
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{thread.title}</h1>
            {canManageThread && (
                 <div className="flex gap-2 mt-2 sm:mt-0 flex-wrap">
                    {currentUser?.isAdmin && ( 
                        <Button variant="outline" size="sm" onClick={handleToggleLock}>
                            {thread.isLocked ? <Unlock className="mr-1 h-4 w-4"/> : <Lock className="mr-1 h-4 w-4"/>} 
                            {thread.isLocked ? "Unlock" : "Lock"}
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={handleOpenEditDialog}>
                        <Edit className="mr-1 h-4 w-4"/> Edit Title
                    </Button>
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm"><Trash2 className="mr-1 h-4 w-4"/> Delete Thread</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the thread
                            &quot;{thread.title}&quot; and all its posts.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteThread}>Delete Thread</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                 </div>
            )}
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
                <AvatarImage src={thread.author.profileImageUrl} alt={thread.author.username} data-ai-hint={thread.author.dataAiHint || "profile icon"} />
                <AvatarFallback>{thread.author.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>By <Link href={`/profile/${thread.author.id}`} className="text-[hsl(var(--primary-text-light))] dark:text-primary hover:underline">{thread.author.username}</Link></span>
            <span>•</span>
            <span>{format(new Date(thread.createdAt), "PPP p")}</span>
            {thread.isImportant && <Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-600"><AlertTriangle className="h-3 w-3 mr-1" />Important</Badge>}
            {thread.isLocked && <Badge variant="secondary"><Lock className="h-3 w-3 mr-1" />Locked</Badge>}
            {thread.isResolved && <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>}
        </div>
      </div>
      
      <Separator />

      <PostList
        posts={thread.posts}
        currentUser={currentUser}
        threadAuthorId={thread.author.id}
        onDeletePost={handleDeletePost}
        onEditPost={handleOpenEditPostDialog}
        onLikePost={handleLikePost}
        onPrepareReply={handlePrepareReply}
      />
      
      <div ref={createPostFormRef} className="mt-8">
        {!thread.isLocked && currentUser && <CreatePostForm 
            threadId={thread.id} 
            initialContent={replyQuote}
            onPostCreated={() => {
                const refreshedThread = mockThreads.find(t => t.id === threadId);
                if(refreshedThread) setThread({...refreshedThread, posts: [...refreshedThread.posts.map(p => ({...p}))]});
                setReplyQuote(null); // Clear the quote after posting
            }} 
        />}
      </div>

      {thread.isLocked && (
        <div className="text-center p-4 border rounded-md bg-card text-muted-foreground mt-8">
            <Lock className="h-6 w-6 mx-auto mb-2 text-yellow-500"/>
            This thread is locked. No new replies can be added.
        </div>
      )}
      {!currentUser && !thread.isLocked && (
         <div className="text-center p-4 border rounded-md bg-card text-muted-foreground mt-8">
            Please <Link href="/login" className="text-[hsl(var(--primary-text-light))] dark:text-primary hover:underline">log in</Link> to reply.
        </div>
      )}

      {isEditDialogOpen && thread && (
        <EditThreadDialog
            thread={thread}
            isOpen={isEditDialogOpen}
            onClose={handleCloseEditDialog}
            onSave={handleSaveThreadEdit}
        />
      )}

      {editingPost && isEditPostDialogOpen && (
        <EditPostDialog
          post={editingPost}
          isOpen={isEditPostDialogOpen}
          onClose={handleCloseEditPostDialog}
          onSave={handleSavePostEdit}
        />
      )}
    </div>
  );
}

