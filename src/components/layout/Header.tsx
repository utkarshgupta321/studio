
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Gamepad2, Home, Menu, MessageSquare, Mail, Instagram, Youtube, Headphones } from "lucide-react"; // Added MessageSquare for Forum, Mail for Contact Us
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils"; // Import the cn function

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className={cn("justify-start text-neutral-200 hover:bg-neutral-700/50 hover:text-white px-3 py-2 rounded-md text-sm font-medium", className)}>
      {children}
    </Button>
  </Link>
);

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-neutral-400 hover:text-white transition-colors">
    <Icon className="h-5 w-5" />
  </a>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-700/50 bg-neutral-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-neutral-900/60 text-white">
      <div className="container flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo and Site Title */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-tight">GTA V</span>
              <span className="font-bold text-xs leading-tight text-neutral-300">Galaxy RolePlay</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 mx-auto">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/forums">Forum</NavLink>
          <NavLink href="/contact">Contact Us</NavLink> {/* Assuming /contact route */}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex-1 flex justify-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-200 hover:bg-neutral-700/50 hover:text-white"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-neutral-900 text-white border-neutral-700 w-[280px]">
              <Link href="/" className="flex items-center space-x-2 p-4 border-b border-neutral-700/50">
                <Gamepad2 className="h-7 w-7 text-primary" />
                 <div className="flex flex-col">
                    <span className="font-bold text-md leading-tight">GTA V</span>
                    <span className="font-bold text-sm leading-tight text-neutral-300">Galaxy RolePlay</span>
                  </div>
              </Link>
              <div className="flex flex-col space-y-2 p-4">
                <NavLink href="/" className="w-full !justify-start">
                  <Home className="mr-2 h-4 w-4" /> Home
                </NavLink>
                <NavLink href="/forums" className="w-full !justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" /> Forum
                </NavLink>
                <NavLink href="/contact" className="w-full !justify-start">
                  <Mail className="mr-2 h-4 w-4" /> Contact Us
                </NavLink>
                 <div className="pt-4 border-t border-neutral-700/50">
                    <p className="px-3 py-2 text-xs text-neutral-400">Social</p>
                    <div className="flex items-center justify-around px-3 py-2 gap-3">
                      <SocialLink href="#" icon={Instagram} label="Instagram" />
                      <SocialLink href="#" icon={Headphones} label="Discord" />
                      <SocialLink href="#" icon={Youtube} label="YouTube" />
                    </div>
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Right Aligned Icons */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-3">
            <SocialLink href="#" icon={Instagram} label="Instagram" />
            <SocialLink href="#" icon={Headphones} label="Discord" />
            <SocialLink href="#" icon={Youtube} label="YouTube" />
          </div>
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

