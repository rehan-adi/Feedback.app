"use client";

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Loader2, User, MessageCircle } from "lucide-react";


interface Message {
  id: string;
  content: string;
  createdAt: string;
  sender: {
    username: string;
  };
}

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/get-message");

        if (response.status === 200) {
          setMessages(response.data.message);

          toast.success("Messages fetched successfully", {
            duration: 2000,
          });
        }
      } catch (error: any) {
        console.error("Failed to fetch messages", error);
        const message =
          error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(message, {
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="dark:bg-black bg-white flex flex-col lg:ml-60 items-center min-h-screen py-10">
      {loading ? (
         <div className="w-full mt-16 max-w-3xl space-y-4 px-3">
         {[1, 2, 3].map((_, i) => (
           <div key={i} className="p-6 border rounded-lg shadow-lg bg-white dark:bg-black border-gray-200 dark:border-white dark:border-opacity-25 animate-pulse">
             <div className="flex justify-between items-center mb-2">
               <div className="flex items-center gap-2">
                 <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                 <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
               </div>
               <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
             </div>
             <div className="mt-5 space-y-3">
               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
               <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
             </div>
           </div>
         ))}
       </div>
      ) : (
        <div className="w-full mt-16 max-w-3xl">
          <div className="space-y-4 px-3">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="p-5 border rounded-lg shadow-lg bg-white transition-all duration-200 hover:shadow-2xl dark:bg-black dark:bg-gradient-to-r dark:from-black dark:to-indigo-900 bg-gradient-to-r from-blue-50 to-white border-gray-200 dark:border-white dark:border-opacity-25"
                >
                  <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                      <User className="h-5 w-5  dark:text-gray-300" />
                      <span className="font-semibold text-gray-800 text-base dark:text-gray-100">
                        {message.sender.username || "Unknown User"}
                      </span>
                    </div>
                    <span className="text-xs italic text-gray-500 dark:text-gray-400">
                    {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-start mt-5 gap-3">
                    <MessageCircle className="h-5 w-5 dark:text-gray-300" />
                    <p className="text-gray-700 dark:text-gray-300">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-20 flex-col gap-10">
                <img src="empty.svg" alt="No messages" className="w-72 lg:w-96" />
                <p className="text-gray-700 text-center dark:text-gray-300">
                  No messages found.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
