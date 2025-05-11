import { ForumCategoryList } from "@/components/forums/ForumCategoryList";
import { mockCategories } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function ForumsPage() {
  // In a real app, fetch categories from an API
  const categories = mockCategories;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Forum Categories</h1>
        {/* Add "Create Thread" button or similar functionality later */}
        {/* <Link href="/threads/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Thread
          </Button>
        </Link> */}
      </div>
      <ForumCategoryList categories={categories} />
    </div>
  );
}
