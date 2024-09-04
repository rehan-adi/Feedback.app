"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Loader2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { profileValidation } from "@/validation/profile.validation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileFormData = z.infer<typeof profileValidation>;

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileFormData>();
  const [loading, setLoading] = useState(true);

  const methods = useForm({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      username: '',
      email: '',
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/profile");
        console.log(response.data);

        if (response.status === 200) {
          setProfileData(response.data.userProfile);
          methods.reset({
            username: response.data.userProfile?.username,
            email: response.data.userProfile?.email,
          });
          toast.success(response.data.message, {
            duration: 2000,
          });
        }

        setLoading(false);
      } catch (error: any) {
        console.error(error);
        const message =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        toast.error("Failed to get Profile", {
          description: message,
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [methods]);

  return (
    <div className="w-full min-h-screen flex justify-center lg:flex-row py-8 lg:px-0 px-4 flex-col mt-2 gap-3 items-center text-white bg-black">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-3 text-white text-sm font-medium">
            Loading profile...
          </span>
        </div>
      ) : (
        <>
          <div className="bg-[#1d26435c] py-5 flex justify-start items-center flex-col px-4 h-[35vh] lg:h-[75vh] lg:mt-0 mt-16 rounded-2xl w-full lg:w-[25vw]">
            <Avatar className="lg:mt-7 mt-2 w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {profileData?.username?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-white font-semibold mt-5 mb-1 text-xl">
              {profileData?.username}
            </h1>
            <h1 className="text-xs text-[#9CA3AF] mt-1 font-medium">
              {profileData?.email}
            </h1>
          </div>
          <div className="bg-black rounded-2xl border border-white border-opacity-20 h-[56vh] lg:h-[75vh] w-full lg:w-[45vw]">
            <div className="w-full border-b py-6 px-6 gap-2 flex items-center justify-between border-white border-opacity-20">
              <div>
                <div className="gap-2 flex items-center">
                  <User />
                  <span className="text-lg font-semibold">Profile</span>
                </div>
                <p className="text-xs text-[#9CA3AF] font-medium">
                  This page shows you your profile and account details
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="outline">
                    <Edit className="text-xs text-black" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark text-white">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Here you can edit your profile details.
                    </DialogDescription>
                  </DialogHeader>
                 <FormProvider  {...methods}>
                     <form onSubmit={methods.handleSubmit((data) => {
                        console.log(data);
                      })}>
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
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          /* Handle cancel */
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => {
                          /* Handle save */
                        }}
                      >
                        Save
                      </Button>
                    </div>
                     </form>
                 </FormProvider>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col gap-5 px-6 py-8">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium">Username</h2>
                <p className="text-sm font-semibold text-[#9CA3AF]">
                  {profileData?.username}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium">Email</h2>
                <p className="text-sm font-semibold text-[#9CA3AF] ">
                  {profileData?.email}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium">Email Verified</h2>
                <Badge
                  variant={
                    profileData?.isVerified ? "secondary" : "destructive"
                  }
                  className="w-[68px]"
                >
                  {profileData?.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
