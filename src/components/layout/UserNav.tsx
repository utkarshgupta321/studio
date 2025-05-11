"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User, UserPlus, LayoutDashboard } from "lucide-react";
import type { User as UserType } from "@/lib/types";
import { mockUsers } from "@/lib/mock-data"; // Placeholder for actual auth
import { useEffect, useState } from "react";

// Simulate auth state
const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = () => {
      // For demo, randomly pick a user or no user
      // In a real app, this would check a token or session
      const authenticated = Math.random() > 0.5;
      if (authenticated) {
        setUser(mockUsers[0]); // Assume Michael is logged in
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);
  
  const login = (loggedInUser: UserType) => setUser(loggedInUser);
  const logout = () => setUser(null);

  return { user, login, logout, loading };
};


export function UserNav() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
        <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/login" passHref>
          <Button variant="outline" size="sm">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button size="sm">
            <UserPlus className="mr-2 h-4 w-4" />
            Register
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImageUrl} alt={user.username} data-ai-hint={user.dataAiHint || "profile picture"} />
            <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || "No email provided"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile" passHref>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          {user.isAdmin && (
            <Link href="/admin" passHref>
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
