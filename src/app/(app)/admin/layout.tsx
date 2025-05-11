
import type { ReactNode } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Users, MessageSquareText, LayoutList, Server as ServerIcon, ScanSearch } from 'lucide-react'; // Added ScanSearch
import Link from 'next/link';

const MobileAdminNavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-accent/50 hover:text-accent-foreground">
      {children}
    </Button>
  </Link>
);


export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.32))]"> {/* Adjust min-height based on header/footer */}
      <AdminSidebar />
      <div className="md:hidden p-4 border-b">
         <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open admin menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-card w-[280px]">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold tracking-tight text-primary">Admin Panel</h2>
            </div>
            <nav className="flex flex-col space-y-1 p-4">
                <MobileAdminNavItem href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</MobileAdminNavItem>
                <MobileAdminNavItem href="/admin/servers"><ServerIcon className="mr-2 h-4 w-4" /> Server Management</MobileAdminNavItem>
                <MobileAdminNavItem href="/admin/categories"><LayoutList className="mr-2 h-4 w-4" /> Category Management</MobileAdminNavItem>
                <MobileAdminNavItem href="/admin/threads"><MessageSquareText className="mr-2 h-4 w-4" /> Thread Management</MobileAdminNavItem>
                <MobileAdminNavItem href="/admin/users"><Users className="mr-2 h-4 w-4" /> User Management</MobileAdminNavItem>
                <MobileAdminNavItem href="/admin/moderate-content"><ScanSearch className="mr-2 h-4 w-4" /> Moderate Content</MobileAdminNavItem> 
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
