
import type { Post, User } from "@/lib/types";
import { PostItem } from "./PostItem";

interface PostListProps {
  posts: Post[];
  currentUser?: User | null;
  threadAuthorId?: string;
  onDeletePost?: (postId: string) => void;
  onEditPost?: (post: Post) => void; 
  onLikePost?: (postId: string) => void;
  onPrepareReply?: (postContent: string, authorUsername: string) => void;
}

export function PostList({ posts, currentUser, threadAuthorId, onDeletePost, onEditPost, onLikePost, onPrepareReply }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-muted-foreground">No posts in this thread yet.</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <PostItem 
          key={post.id} 
          post={post} 
          isOriginalPost={index === 0}
          currentUser={currentUser}
          threadAuthorId={threadAuthorId}
          onDeletePost={onDeletePost}
          onEditPost={onEditPost} 
          onLikePost={onLikePost}
          onPrepareReply={onPrepareReply}
        />
      ))}
    </div>
  );
}
