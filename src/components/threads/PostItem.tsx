import type { Post, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNowStrict } from 'date-fns';


interface PostItemProps {
  post: Post;
  isOriginalPost?: boolean;
  currentUser?: User; // To check for edit/delete permissions
}

export function PostItem({ post, isOriginalPost = false, currentUser }: PostItemProps) {
  const { author, content, createdAt, updatedAt } = post;
  // Mock permissions
  const canEdit = currentUser?.id === author.id;
  const canDelete = currentUser?.id === author.id || currentUser?.isAdmin;

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
        <div className="mt-4 flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" /> Reply
          </Button>
          <Button variant="ghost" size="sm">
            <ThumbsUp className="h-4 w-4 mr-1" /> Like (0)
          </Button>
          {canEdit && (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          {canDelete && (
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/80">
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
