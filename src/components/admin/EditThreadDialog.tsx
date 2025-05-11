
"use client";

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Thread } from '@/lib/types';
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
import { Textarea } from '@/components/ui/textarea'; // Added for potential content editing

const editThreadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(150, "Title cannot exceed 150 characters."),
  // For simplicity, content editing is not part of this schema initially.
  // If original post content editing is needed, add it here:
  // content: z.string().min(20, "Content must be at least 20 characters.").max(10000, "Content cannot exceed 10000 characters.")
});

export type EditThreadFormData = z.infer<typeof editThreadSchema>;

interface EditThreadDialogProps {
  thread: Thread;
  isOpen: boolean;
  onClose: () => void;
  onSave: (threadId: string, data: EditThreadFormData) => void;
}

export function EditThreadDialog({ thread, isOpen, onClose, onSave }: EditThreadDialogProps) {
  const form = useForm<EditThreadFormData>({
    resolver: zodResolver(editThreadSchema),
    defaultValues: {
      title: '',
      // content: '', // if content editing is added
    },
  });

  useEffect(() => {
    if (thread && isOpen) {
      form.reset({
        title: thread.title,
        // content: thread.posts[0]?.content || '', // if content editing is added
      });
    }
  }, [thread, form, isOpen]);

  function onSubmit(values: EditThreadFormData) {
    onSave(thread.id, values);
  }

  if (!thread) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Thread</DialogTitle>
          <DialogDescription>
            Make changes to the thread details. Current title: &quot;{thread.title}&quot;
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the new thread title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 
            // Uncomment if original post content editing is desired
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Original Post Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Edit the content of the original post" className="min-h-[150px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            */}
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

