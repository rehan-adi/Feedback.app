"use client";

import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { signIn } from 'next-auth/react'
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidation } from "@/validation/auth.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Signin = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signinValidation>>({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinValidation>) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/signin", data);

      if (response.status === 200) {
        toast.success("Signin Successful", {
          description: response.data.message,
          duration: 2000,
        });
        form.reset();
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error("Signin Failed", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white bg-black">
      <div className="p-8 max-w-md w-full mx-auto lg:border border-white border-opacity-10 rounded-lg shadow-md">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-5">Sign In</h1>
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Welcome back! Please sign in to continue.
          </p>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="bg-black border-white text-white"
                      type="email"
                      aria-required="true"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      className="bg-black border-white text-white"
                      type="password"
                      aria-required="true"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
          <div className="mt-6 flex flex-col space-y-4">
            <Button
              onClick={() => handleOAuthSignIn('google')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Sign in with Google
            </Button>
            <Button
              onClick={() => handleOAuthSignIn('github')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            >
              Sign in with GitHub
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
