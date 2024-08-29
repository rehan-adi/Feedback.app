"use client"

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {

  const [profileData, setProfileData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profileData = async () => {
      try {
        const response = await axios.get("/api/profile");

        console.log(response);
        

        if (response.status === 200) {
          setProfileData(response.data);
          toast(
            "Profile loaded successfully",
            {
              description: response.data.message,
              duration: 2000,
            }
          )
        }

        setLoading(false);

      } catch (error: any) {
        console.error(error);
        const message =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        toast.error("Signin Failed", {
          description: message,
        });
      }
    };
    profileData();
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center lg:flex-row py-8 lg:px-0 px-4 flex-col mt-2 gap-3 items-center text-white bg-black">
      <div className="bg-[#1d26435c] py-5 flex justify-start items-center flex-col px-4 h-[35vh] lg:h-[75vh] lg:mt-0 mt-16 rounded-2xl w-full lg:w-[25vw]">
        <Avatar className="lg:mt-7 mt-2 w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="text-white font-semibold mt-5 mb-1 text-xl">MD Rehan</h1>
        <h1 className="text-xs text-[#9CA3AF] mt-1 font-medium">
          rehanali@gmail.com
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
            <p className="text-sm font-semibold text-[#9CA3AF]">John Doe</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium">Email</h2>
            <p className="text-sm font-semibold text-[#9CA3AF] ">
              johndoe@example.com
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-medium">Email Verified</h2>
            <Badge variant="secondary" className="w-[68px]">
              Verified
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
