
import type { Post, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNowStrict } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
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

interface PostItemProps {
  post: Post;
  isOriginalPost?: boolean;
  currentUser?: User | null;
  threadAuthorId?: string;
  onDeletePost?: (postId: string) => void;
  onEditPost?: (post: Post) => void;
}

export function PostItem({
  post,
  isOriginalPost = false,
  currentUser,
  threadAuthorId,
  onDeletePost,
  onEditPost,
}: PostItemProps) {
  const { author, content, createdAt, updatedAt } = post;
  const { toast } = useToast();

  const isPostAuthor = currentUser?.id === author.id;

  // Admin can do anything to non-original posts via these controls.
  // Post author can edit/delete their own non-original posts.
  // Original post (OP) edit/delete is typically handled at the thread level (Edit Thread, Delete Thread).
  const canEditThisPost = !isOriginalPost && (currentUser?.isAdmin || isPostAuthor);
  const canDeleteThisPost = !isOriginalPost && (currentUser?.isAdmin || isPostAuthor);

  const handleEdit = () => {
    if (isOriginalPost) {
      toast({ title: "Action Info", description: "To edit the original post, please use the 'Edit Thread' option for the entire thread.", variant: "default" });
      return;
    }
    if (canEditThisPost && onEditPost) {
      onEditPost(post);
    } else if (canEditThisPost) {
       toast({ title: "Edit Post", description: "Post editing dialog is not available.", variant: "default" });
    } else {
        toast({ title: "Permission Denied", description: "You do not have permission to edit this post.", variant: "destructive"});
    }
  };

  const actualDeletePost = () => {
     if (onDeletePost) {
        onDeletePost(post.id);
      } else {
        console.error("onDeletePost handler not provided to PostItem");
        toast({ title: "Error", description: "Could not delete post. Handler missing.", variant: "destructive" });
      }
  };

  const handleReply = () => {
    toast({ title: "Reply to Post", description: "Replying to specific posts is not yet implemented. Use the form at the bottom of the thread.", variant: "default" });
  };

  const handleLike = () => {
    toast({ title: "Like Post", description: "Liking posts is not yet implemented.", variant: "default" });
  };

  return (
    <div className={`flex gap-4 p-4 rounded-lg ${isOriginalPost ? 'border-2 border-primary/50 bg-card' : 'border bg-card/80'}`}>
      <div className="flex flex-col items-center w-24 sm:w-32 flex-shrink-0">
        <Link href={`/profile/${author.id}`} passHref>
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mb-2 border-2 border-border hover:border-primary transition-colors">
              <AvatarImage src={author.profileImageUrl} alt={author.username} data-ai-hint={author.dataAiHint || "user avatar"}/>
              <AvatarFallback>{author.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
        </Link>
        <Link href={`/profile/${author.id}`} passHref>
            <p className="font-semibold text-primary hover:underline text-center truncate w-full">{author.username}</p>
        </Link>
        <p className="text-xs text-muted-foreground">{author.isAdmin ? "Admin" : "Member"}</p>
        <p className="text-xs text-muted-foreground mt-1">Joined: {new Date(author.joinDate).toLocaleDateString()}</p>
      </div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground mb-2">
          Posted {formatDistanceToNowStrict(new Date(createdAt))} ago
          {updatedAt && createdAt !== updatedAt && (
            <span className="italic"> (edited {formatDistanceToNowStrict(new Date(updatedAt))} ago)</span>
          )}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap break-words">
          {content}
        </div>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Button variant="ghost" size="sm" onClick={handleReply}>
            <MessageCircle className="h-4 w-4 mr-1" /> Reply
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLike}>
            <ThumbsUp className="h-4 w-4 mr-1" /> Like (0)
          </Button>
          {canEditThisPost && (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          {canDeleteThisPost && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={actualDeletePost}>Delete Post</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </div>
  );
}
