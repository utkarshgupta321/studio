
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center space-x-2 text-foreground hover:text-primary">
          <Gamepad2 className="h-7 w-7 text-primary" />
          <div className="flex flex-col">
            <span className="font-semibold text-md leading-tight">GTA V</span>
            <span className="font-semibold text-sm leading-tight text-muted-foreground">Galaxy RolePlay</span>
          </div>
        </Link>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
