
"use client";

import React, { useEffect } from 'react'; // Added useEffect
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { mockUsers, mockThreads, mockPosts } from "@/lib/mock-data";
import type { Thread, Post } from "@/lib/types";

const formSchema = z.object({
  content: z.string().min(10, { message: "Your reply must be at least 10 characters long." }).max(5000, { message: "Your reply cannot exceed 5000 characters." }),
});

interface CreatePostFormProps {
  threadId: string;
  onPostCreated?: () => void;
  initialContent?: string | null;
}

export function CreatePostForm({ threadId, onPostCreated, initialContent }: CreatePostFormProps) {
  const { toast } = useToast();
  const currentUser = mockUsers[0]; 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: initialContent || "",
    },
  });

  useEffect(() => {
    if (initialContent && initialContent !== form.getValues('content')) {
      form.setValue('content', initialContent);
    } 
    else if (initialContent === null && form.getValues('content')) {
       form.setValue('content', '');
    }
    else if (initialContent === '' && form.getValues('content')) {
      form.setValue('content', '');
    }
  }, [initialContent, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentUser) {
        toast({
            title: "Authentication Error",
            description: "You must be logged in to post a reply.",
            variant: "destructive",
        });
        return;
    }

    const newPost: Post = {
        id: `post-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        author: currentUser,
        content: values.content,
        createdAt: new Date().toISOString(),
        likeCount: 0, // Initialize likeCount for new posts
    };

    const threadIndex = mockThreads.findIndex(t => t.id === threadId);
    if (threadIndex !== -1) {
        mockThreads[threadIndex].posts.push(newPost);
        mockThreads[threadIndex].replyCount = mockThreads[threadIndex].posts.length -1;
        mockThreads[threadIndex].lastReplyAt = newPost.createdAt;
        mockThreads[threadIndex].lastReplyBy = currentUser;
        
        // Also add to the global mockPosts array for consistency if it's used elsewhere
        mockPosts.push(newPost);
    }
    
    console.log("New post for thread", threadId, "submitted:", values);
    toast({
      title: "Reply Submitted",
      description: "Your reply has been posted.",
    });
    
    onPostCreated?.(); // Call parent callback (e.g., to clear quote)
    form.reset({ content: "" }); // Reset form to empty after submission
  }
  
  if (!currentUser) {
    return null; 
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2"><Send className="h-5 w-5 text-primary"/> Post a Reply</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="replyContent">Your Reply</FormLabel>
                  <FormControl>
                    <Textarea
                      id="replyContent"
                      placeholder="Write your reply here..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" /> Submit Reply
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
