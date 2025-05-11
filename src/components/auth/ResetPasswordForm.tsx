
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation"; // To redirect after success

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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { KeyRound, CheckCircle } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], 
});

// interface ResetPasswordFormProps {
//   token: string; // In a real app, you'd validate this token
// }

export function ResetPasswordForm(/* { token }: ResetPasswordFormProps */) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate API call to reset password with the token
    console.log("Reset password submitted:", values /*, "with token:", token */);
    toast({
      title: "Password Reset Successful",
      description: "Your password has been changed. You can now log in with your new password.",
      action: (
        <Link href="/login">
          <Button variant="outline" size="sm">
            Login
          </Button>
        </Link>
      ),
      duration: 7000,
    });
    // In a real app, redirect to login page after a short delay or on action click
    // For demo, redirecting after the toast is shown
    setTimeout(() => router.push("/login"), 2000); 
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <KeyRound className="h-6 w-6 text-primary" /> Reset Your Password
        </CardTitle>
        <CardDescription>Enter your new password below. Make sure it&apos;s strong and memorable.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" /> Set New Password
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Optional: Footer with a link back to login if they arrived here by mistake */}
      {/* <CardFooter className="flex justify-center">
        <Link href="/login" passHref>
          <Button variant="link" className="text-muted-foreground">
            Back to Login
          </Button>
        </Link>
      </CardFooter> */}
    </Card>
  );
}
