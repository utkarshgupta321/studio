"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(150, { message: "Title cannot exceed 150 characters." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters." }).max(10000, { message: "Content cannot exceed 10000 characters." }),
});

interface CreateThreadFormProps {
  categoryId: string;
  onThreadCreated?: () => void; // Optional callback
}

export function CreateThreadForm({ categoryId, onThreadCreated }: CreateThreadFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    console.log("New thread for category", categoryId, "submitted:", values);
    toast({
      title: "Thread Submitted",
      description: "Your new thread has been (simulated) created.",
    });
    form.reset(); // Reset form after submission
    onThreadCreated?.(); // Call callback if provided
  }

  return (
    <Card className="mt-2 border-primary/50">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="threadTitle">Thread Title</FormLabel>
                  <FormControl>
                    <Input id="threadTitle" placeholder="Enter a descriptive title for your thread" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="threadContent">Thread Content</FormLabel>
                  <FormControl>
                    <Textarea
                      id="threadContent"
                      placeholder="Write the main content of your thread here..."
                      className="min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Thread
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
