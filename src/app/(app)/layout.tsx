
import type { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";


export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    // Removed default bg-background and text-foreground from here
    // to allow pages like the new landing page to control their full-screen background
    // and to allow Header to control its own text/bg colors.
    // Individual page layouts or page.tsx can set their own backgrounds if needed.
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Container can be added here if most app pages need it, or within individual page layouts */}
        {/* For now, letting children manage their own top-level container for flexibility */}
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
