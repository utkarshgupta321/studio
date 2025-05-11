
"use client";

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { ForumCategory, EditCategoryFormData } from '@/lib/types';
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
import { availableIcons, defaultCategoryIconName } from '@/lib/icon-map';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';


const editCategorySchema = z.object({
  id: z.string(), // Keep id for submission
  name: z.string().min(3, "Category name must be at least 3 characters.").max(50, "Category name cannot exceed 50 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description cannot exceed 200 characters."),
  iconName: z.string().optional(),
});

interface EditCategoryDialogProps {
  category: ForumCategory;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditCategoryFormData) => void;
}

export function EditCategoryDialog({ category, isOpen, onClose, onSave }: EditCategoryDialogProps) {
  const form = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      description: category.description,
      iconName: category.iconName || defaultCategoryIconName,
    },
  });

  useEffect(() => {
    if (category && isOpen) {
      form.reset({
        id: category.id,
        name: category.name,
        description: category.description,
        iconName: category.iconName || defaultCategoryIconName,
      });
    }
  }, [category, form, isOpen]);

  function onSubmit(values: EditCategoryFormData) {
    onSave(values);
  }

  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Category: {category.name}</DialogTitle>
          <DialogDescription>
            Make changes to the category details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
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
            <FormField
              control={form.control}
              name="iconName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       <ScrollArea className="h-48">
                        {Object.keys(availableIcons).map((iconKey) => {
                           const IconComponent = availableIcons[iconKey];
                          return (
                            <SelectItem key={iconKey} value={iconKey}>
                               <div className="flex items-center">
                                <IconComponent className="mr-2 h-4 w-4" />
                                {iconKey}
                              </div>
                            </SelectItem>
                          );
                        })}
                       </ScrollArea>
                    </SelectContent>
                  </Select>
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
