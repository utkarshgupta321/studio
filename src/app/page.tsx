
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white">
      {/* Background Image */}
      <Image
        src="https://picsum.photos/1920/1080?blur=2"
        alt="GTA V Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        data-ai-hint="gta city skyline"
      />
      <div className="absolute inset-0 bg-black/50 z-10" /> {/* Overlay */}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 p-4 text-center">
        <div className="bg-black/70 backdrop-blur-md p-8 sm:p-12 rounded-lg shadow-xl max-w-lg sm:max-w-xl md:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Welcome to GTA V Galaxy RolePlay
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" passHref>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 text-lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 text-lg"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Optional: Small text at the bottom if needed, styled to be subtle */}
      <p className="relative z-20 pb-4 text-xs text-neutral-400">
        GTA V Galaxy RolePlay - Your ultimate GTA V Roleplay destination.
      </p>
    </div>
  );
}
