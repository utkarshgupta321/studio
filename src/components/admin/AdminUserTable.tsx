"use client";

import type { User } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ShieldBan, ShieldCheck, Edit, Trash2 } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";


interface AdminUserTableProps {
  users: User[];
}

export function AdminUserTable({ users }: AdminUserTableProps) {
  const { toast } = useToast();

  const handleBanUser = (userId: string, username: string) => {
    console.log(`Banning user ${userId}`);
    toast({ title: "User Action", description: `Simulated banning user: ${username}` });
  };

  const handleUnbanUser = (userId: string, username: string) => {
    console.log(`Unbanning user ${userId}`);
    toast({ title: "User Action", description: `Simulated unbanning user: ${username}` });
  };

  const handleDeleteUser = (userId: string, username: string) => {
    console.log(`Deleting user ${userId}`);
    toast({ title: "User Action", description: `Simulated deleting user: ${username}`, variant: "destructive" });
  };


  if (!users || users.length === 0) {
    return <p className="text-muted-foreground">No users found.</p>;
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profileImageUrl} alt={user.username} data-ai-hint={user.dataAiHint || "admin user"} />
                    <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{user.username}</div>
                </div>
              </TableCell>
              <TableCell>{user.email || "N/A"}</TableCell>
              <TableCell>{format(new Date(user.joinDate), "MMM d, yyyy")}</TableCell>
              <TableCell>
                {user.isBanned ? (
                  <Badge variant="destructive">Banned</Badge>
                ) : user.isAdmin ? (
                  <Badge className="bg-primary hover:bg-primary/90">Admin</Badge>
                ) : (
                  <Badge variant="secondary">Active</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">User Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit User</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.isBanned ? (
                       <DropdownMenuItem onClick={() => handleUnbanUser(user.id, user.username)}><ShieldCheck className="mr-2 h-4 w-4 text-green-500" />Unban User</DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => handleBanUser(user.id, user.username)}><ShieldBan className="mr-2 h-4 w-4 text-orange-500" />Ban User</DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleDeleteUser(user.id, user.username)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />Delete User
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
