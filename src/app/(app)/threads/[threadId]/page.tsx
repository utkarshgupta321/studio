import { PostList } from "@/components/threads/PostList";
import { CreatePostForm } from "@/components/threads/CreatePostForm";
import { mockThreads, mockUsers } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock, Unlock, Edit, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns';


export default async function ThreadPage({ params }: { params: { threadId: string } }) {
  const thread = mockThreads.find(t => t.id === params.threadId);
  // Simulate current user for permissions
  const currentUser = mockUsers[0]; // Assume Michael (admin) is logged in

  if (!thread) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Thread Not Found</h1>
        <Link href="/forums" passHref>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Forums
          </Button>
        </Link>
      </div>
    );
  }

  const categoryLink = `/forums/${thread.categoryId}`;

  return (
    <div className="space-y-6">
      <div>
        <Link href={categoryLink} className="text-sm text-primary hover:underline flex items-center mb-2">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Category
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{thread.title}</h1>
            {/* Admin/Mod actions placeholder */}
            {currentUser?.isAdmin && (
                 <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm">{thread.isLocked ? <Unlock className="mr-1 h-4 w-4"/> : <Lock className="mr-1 h-4 w-4"/>} {thread.isLocked ? "Unlock" : "Lock"}</Button>
                    <Button variant="outline" size="sm"><Edit className="mr-1 h-4 w-4"/> Edit</Button>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-1 h-4 w-4"/> Delete</Button>
                 </div>
            )}
        </div>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
                <AvatarImage src={thread.author.profileImageUrl} alt={thread.author.username} data-ai-hint={thread.author.dataAiHint || "profile icon"} />
                <AvatarFallback>{thread.author.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span>By <Link href={`/profile/${thread.author.id}`} className="text-primary hover:underline">{thread.author.username}</Link></span>
            <span>•</span>
            <span>{format(new Date(thread.createdAt), "PPP p")}</span>
            {thread.isImportant && <Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-600"><AlertTriangle className="h-3 w-3 mr-1" />Important</Badge>}
            {thread.isLocked && <Badge variant="secondary"><Lock className="h-3 w-3 mr-1" />Locked</Badge>}
            {thread.isResolved && <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>}
        </div>
      </div>
      
      <Separator />

      <PostList posts={thread.posts} currentUser={currentUser} />

      {!thread.isLocked && <CreatePostForm threadId={thread.id} />}
      {thread.isLocked && (
        <div className="text-center p-4 border rounded-md bg-card text-muted-foreground">
            <Lock className="h-6 w-6 mx-auto mb-2 text-yellow-500"/>
            This thread is locked. No new replies can be added.
        </div>
      )}
    </div>
  );
}
