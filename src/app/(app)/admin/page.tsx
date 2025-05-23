
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers, mockThreads, mockCategories, mockServers } from "@/lib/mock-data";
import { Users, MessageSquareText, LayoutList, ShieldAlert, Server as ServerIcon, AlertCircle } from "lucide-react"; // Added AlertCircle
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const totalUsers = mockUsers.length;
  const totalThreads = mockThreads.length;
  const totalCategories = mockCategories.length;
  const totalServers = mockServers.length;
  const bannedUsers = mockUsers.filter(u => u.isBanned).length;
  const unresolvedThreads = mockThreads.filter(t => !t.isResolved).length; // Calculate unresolved threads

  const stats = [
    { title: "Total Users", value: totalUsers, icon: Users, href: "/admin/users", color: "text-primary" }, // Using primary color
    { title: "Total Servers", value: totalServers, icon: ServerIcon, href: "/admin/servers", color: "text-primary" },
    { title: "Total Categories", value: totalCategories, icon: LayoutList, href: "/admin/categories", color: "text-primary" },
    { title: "Total Threads", value: totalThreads, icon: MessageSquareText, href: "/admin/threads", color: "text-green-500" },
    { title: "Banned Users", value: bannedUsers, icon: ShieldAlert, href: "/admin/users?filter=banned", color: "text-red-500" },
    { title: "Unresolved Threads", value: unresolvedThreads, icon: AlertCircle, href: "/admin/threads?filter=unresolved", color: "text-orange-500" }, // New stat card
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> {/* Adjusted grid for 6 items */}
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Link href={stat.href} passHref>
                  <Button variant="link" className="px-0 text-xs text-muted-foreground">View Details &rarr;</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of recent forum activities.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent activity feed */}
            <p className="text-muted-foreground">Recent user registrations, new threads, and important flags would appear here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/users" passHref><Button className="w-full justify-start" variant="outline">Manage Users</Button></Link>
            <Link href="/admin/servers" passHref><Button className="w-full justify-start" variant="outline">Manage Servers</Button></Link>
            <Link href="/admin/categories" passHref><Button className="w-full justify-start" variant="outline">Manage Categories</Button></Link>
            <Link href="/admin/threads" passHref><Button className="w-full justify-start" variant="outline">Manage Threads</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
