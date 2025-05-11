import { AdminUserTable } from "@/components/admin/AdminUserTable";
import { mockUsers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { UserPlus, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function AdminUsersPage() {
  // In a real app, fetch users from an API, possibly with pagination and filtering
  const users = mockUsers;

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
        <Input placeholder="Search users by name or email..." className="max-w-sm"/>
        {/* Add filters for status, role etc. if needed */}
      </div>
      <AdminUserTable users={users} />
    </div>
  );
}
