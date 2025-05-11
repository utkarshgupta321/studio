import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockUsers, mockThreads, mockCategories } from "@/lib/mock-data";
import { Users, MessageSquareText, BarChart3, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const totalUsers = mockUsers.length;
  const totalThreads = mockThreads.length;
  const totalCategories = mockCategories.length;
  const bannedUsers = mockUsers.filter(u => u.isBanned).length;

  const stats = [
    { title: "Total Users", value: totalUsers, icon: Users, href: "/admin/users", color: "text-blue-500" },
    { title: "Total Threads", value: totalThreads, icon: MessageSquareText, href: "/admin/threads", color: "text-green-500" },
    { title: "Total Categories", value: totalCategories, icon: BarChart3, href: "/forums", color: "text-purple-500" },
    { title: "Banned Users", value: bannedUsers, icon: ShieldAlert, href: "/admin/users?filter=banned", color: "text-red-500" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <Link href="/admin/threads" passHref><Button className="w-full justify-start" variant="outline">Manage Threads</Button></Link>
            <Button className="w-full justify-start" variant="outline" disabled>Moderate Content (Coming Soon)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
