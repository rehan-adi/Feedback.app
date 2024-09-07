"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { updateProfileValidation } from "@/validation/profile.validation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type UpdateProfileFormData = z.infer<typeof updateProfileValidation>;

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const methods = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileValidation),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.put("/api/update-profile", data);

      if (response.status === 200) {
        toast.success(response.data.message, { duration: 2000 });
        methods.reset();
      }
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        "An error occurred while updating the profile.";
      toast.error(message, { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          control={methods.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  className="bg-black border-white text-white"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-5 space-x-2">
          <Button type="submit">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateProfile;
