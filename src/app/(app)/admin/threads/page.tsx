import { AdminThreadTable } from "@/components/admin/AdminThreadTable";
import { mockThreads } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function AdminThreadsPage() {
  // In a real app, fetch threads from an API, possibly with pagination and filtering
  const threads = mockThreads;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Thread Management</h1>
         {/* <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Thread</Button> */}
      </div>
       <div className="flex items-center gap-2">
        <Input placeholder="Search threads by title or content..." className="max-w-sm"/>
        {/* Add filters for status, category etc. if needed */}
      </div>
      <AdminThreadTable threads={threads} />
    </div>
  );
}
