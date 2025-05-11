
import type { Server } from "@/lib/types";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ServerIcon as ServerLucideIcon } from "lucide-react";

interface ServerListItemProps {
  server: Server;
}

export function ServerListItem({ server }: ServerListItemProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
          <ServerLucideIcon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <Link href={`/forums/server/${server.id}`} passHref>
            <CardTitle className="text-xl hover:underline cursor-pointer">{server.name}</CardTitle>
          </Link>
          <CardDescription className="mt-1 text-sm">{server.description}</CardDescription>
        </div>
         <Link href={`/forums/server/${server.id}`} passHref>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <ArrowRight className="h-5 w-5" />
            </Button>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <Link href={`/forums/server/${server.id}`} passHref>
            <Button variant="outline" className="w-full sm:w-auto">
                View Forums <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

