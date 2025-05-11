
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
      <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8"> {/* Reduced py-12 to py-6 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> {/* Reduced gap-8 to gap-6 */}
          {/* Column 1: About & Contact */}
          <div className="space-y-4"> {/* Reduced space-y-8 to space-y-4 */}
            <div className="flex items-center space-x-2"> {/* Reduced space-x-3 to space-x-2 */}
              <Gamepad2 className="h-8 w-8 text-primary" /> {/* Reduced icon size from h-10 w-10 */}
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">About us</h3> {/* Reduced text-lg to text-base */}
              <p className="mt-1 text-xs text-muted-foreground"> {/* Reduced mt-2 to mt-1 and text-sm to text-xs */}
                Welcome to the ultimate GTA experience! Join us and let the chaos begin!
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Contact us</h3> {/* Reduced text-lg to text-base */}
              <ul className="mt-1 space-y-1 text-xs"> {/* Reduced mt-2 to mt-1 and text-sm to text-xs */}
                <li className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-3 w-3 text-primary flex-shrink-0" /> {/* Reduced icon size */}
                  +91 750*****07
                </li>
                <li className="flex items-center text-muted-foreground">
                  <Mail className="mr-2 h-3 w-3 text-primary flex-shrink-0" /> {/* Reduced icon size */}
                  <a href="mailto:support@gtavgalaxy.com" className="hover:text-primary transition-colors">
                    support@gtavgalaxy.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-1 md:justify-self-center">
            <h3 className="text-base font-semibold text-foreground mb-2">Links</h3> {/* Reduced text-lg to text-base and mb-3 to mb-2 */}
            <ul className="space-y-1 text-xs"> {/* Reduced space-y-2 to space-y-1 and text-sm to text-xs */}
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
          <div className="space-y-2 md:col-span-2 lg:col-span-1"> {/* Reduced space-y-4 to space-y-2 */}
            <h3 className="text-base font-semibold text-foreground">Subscribe us</h3> {/* Reduced text-lg to text-base */}
            <form onSubmit={handleSubscribe} className="space-y-2"> {/* Reduced space-y-3 to space-y-2 */}
              <Input
                type="email"
                placeholder="Enter email address"
                className="bg-background border-border placeholder:text-muted-foreground focus:ring-primary h-9 text-xs" // Reduced height and text size
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground text-xs"> {/* Reduced button size and text size */}
                Send
              </Button>
            </form>
            <div className="flex space-x-2 pt-1"> {/* Reduced space-x-3 to space-x-2 and pt-2 to pt-1 */}
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-1.5 bg-muted/30 dark:bg-muted/50 hover:bg-muted rounded-md transition-colors" // Reduced padding
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" /> {/* Reduced icon size */}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-border/40 pt-4 text-center"> {/* Reduced mt-12 to mt-6 and pt-8 to pt-4 */}
          <p className="text-xs text-muted-foreground"> {/* Reduced text-sm to text-xs */}
            Copyright &copy; {currentYear || new Date().getFullYear()} <Link href="/" className="text-primary hover:underline">GTA V Galaxy RolePlay</Link> All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
