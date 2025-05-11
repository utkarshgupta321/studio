import type { ForumCategory } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Edit3 } from "lucide-react"; // Edit3 for posts icon

interface ForumCategoryItemProps {
  category: ForumCategory;
}

export function ForumCategoryItem({ category }: ForumCategoryItemProps) {
  const CategoryIcon = category.icon || MessageSquare;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <CategoryIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <Link href={`/forums/${category.id}`} passHref>
            <CardTitle className="text-xl hover:underline cursor-pointer">{category.name}</CardTitle>
          </Link>
          <CardDescription className="mt-1 text-sm">{category.description}</CardDescription>
        </div>
        <Link href={`/forums/${category.id}`} passHref legacyBehavior>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <ArrowRight className="h-5 w-5" />
            </Button>
        </Link>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground pt-0">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>{category.threadsCount} Threads</span>
        </div>
        <div className="flex items-center space-x-2">
          <Edit3 className="h-4 w-4" /> {/* Using Edit3 for posts */}
          <span>{category.postsCount} Posts</span>
        </div>
        {category.lastThread ? (
          <div className="sm:col-span-3 truncate">
            <p className="font-medium">Last Thread:</p>
            <Link href={`/threads/${category.lastThread.id}`} className="text-primary hover:underline truncate block">
              {category.lastThread.title}
            </Link>
            <p className="text-xs">by {category.lastThread.authorName} on {new Date(category.lastThread.timestamp).toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="sm:col-span-3">
            <p>No threads yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
