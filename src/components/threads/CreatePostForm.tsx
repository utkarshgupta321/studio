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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(10, { message: "Your reply must be at least 10 characters long." }).max(5000, { message: "Your reply cannot exceed 5000 characters." }),
});

interface CreatePostFormProps {
  threadId: string;
  onPostCreated?: () => void; // Optional callback
}

export function CreatePostForm({ threadId, onPostCreated }: CreatePostFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call
    console.log("New post for thread", threadId, "submitted:", values);
    toast({
      title: "Reply Submitted",
      description: "Your reply has been (simulated) posted.",
    });
    form.reset();
    onPostCreated?.();
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
