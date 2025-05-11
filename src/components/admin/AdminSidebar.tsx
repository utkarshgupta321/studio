
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, MessageSquareText, ShieldBan, Settings, LayoutList, Server as ServerIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/servers", label: "Server Management", icon: ServerIcon },
  { href: "/admin/categories", label: "Category Management", icon: LayoutList },
  { href: "/admin/threads", label: "Thread Management", icon: MessageSquareText },
  { href: "/admin/users", label: "User Management", icon: Users },
  // { href: "/admin/bans", label: "Ban Management", icon: ShieldBan },
  // { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-card p-4 space-y-4 hidden md:block">
      <div>
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-primary">
          Admin Panel
        </h2>
        <Separator className="my-2" />
      </div>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "font-semibold text-primary"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
