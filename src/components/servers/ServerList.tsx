
import type { Server } from "@/lib/types";
import { ServerListItem } from "./ServerListItem";

interface ServerListProps {
  servers: Server[];
}

export function ServerList({ servers }: ServerListProps) {
  if (!servers || servers.length === 0) {
    return <p className="text-muted-foreground">No servers available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {servers.map((server) => (
        <ServerListItem key={server.id} server={server} />
      ))}
    </div>
  );
}
