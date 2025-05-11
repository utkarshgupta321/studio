

import { ThreadList } from "@/components/forums/ThreadList";
import { mockCategories, mockThreads } from "@/lib/mock-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { CreateThreadForm } from '@/components/forums/CreateThreadForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";


export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  const category = mockCategories.find(cat => cat.id === params.categoryId);
  const threads = mockThreads.filter(thread => thread.categoryId === params.categoryId);

  if (!category) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <Link href="/forums" passHref> {/* Fallback to server list if category not found */}
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Servers
          </Button>
        </Link>
      </div>
    );
  }
  
  const serverCategoryListLink = `/forums/server/${category.serverId}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href={serverCategoryListLink} className="text-sm text-[hsl(var(--primary-text-light))] dark:text-primary hover:underline flex items-center mb-1">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Categories in {category.serverName || 'Server'}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="create-thread">
          <AccordionTrigger
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full justify-between py-3 data-[state=closed]:rounded-lg data-[state=open]:rounded-t-lg data-[state=closed]:hover:no-underline data-[state=open]:hover:no-underline" 
            )}
          >
            <span className="flex items-center"> {/* Group custom icon and text */}
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Thread
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <CreateThreadForm categoryId={params.categoryId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ThreadList threads={threads} />
    </div>
  );
}

