import type { Thread } from "@/lib/types";
import { ThreadListItem } from "./ThreadListItem";

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  if (!threads || threads.length === 0) {
    return <p className="text-muted-foreground">No threads found in this category.</p>;
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
