"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyEmailValidation } from "@/validation/auth.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const VerifyEmail = () => {
  const form = useForm<z.infer<typeof verifyEmailValidation>>({
    resolver: zodResolver(verifyEmailValidation),
    defaultValues: {
      verifyCode: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof verifyEmailValidation>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-email", data);

      if (response.status === 200) {
        toast.success("Verification Successful", {
          description: response.data.message,
          duration: 2000,
        });

        form.reset();

        router.push("/signin");
      }
    } catch (error: any) {
      console.error("Error verifying email:", error);
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";

      toast.error("Verification Failed", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center dark:text-white text-black dark:bg-black bg-white">
      <div className="p-8 max-w-md w-full mx-auto lg:border border-white border-opacity-10 rounded-lg shadow-md">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-5">Verify Your Account</h1>
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Enter the verification code sent to your email
          </p>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="verifyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the verification code"
                      className="dark:bg-black bg-white dark:border-white dark:border-opacity-15 dark:text-white border-black text-black"
                      aria-required="true"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
