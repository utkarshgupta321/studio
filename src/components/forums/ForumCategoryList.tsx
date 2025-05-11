import type { ForumCategory } from "@/lib/types";
import { ForumCategoryItem } from "./ForumCategoryItem";

interface ForumCategoryListProps {
  categories: ForumCategory[];
}

export function ForumCategoryList({ categories }: ForumCategoryListProps) {
  if (!categories || categories.length === 0) {
    return <p className="text-muted-foreground">No forum categories available at the moment.</p>;
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <ForumCategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
