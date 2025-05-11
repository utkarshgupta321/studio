import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Gamepad2, Home, Menu, Search as SearchIcon, ShieldCheck, Users } from "lucide-react";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./ThemeToggle"; // Import ThemeToggle

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="justify-start text-foreground hover:bg-accent/50 hover:text-accent-foreground">
      {children}
    </Button>
  </Link>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              GTA V Galaxy RolePlay
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <NavLink href="/forums">
              <Home className="mr-2 h-4 w-4" /> Forums
            </NavLink>
            <NavLink href="/search">
              <SearchIcon className="mr-2 h-4 w-4" /> Search
            </NavLink>
            {/* Placeholder for admin link, logic in UserNav */}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-background w-[280px]">
            <Link href="/" className="flex items-center space-x-2 p-4 border-b">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="font-bold">GTA V Galaxy RolePlay</span>
            </Link>
            <div className="space-y-2 p-4">
              <NavLink href="/forums">
                <Home className="mr-2 h-4 w-4" /> Forums
              </NavLink>
              <NavLink href="/search">
                <SearchIcon className="mr-2 h-4 w-4" /> Search
              </NavLink>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search bar - could be simplified or expanded */}
          {/* <div className="w-full flex-1 md:w-auto md:flex-none">
            <Input
              type="search"
              placeholder="Search forums..."
              className="hidden md:inline-flex h-9"
            />
          </div> */}
          <ThemeToggle /> {/* Add ThemeToggle here */}
          <UserNav />
        </div>
      </div>
    </header>
  );
}
