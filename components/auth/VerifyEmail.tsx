"use client";

import { z } from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof verifyEmailValidation>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-email", data);

      if (response.status === 200) {
        toast({
          title: "Verification Successful",
          description:
            "Your email has been verified successfully. You can now sign in.",
        });

        form.reset();

        router.push("/signin");
      }
    } catch (error: any) {
      console.error("Error verifying email:", error);
      toast({
        title: "Verification Failed",
        description: `There was an issue verifying your email. Please try again later.`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-white bg-black">
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
                      className="bg-black border-white text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
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
