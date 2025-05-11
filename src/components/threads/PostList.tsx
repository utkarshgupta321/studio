import type { Post, User } from "@/lib/types";
import { PostItem } from "./PostItem";

interface PostListProps {
  posts: Post[];
  currentUser?: User; // For edit/delete permissions
}

export function PostList({ posts, currentUser }: PostListProps) {
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
        />
      ))}
    </div>
  );
}
