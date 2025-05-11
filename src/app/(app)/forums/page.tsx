
import { ServerList } from "@/components/servers/ServerList";
import { mockServers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, ServerIcon } from "lucide-react";

export default async function ServersPage() {
  // In a real app, fetch servers from an API
  const servers = mockServers;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ServerIcon className="mr-3 h-8 w-8 text-primary" /> Available Servers
        </h1>
        {/* Placeholder for admin actions like "Add Server" if needed on this public page */}
        {/* <Link href="/admin/servers/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Server
          </Button>
        </Link> */}
      </div>
      <ServerList servers={servers} />
    </div>
  );
}
