
"use client";

import type { Server } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, ServerIcon as ServerLucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AdminServerTableProps {
  servers: Server[];
  // onEditServer: (server: Server) => void; // For future use
  onDeleteServer: (serverId: string, serverName: string) => void;
}

export function AdminServerTable({ servers, /* onEditServer, */ onDeleteServer }: AdminServerTableProps) {
  if (!servers || servers.length === 0) {
    return <Card className="p-4"><p className="text-muted-foreground">No servers found.</p></Card>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Icon</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servers.map((server) => (
            <TableRow key={server.id}>
              <TableCell>
                <ServerLucideIcon className="h-5 w-5 text-primary" />
              </TableCell>
              <TableCell className="font-medium">{server.name}</TableCell>
              <TableCell className="text-muted-foreground max-w-md truncate">{server.description}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Server Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* <DropdownMenuItem onClick={() => onEditServer(server)}>
                      <Edit className="mr-2 h-4 w-4" />Edit Server
                    </DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => onDeleteServer(server.id, server.name)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />Delete Server
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
