"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Phone, Mail, Instagram, Youtube, MessageSquare as DiscordIcon } from 'lucide-react'; 
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
      <div className="container mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: About & Contact */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">About us</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Welcome to the ultimate GTA experience! Join us and let the chaos begin!
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Contact us</h3>
              <ul className="mt-1 space-y-0.5 text-xs">
                <li className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-3.5 w-3.5 text-primary flex-shrink-0" />
                  +91 750*****07
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <a href="mailto:support@gtavgalaxy.com" className="hover:text-primary transition-colors">
                    support@gtavgalaxy.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-0.5 md:justify-self-start">
            <h3 className="text-sm font-semibold text-foreground mb-1.5">Links</h3>
            <ul className="space-y-0.5 text-xs">
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
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-foreground">Subscribe us</h3>
            <form onSubmit={handleSubscribe} className="space-y-1.5">
              <Input
                type="email"
                placeholder="Enter email address"
                className="bg-background border-border placeholder:text-muted-foreground focus:ring-primary h-8 text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground text-xs h-8">
                Send
              </Button>
            </form>
            <div className="flex space-x-1.5 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-1 bg-muted/30 dark:bg-muted/50 hover:bg-muted rounded-md transition-colors group"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-border/40 pt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Copyright &copy; {currentYear || new Date().getFullYear()} <Link href="/" className="text-primary hover:underline">GTA V Galaxy RolePlay</Link> All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
