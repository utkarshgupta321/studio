
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Mail, Instagram, Youtube, Headphones } from 'lucide-react'; // Changed MessageSquare to Headphones
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const socialLinks = [
  { name: 'Discord', href: '#', icon: Headphones }, // Changed icon to Headphones
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with:', email);
      toast({
        title: 'Subscribed!',
        description: `Thank you for subscribing with ${email}.`,
      });
      setEmail('');
    } else {
      toast({
        title: 'Subscription Failed',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
    }
  };

  return (
    <footer className="bg-card text-card-foreground border-t border-border/40">
      <div className="container mx-auto max-w-6xl px-4 py-2 sm:px-6 lg:px-8"> {/* Reduced py */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 items-center"> {/* Reduced gap, items-center */}
          {/* Column 1: About & Contact */}
          <div className="space-y-1"> {/* Reduced space-y */}
            <div className="flex items-center space-x-1.5"> {/* Reduced space-x */}
              <Gamepad2 className="h-5 w-5 text-primary" /> {/* Reduced icon size */}
              <span className="font-semibold text-xs">GTA V Galaxy RolePlay</span> {/* Reduced font size */}
            </div>
            <p className="text-[10px] text-muted-foreground"> {/* Reduced font size */}
              Join the chaos!
            </p>
            <div className="flex items-center text-[10px] text-muted-foreground"> {/* Reduced font size */}
              <Mail className="mr-1.5 h-3 w-3 text-primary flex-shrink-0" /> {/* Reduced icon and margin */}
              <a href="mailto:support@gtavgalaxy.com" className="hover:text-primary transition-colors">
                support@gtavgalaxy.com
              </a>
            </div>
          </div>

          {/* Column 2: Social Links */}
          <div className="flex justify-center items-center space-x-2"> {/* Centered icons, slightly increased space */}
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-1.5 bg-muted/30 dark:bg-muted/50 hover:bg-muted rounded-md transition-colors group" // Slightly increased padding, rounded-md
                >
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" /> {/* Increased icon size */}
                </a>
              );
            })}
          </div>

          {/* Column 3: Subscribe us */}
          <div className="space-y-1 md:justify-self-end"> {/* Reduced space-y */}
             <form onSubmit={handleSubscribe} className="flex items-center space-x-1"> {/* Reduced space-x, flex for inline */}
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background border-border placeholder:text-muted-foreground focus:ring-primary h-7 text-[10px] flex-grow" // Reduced height and font size
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground text-[10px] h-7 px-2"> {/* Reduced height, font size, padding */}
                Send
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-2 border-t border-border/40 pt-1.5 text-center"> {/* Reduced mt and pt */}
          <p className="text-[10px] text-muted-foreground"> {/* Reduced font size */}
            &copy; {currentYear || new Date().getFullYear()} <Link href="/" className="text-primary hover:underline">GTA V Galaxy RolePlay</Link>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
