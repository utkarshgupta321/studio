"use client";

import { useState, useEffect, useCallback } from 'react';
import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { mockUsers } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
// Button, UserPlus, Download are commented out as they are not directly used for search functionality
// but can be uncommented if "Add User" or "Export Users" features are implemented.
// import { Button } from "@/components/ui/button";
// import { UserPlus, Download } from "lucide-react";

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize filteredUsers with a copy of mockUsers to allow modification
  const [filteredUsers, setFilteredUsers] = useState<User[]>([...mockUsers]);
  
  // Function to filter users based on query - memoized with useCallback
  const filterUsers = useCallback((query: string) => {
    const lowerCaseQuery = query.toLowerCase().trim();
    if (!lowerCaseQuery) {
      setFilteredUsers([...mockUsers]); // Show all users if query is empty
      return;
    }
    const results = mockUsers.filter(user =>
      user.username.toLowerCase().includes(lowerCaseQuery) ||
      (user.email && user.email.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredUsers(results);
  }, []); // mockUsers is a dependency; if it could change from outside, it should be in deps array

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, filterUsers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleUserUpdate = (updatedUser: User) => {
    const userIndex = mockUsers.findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedUser; // Mutate the imported mockUsers array
    }
    filterUsers(searchQuery); // Re-filter the users list
  };

  const handleDeleteUser = (userId: string, username: string) => {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers.splice(userIndex, 1); // Remove from mockUsers
    }
    filterUsers(searchQuery); // Re-filter
    toast({ title: "User Action", description: `Simulated deleting user: ${username}`, variant: "destructive" });
  };

  const handleBanUser = (userId: string, username: string) => {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], isBanned: true, banEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() }; // Ban for 30 days
    }
    filterUsers(searchQuery);
    toast({ title: "User Action", description: `Simulated banning user: ${username}` });
  };

  const handleUnbanUser = (userId: string, username: string) => {
     const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex] = { ...mockUsers[userIndex], isBanned: false, banEndDate: undefined };
    }
    filterUsers(searchQuery);
    toast({ title: "User Action", description: `Simulated unbanning user: ${username}` });
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <div className="flex gap-2">
            {/* <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export Users</Button> */}
            {/* <Button><UserPlus className="mr-2 h-4 w-4" /> Add User</Button> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search users by name or email..."
          className="max-w-sm"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Add filters for status, role etc. if needed */}
      </div>
      <AdminUserTable 
        users={filteredUsers} 
        onUpdateUser={handleUserUpdate}
        onDeleteUser={handleDeleteUser}
        onBanUser={handleBanUser}
        onUnbanUser={handleUnbanUser}
      />
    </div>
  );
}
