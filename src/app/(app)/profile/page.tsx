"use client"; // For potential client-side interactions or fetching current user

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/lib/mock-data";
import type { User } from "@/lib/types";
import { Mail, CalendarDays, Edit3, ShieldCheck, ShieldAlert } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

// Simulate fetching current user data
const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser(mockUsers[0]); // Assume Michael is logged in for demo
      setLoading(false);
    }, 500);
  }, []);

  return { user, loading };
};

export default function ProfilePage() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-28" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-xl text-muted-foreground">Please log in to view your profile.</p>
        {/* Optionally, add a login button here */}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-card-foreground/5 rounded-t-lg">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary/50">
            <AvatarImage src={user.profileImageUrl} alt={user.username} data-ai-hint={user.dataAiHint || "profile photo"} />
            <AvatarFallback className="text-4xl">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-3xl">{user.username}</CardTitle>
            <CardDescription className="text-lg mt-1">
              {user.isAdmin ? "Administrator" : "Community Member"}
            </CardDescription>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.isAdmin && <Badge className="bg-primary hover:bg-primary/90"><ShieldCheck className="mr-1 h-4 w-4" />Admin</Badge>}
              {user.isBanned && <Badge variant="destructive"><ShieldAlert className="mr-1 h-4 w-4" />Banned</Badge>}
            </div>
          </div>
          <Button variant="outline">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center text-muted-foreground">
            <Mail className="mr-3 h-5 w-5 text-primary" />
            <span>{user.email || "Email not provided"}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-3 h-5 w-5 text-primary" />
            <span>Joined on {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {user.isBanned && user.banEndDate && (
            <div className="flex items-center text-destructive">
              <ShieldAlert className="mr-3 h-5 w-5" />
              <span>Banned until: {new Date(user.banEndDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          )}
          
          {/* Placeholder for user activity, posts, etc. */}
          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-2">Activity</h3>
            <p className="text-muted-foreground">User activity details (recent posts, threads created) would appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
