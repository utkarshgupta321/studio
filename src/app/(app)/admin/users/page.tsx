"use client";

import { useState, useEffect } from 'react';
import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { mockUsers } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import { Input } from "@/components/ui/input";
// Button, UserPlus, Download are commented out as they are not directly used for search functionality
// but can be uncommented if "Add User" or "Export Users" features are implemented.
// import { Button } from "@/components/ui/button";
// import { UserPlus, Download } from "lucide-react";

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (!lowerCaseQuery) {
      setFilteredUsers(mockUsers); // If query is empty, show all users
      return;
    }
    const results = mockUsers.filter(user =>
      user.username.toLowerCase().includes(lowerCaseQuery) ||
      (user.email && user.email.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredUsers(results);
  }, [searchQuery]); // Re-run effect when searchQuery changes

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
      <AdminUserTable users={filteredUsers} />
    </div>
  );
}
