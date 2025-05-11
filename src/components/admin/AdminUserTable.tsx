"use client";

import type { User } from "@/lib/types";
import { useState } from "react";
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
import { EditUserDialog } from "./EditUserDialog"; // Import the new dialog

interface AdminUserTableProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void; // Callback to notify parent of an update
  onDeleteUser: (userId: string, username: string) => void; // Callback for delete
  onBanUser: (userId: string, username: string) => void; // Callback for ban
  onUnbanUser: (userId: string, username: string) => void; // Callback for unban
}

export function AdminUserTable({ users, onUpdateUser, onDeleteUser, onBanUser, onUnbanUser }: AdminUserTableProps) {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    onUpdateUser(updatedUser); // Call parent's update handler
    setIsEditDialogOpen(false);
    setEditingUser(null);
    toast({ title: "User Updated", description: `User ${updatedUser.username} has been updated.` });
  };

  const handleDeleteClick = (userId: string, username: string) => {
    onDeleteUser(userId, username);
     // Parent will handle mockUsers update and re-render
  };

  const handleBanClick = (userId: string, username: string) => {
    onBanUser(userId, username);
    // Parent will handle mockUsers update and re-render
  };
  
  const handleUnbanClick = (userId: string, username: string) => {
    onUnbanUser(userId, username);
    // Parent will handle mockUsers update and re-render
  };


  if (!users || users.length === 0) {
    return <p className="text-muted-foreground">No users found.</p>;
  }

  return (
    <>
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
                      <DropdownMenuItem onClick={() => handleEditClick(user)}><Edit className="mr-2 h-4 w-4" />Edit User</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.isBanned ? (
                         <DropdownMenuItem onClick={() => handleUnbanClick(user.id, user.username)}><ShieldCheck className="mr-2 h-4 w-4 text-green-500" />Unban User</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleBanClick(user.id, user.username)}><ShieldBan className="mr-2 h-4 w-4 text-orange-500" />Ban User</DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDeleteClick(user.id, user.username)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
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
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingUser(null);
          }}
          onSave={handleSaveUser}
        />
      )}
    </>
  );
}
