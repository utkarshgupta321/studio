import type { ReactNode } from 'react';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-primary">
          <Gamepad2 className="h-8 w-8" />
          <span className="font-semibold text-lg">GTA5Grand Lite</span>
        </Link>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
