
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Phone, Mail, Instagram, Youtube, MessageSquare as DiscordIcon } from 'lucide-react'; // Using MessageSquare as Discord icon if Discord specific one is not in the current lucide version.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const linkItems = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '#' }, // Placeholder
  { name: 'Download Launcher', href: '#' }, // Placeholder
  { name: 'Register', href: '/register' },
  { name: 'Login', href: '/login' },
  { name: 'Forum', href: '/forums' },
];

const socialLinks = [
  { name: 'Discord', href: '#', icon: DiscordIcon },
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
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: About & Contact */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="h-10 w-10 text-primary" />
               {/* Replace Gamepad2 with actual SVG logo if available */}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">About us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Welcome to the ultimate GTA experience! Join us and let the chaos begin!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Contact us</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  +91 750*****07
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
                  <a href="mailto:support@gtavgalaxy.com" className="hover:text-primary transition-colors">
                    support@gtavgalaxy.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-1 md:justify-self-center">
            <h3 className="text-lg font-semibold text-foreground mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              {linkItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Subscribe us */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-foreground">Subscribe us</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter email address"
                className="bg-background border-border placeholder:text-muted-foreground focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground">
                Send
              </Button>
            </form>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2 bg-muted/30 dark:bg-muted/50 hover:bg-muted rounded-md transition-colors"
                  >
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright &copy; {currentYear || new Date().getFullYear()} <Link href="/" className="text-primary hover:underline">GTA V Galaxy RolePlay</Link> All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
