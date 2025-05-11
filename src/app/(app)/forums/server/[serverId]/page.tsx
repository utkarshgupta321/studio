
import { ForumCategoryList } from "@/components/forums/ForumCategoryList";
import { mockCategories, mockServers } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, List } from "lucide-react";

export default async function ServerCategoriesPage({ params }: { params: { serverId: string } }) {
  const server = mockServers.find(s => s.id === params.serverId);
  
  if (!server) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Server Not Found</h1>
        <Link href="/forums" passHref>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Server List
          </Button>
        </Link>
      </div>
    );
  }

  const categoriesForServer = mockCategories.filter(cat => cat.serverId === params.serverId);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/forums" className="text-sm text-[hsl(var(--primary-text-light))] dark:text-primary hover:underline flex items-center mb-1">
            <ChevronLeft className="h-4 w-4 mr-1" /> All Servers
          </Link>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <List className="mr-3 h-8 w-8 text-primary" /> Categories in {server.name}
          </h1>
          <p className="text-muted-foreground mt-1">{server.description}</p>
        </div>
      </div>
      
      <ForumCategoryList categories={categoriesForServer} />
    </div>
  );
}
