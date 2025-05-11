
"use client";

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Server, EditServerFormData } from '@/lib/types';
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
import { Textarea } from '@/components/ui/textarea';

const editServerSchema = z.object({
  id: z.string(), // Keep the ID for updating
  name: z.string().min(3, "Server name must be at least 3 characters.").max(50, "Server name cannot exceed 50 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description cannot exceed 200 characters."),
});

interface EditServerDialogProps {
  server: Server;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditServerFormData) => void;
}

export function EditServerDialog({ server, isOpen, onClose, onSave }: EditServerDialogProps) {
  const form = useForm<EditServerFormData>({
    resolver: zodResolver(editServerSchema),
    defaultValues: {
      id: server.id,
      name: server.name,
      description: server.description,
    },
  });

  useEffect(() => {
    if (server && isOpen) {
      form.reset({
        id: server.id,
        name: server.name,
        description: server.description,
      });
    }
  }, [server, form, isOpen]);

  function onSubmit(values: EditServerFormData) {
    onSave(values);
  }

  if (!server) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Server: {server.name}</DialogTitle>
          <DialogDescription>
            Make changes to the server details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
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
