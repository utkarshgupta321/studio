import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Gamepad2, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="inline-block p-4 bg-primary rounded-lg mb-4">
            <Gamepad2 className="h-16 w-16 text-primary-foreground" />
          </div>
          <CardTitle className="text-4xl font-bold">Welcome to GTA V Galaxy RolePlay</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Your go-to place for all things GTA V Roleplay. Discuss strategies, find communities, and get support.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center p-6">
          <Link href="/forums" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Explore Forums
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          </Link>
          <Link href="/register" passHref>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <UserPlus className="mr-2 h-5 w-5" />
              Register
            </Button>
          </Link>
        </CardContent>
      </Card>
      <p className="mt-8 text-sm text-muted-foreground">
        GTA V Galaxy RolePlay - Your ultimate GTA V Roleplay destination.
      </p>
    </div>
  );
}

