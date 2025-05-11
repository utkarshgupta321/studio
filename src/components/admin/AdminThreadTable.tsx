"use client";

import type { Thread } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Lock, Unlock, Edit, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNowStrict } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface AdminThreadTableProps {
  threads: Thread[];
}

export function AdminThreadTable({ threads }: AdminThreadTableProps) {
  const { toast } = useToast();

  const handleThreadAction = (action: string, threadId: string, threadTitle: string) => {
    console.log(`${action} thread ${threadId}`);
    toast({ title: "Thread Action", description: `Simulated ${action.toLowerCase()} thread: ${threadTitle}` });
  };
  
  if (!threads || threads.length === 0) {
    return <p className="text-muted-foreground">No threads found.</p>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Replies</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {threads.map((thread) => (
            <TableRow key={thread.id}>
              <TableCell className="font-medium max-w-xs truncate">
                <Link href={`/threads/${thread.id}`} className="hover:underline" title={thread.title}>
                    {thread.title}
                </Link>
              </TableCell>
              <TableCell>{thread.author.username}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                    {thread.isImportant && <Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-600"><AlertTriangle className="mr-1 h-3 w-3"/>Imp</Badge>}
                    {thread.isLocked && <Badge variant="secondary"><Lock className="mr-1 h-3 w-3"/>Lock</Badge>}
                    {thread.isResolved && <Badge className="bg-green-600 hover:bg-green-700"><CheckCircle className="mr-1 h-3 w-3"/>Res</Badge>}
                    {!thread.isImportant && !thread.isLocked && !thread.isResolved && <Badge variant="outline">Open</Badge>}
                </div>
              </TableCell>
              <TableCell>{thread.replyCount}</TableCell>
              <TableCell>{thread.viewCount}</TableCell>
              <TableCell>{formatDistanceToNowStrict(new Date(thread.createdAt))} ago</TableCell>
              <TableCell className="text-right">
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                       <span className="sr-only">Thread Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleThreadAction(thread.isLocked ? "Unlock" : "Lock", thread.id, thread.title)}>
                        {thread.isLocked ? <Unlock className="mr-2 h-4 w-4 text-green-500"/> : <Lock className="mr-2 h-4 w-4 text-orange-500" />}
                        {thread.isLocked ? "Unlock" : "Lock"} Thread
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThreadAction(thread.isImportant ? "Unmark" : "Mark", thread.id, thread.title)}>
                        <AlertTriangle className={`mr-2 h-4 w-4 ${thread.isImportant ? 'text-muted-foreground' : 'text-yellow-500'}`} />
                        {thread.isImportant ? "Unmark Important" : "Mark Important"}
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => handleThreadAction(thread.isResolved ? "Unmark" : "Mark", thread.id, thread.title)}>
                        <CheckCircle className={`mr-2 h-4 w-4 ${thread.isResolved ? 'text-muted-foreground' : 'text-green-500'}`} />
                        {thread.isResolved ? "Unmark Resolved" : "Mark Resolved"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleThreadAction("Edit", thread.id, thread.title)}><Edit className="mr-2 h-4 w-4" />Edit Thread</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleThreadAction("Delete", thread.id, thread.title)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />Delete Thread
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
