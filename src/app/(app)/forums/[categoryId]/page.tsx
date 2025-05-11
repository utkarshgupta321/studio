
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
        <Link href="/forums" passHref>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Forums
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/forums" className="text-sm text-primary hover:underline flex items-center mb-1">
            <ChevronLeft className="h-4 w-4 mr-1" /> All Forums
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
              "w-full justify-between hover:no-underline py-0" // Ensure it spans width, aligns chevron, overrides default padding
            )}
          >
            <span className="flex items-center"> {/* Group custom icon and text */}
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Thread
            </span>
            {/* AccordionTrigger itself will add the ChevronDown icon here, pushed to the right by justify-between */}
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

