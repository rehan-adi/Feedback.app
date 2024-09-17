"use client";

import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Github, TwitterIcon } from "lucide-react";
import { profileData } from "@/validation/profile.validation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {

  const { id } = useParams();
  const [user, setUser] = useState<profileData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/profile/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="w-full min-h-screen flex justify-center lg:flex-row py-8 lg:px-0 px-4 flex-col mt-2 gap-3 items-center dark:text-white dark:bg-black bg-white text-black">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-3 text-white text-sm font-medium">
            Loading profile...
          </span>
        </div>
      ) : (
        <>
          <div className="dark:bg-[#1d26435c] bg-white py-5 flex justify-start border border-black border-opacity-25 items-center flex-col px-4 h-[35vh] lg:h-[75vh] lg:mt-0 mt-16 rounded-2xl w-full lg:w-[25vw]">
            <Avatar className="lg:mt-7 mt-2 w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {user?.username?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <h1 className="dark:text-white text-black font-semibold mt-5 mb-1 text-xl">
              {user?.username}
            </h1>
            <h1 className="text-xs dark:text-[#9CA3AF] text-black mt-1 font-medium">
              {user?.email}
            </h1>
          </div>
          <div className="dark:bg-black rounded-2xl border dark:border-white dark:border-opacity-15 border-black border-opacity-25 h-[57vh] lg:h-[75vh] w-full lg:w-[45vw]">
            <div className="w-full border-b py-6 px-6 gap-2 flex items-center justify-between border-white border-opacity-20">
              <div>
                <div className="gap-2 flex items-center">
                  <User />
                  <span className="text-lg font-semibold">Profile</span>
                </div>
                <p className="text-xs dark:text-[#9CA3AF] text-black text-opacity-75 font-medium">
                  This page shows you your profile and account details
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 px-6 py-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium">Username</h2>
                <p className="text-sm font-semibold text-[#9CA3AF]">
                  {user?.username}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-sm font-medium">Email</h2>
                <p className="text-sm font-semibold text-[#9CA3AF] ">
                  {user?.email}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-medium">Email Verified</h2>
                <Badge
                  variant={user?.isVerified ? "default" : "destructive"}
                  className="w-[68px]"
                >
                  {user?.isVerified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
              <div className="flex items-center gap-5 mt-4">
                {user?.githubLink && (
                  <a
                    href={user.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:underline"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {user?.twitterLink && (
                  <a
                    href={user.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:underline"
                  >
                    <TwitterIcon className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
