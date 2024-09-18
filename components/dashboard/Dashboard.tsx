"use client";

import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

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
        toast.error("", {
          description:
            error?.response?.data?.message ||
            "An error occurred. Please try again.",
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
        <div className="flex justify-center items-center w-full h-full">
          <Loader2 className="h-8 w-8 mt-60 animate-spin" />
        </div>
      ) : (
        <div className="w-full mt-16 max-w-3xl">
          <div className="space-y-4">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 border rounded-lg shadow-lg bg-white dark:bg-black border-gray-200 dark:border-gray-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      {message.user.username || "Unknown User"}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {message.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center mt-20 flex-col gap-10">
                <img
                  src="empty.svg"
                  alt="img"
                  className="w-72 lg:w-96"
                />
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
