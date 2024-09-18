"use client";

import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Footer from "../common/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, User, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Github, TwitterIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { profileData } from "@/validation/profile.validation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<profileData>();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string>('');
  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/profile/${id}`);
        if (response.status === 200) {
          setUser(response.data.data);
          setLoading(false);
          toast.success(response.data.message, {
            duration: 2000,
          });
        }
      } catch (error: any) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user", {
          description: error.response?.data?.message || "An error occurred.",
          duration: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleFeedbackClick = () => {
    setShowTextarea((prev) => !prev);
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    
    try {
      const response = await axios.post(`/api/send-message/${id}`, {
        content: feedback
      });
      if (response.status === 201) {
        toast.success("Feedback submitted successfully", { duration: 2000 });
        setShowTextarea(false);
        setFeedback('');
      }
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback", {
        description: error.response?.data?.message || "An error occurred.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="w-full min-h-screen flex justify-center lg:flex-row py-8 lg:px-0 px-4 flex-col mt-2 gap-3 items-center dark:text-white dark:bg-black bg-white text-black">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
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
            <div className="dark:bg-black rounded-2xl border dark:border-white dark:border-opacity-15 border-black border-opacity-25 h-[66vh] lg:h-[75vh] w-full lg:w-[45vw]">
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
                    className="w-[68px] whitespace-nowrap"
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
                <div className="lg:mt-20 text-right">
                  <Button variant="default" disabled={loading} onClick={handleFeedbackClick}>
                    Feedback
                  </Button>
                </div>
                {showTextarea && (
                  <div className="fixed inset-0 flex justify-center items-center z-50">
                    <div className="relative p-4 py-10 rounded-lg border dark:border-white dark:border-opacity-25 border-black border-opacity-25 shadow-xl bg-white dark:bg-black w-[90%] lg:w-[45%]">
                      <button
                        onClick={() => setShowTextarea(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <Textarea
                        placeholder="Enter your feedback..."
                        className="h-32 mt-4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                      <Button
                        variant="default"
                        onClick={handleSubmitFeedback}
                        className="mt-4"
                      >
                        { loading ? 
                        <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        </>
                         : "Submit" }
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UsersProfile;
