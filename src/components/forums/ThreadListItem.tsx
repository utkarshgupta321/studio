
import type { Thread } from "@/lib/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Eye, UserCircle, CheckCircle, AlertTriangle, Lock, AlertCircle } from "lucide-react"; // Added AlertCircle
import { formatDistanceToNowStrict } from 'date-fns';


interface ThreadListItemProps {
  thread: Thread;
}

export function ThreadListItem({ thread }: ThreadListItemProps) {
  const { author } = thread;
  const isDefaultStatus = !thread.isImportant && !thread.isLocked && !thread.isResolved;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg hover:bg-card/50 transition-colors">
      <Avatar className="h-10 w-10 hidden sm:block">
        <AvatarImage src={author.profileImageUrl} alt={author.username} data-ai-hint={author.dataAiHint || "profile avatar"} />
        <AvatarFallback>{author.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {thread.isImportant && <Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-600"><AlertTriangle className="h-3 w-3 mr-1" />Important</Badge>}
          {thread.isLocked && <Badge variant="secondary"><Lock className="h-3 w-3 mr-1" />Locked</Badge>}
          {thread.isResolved && <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>}
          {isDefaultStatus && <Badge variant="outline" className="border-orange-500 text-orange-500"><AlertCircle className="mr-1 h-3 w-3" />Unresolved</Badge>}
          <Link href={`/threads/${thread.id}`} passHref>
            <h3 className="text-lg font-semibold hover:underline cursor-pointer">{thread.title}</h3>
          </Link>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1 mb-2 sm:mb-0">
          <UserCircle className="h-3 w-3" />
          <span>Started by <Link href={`/profile/${author.id}`} className="text-primary hover:underline">{author.username}</Link></span>
          <span>• {formatDistanceToNowStrict(new Date(thread.createdAt))} ago</span>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-end sm:items-center gap-2 sm:gap-1 text-sm text-muted-foreground w-full sm:w-auto mt-2 sm:mt-0">
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="flex items-center gap-1" title="Replies">
            <MessageSquare className="h-4 w-4" />
            <span>{thread.replyCount}</span>
          </div>
          <div className="flex items-center gap-1" title="Views">
            <Eye className="h-4 w-4" />
            <span>{thread.viewCount}</span>
          </div>
        </div>
        {thread.lastReplyAt && thread.lastReplyBy && (
          <div className="text-xs text-right sm:text-left mt-1 sm:mt-0 truncate">
            <p className="truncate">Last reply by <Link href={`/profile/${thread.lastReplyBy.id}`} className="text-primary hover:underline">{thread.lastReplyBy.username}</Link></p>
            <p>{formatDistanceToNowStrict(new Date(thread.lastReplyAt))} ago</p>
          </div>
        )}
      </div>
    </div>
  );
}

