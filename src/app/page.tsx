
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogIn, UserPlus, Compass } from "lucide-react"; // Added Compass for Explore Forum

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
      <div className="absolute inset-0 bg-black/60 z-10" /> {/* Slightly increased overlay for better text readability */}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 p-4 text-center">
        <div className="bg-black/75 backdrop-blur-md p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg sm:max-w-xl md:max-w-2xl"> {/* Increased rounding and shadow */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8"> {/* Increased margin bottom */}
            Welcome to GTA V Galaxy RolePlay
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <Link href="/register" passHref className="w-full">
              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 text-lg"
              >
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </Button>
            </Link>
            <Link href="/login" passHref className="w-full">
              <Button
                variant="secondary" 
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold py-3 px-6 text-lg" // Adjusted to secondary for better contrast
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login
              </Button>
            </Link>
            <Link href="/forums" passHref className="w-full sm:col-span-2"> {/* Explore Forum button spanning full width on small screens */}
              <Button
                size="lg"
                variant="outline" // Using outline for a different visual hierarchy
                className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary font-semibold py-3 px-6 text-lg mt-4"
              >
                <Compass className="mr-2 h-5 w-5" />
                Explore Forum
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <p className="relative z-20 pb-4 text-xs text-neutral-400">
        GTA V Galaxy RolePlay - Your ultimate GTA V Roleplay destination.
      </p>
    </div>
  );
}
