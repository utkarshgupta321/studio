import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EditUserDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const editUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  isAdmin: z.boolean().default(false),
  isBanned: z.boolean().default(false),
  banEndDate: z.string().optional().nullable(), // Expects YYYY-MM-DD string from input type="date" or null
}).refine(data => {
  if (data.isBanned && !data.banEndDate) {
    return false; // If banned, banEndDate is required
  }
  if (!data.isBanned && data.banEndDate) {
      // Optionally clear banEndDate if not banned, or handle as per requirements
      // For now, this condition is fine as banEndDate can be present but ignored if not banned.
  }
  return true;
}, {
  message: "Ban end date is required if user is banned.",
  path: ["banEndDate"],
});

export function EditUserDialog({ user, isOpen, onClose, onSave }: EditUserDialogProps) {
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: '',
      email: '',
      isAdmin: false,
      isBanned: false,
      banEndDate: null,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email || '',
        isAdmin: user.isAdmin || false,
        isBanned: user.isBanned || false,
        banEndDate: user.banEndDate ? new Date(user.banEndDate).toISOString().split('T')[0] : null,
      });
    }
  }, [user, form, isOpen]); // Rerun when isOpen changes to ensure reset on dialog open

  const watchedIsBanned = form.watch("isBanned");

  function onSubmit(values: z.infer<typeof editUserSchema>) {
    const updatedUserData: User = {
      ...user, // Preserve ID and other non-editable fields like joinDate
      username: values.username,
      email: values.email || undefined,
      isAdmin: values.isAdmin,
      isBanned: values.isBanned,
      banEndDate: values.isBanned && values.banEndDate ? new Date(values.banEndDate).toISOString() : undefined,
    };
    onSave(updatedUserData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User: {user.username}</DialogTitle>
          <DialogDescription>
            Make changes to the user's profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Administrator</FormLabel>
                    <DialogDescription className="text-xs"> {/* Using DialogDescription for consistency, but could be FormDescription */}
                      Grant administrator privileges to this user.
                    </DialogDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isBanned"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Banned</FormLabel>
                     <DialogDescription className="text-xs">
                      Restrict this user's access to the forum.
                    </DialogDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {watchedIsBanned && (
              <FormField
                control={form.control}
                name="banEndDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ban End Date</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        value={field.value || ''} // Ensure input is controlled even if value is null
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
