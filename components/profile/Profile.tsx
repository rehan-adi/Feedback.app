"use client";

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { profileData } from "@/validation/profile.validation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const [profileData, setProfileData] = useState<profileData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/profile");
        console.log(response.data);

        if (response.status === 200) {
          setProfileData(response.data.userProfile);
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
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center lg:flex-row py-8 lg:px-0 px-4 flex-col mt-2 gap-3 items-center text-white bg-black">
      {loading ? (
        <>
          <Loader2 className="h-8 w-8 animate-spin" />
        </>
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
            <div className="w-full border-b py-6 px-6 gap-2 flex flex-col border-white border-opacity-20">
              <div className="gap-2 flex items-center">
                <User />
                <span className="text-lg font-semibold">Profile</span>
              </div>
              <p className="text-xs text-[#9CA3AF] font-medium">
                This page shows you your profile and account details
              </p>
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
