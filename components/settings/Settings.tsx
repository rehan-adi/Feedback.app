"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Card, CardHeader, CardContent } from "../ui/card";
import { changePasswordValidation } from "@/validation/auth.validation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [activeOption, setActiveOption] = useState("");
  const [acceptMessages, setAcceptMessages] = useState<boolean>(true);

  const form = useForm<z.infer<typeof changePasswordValidation>>({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: {
      password: "",
    },
  });

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handlePasswordChange = async (
    data: z.infer<typeof changePasswordValidation>
  ) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/change-password", {
        password: data.password,
      });

      if (response.status === 200) {
        toast.success("Password Changed Successfully", {
          duration: 2000,
        });
        form.reset();
      }
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error("Failed to change Password", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMessagePreferences = async () => {
      try {
        const response = await axios.get("/api/accept-message");
        if (response.status === 200) {
          setAcceptMessages(response.data.acceptMessages);
        }
      } catch (error) {
        console.error("Error fetching message preferences:", error);
      }
    };

    fetchMessagePreferences();
  }, []);

  const handleAcceptMessagesChange = async (checked: boolean) => {
    setAcceptMessages(checked);
    try {
      const response = await axios.post("/api/accept-message", {
        acceptMessages: checked,
      });

      if (response.status === 200) {
        toast.success("Accept Messages Settings Updated", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating accept messages:", error);
    }
  };

  return (
    <div className="lg:flex h-screen bg-black text-white">

      {/* sidebar for small screen */}
      <div className="lg:hidden py-6 mt-20 flex justify-center items-center">
        <ul className="flex gap-4">
          <li
            className={`cursor-pointer text-[#9CA3AF] text-sm font-medium ${
              activeOption === "password" ? "text-white" : ""
            }`}
            onClick={() => setActiveOption("password")}
          >
            Change Password
          </li>
          <li
            className={`cursor-pointer text-[#9CA3AF] text-sm font-medium ${
              activeOption === "messages" ? "text-white" : ""
            }`}
            onClick={() => setActiveOption("messages")}
          >
            Accept Messages
          </li>
        </ul>
      </div>

      {/* Sidebar */}
      <aside className="w-72 h-full bg-black fixed pt-28 left-0 border-r border-white border-opacity-15 hidden lg:flex flex-col justify-start p-5">
        <h2 className="text-2xl font-semibold mb-9">Settings</h2>

        <ul className="space-y-4">
          <li
            className={`cursor-pointer text-[#9CA3AF] text-sm font-medium ${
              activeOption === "password" ? "text-white" : ""
            }`}
            onClick={() => setActiveOption("password")}
          >
            Change Password
          </li>
          <li
            className={`cursor-pointer text-[#9CA3AF] text-sm font-medium ${
              activeOption === "messages" ? "text-white" : ""
            }`}
            onClick={() => setActiveOption("messages")}
          >
            Accept Messages
          </li>
        </ul>

        <div className="mt-auto">
          <Button onClick={handleLogout} className="w-full" variant="default">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex items-center lg:px-0 px-2 lg:mt-0 mt-2 justify-center">
        <Card className="lg:w-96 w-full bg-black border border-white border-opacity-15 text-white shadow-lg">
          <CardHeader className="text-center text-xl font-bold">
            {activeOption === "" && "Settings Overview"}
            {activeOption === "password" && "Change Password"}
            {activeOption === "messages" && "Accept Messages"}
          </CardHeader>

          <CardContent>
            {activeOption === "" && (
              <div className="text-center">
                <p className="mb-4 text-[#9CA3AF] text-base font-medium">
                  Here you can modify your account settings. You can change your
                  password or toggle whether to accept messages. Select an
                  option from the left.
                </p>
                <p className="mb-4 text-[#9CA3AF] text-base font-medium">
                  Note: Changing your password will log you out from all other
                  devices.
                </p>
                <p className="mb-4 text-[#9CA3AF] text-base font-medium">
                  You can also update your profile information, adjust your
                  privacy settings, and configure notification preferences.
                </p>

                <div className="mt-8 text-left space-y-4">
                  <h3 className="text-lg font-semibold text-white">
                    Other Settings
                  </h3>
                  <ul className="list-disc list-inside text-[#9CA3AF]">
                    <li className="text-base font-medium">
                      Profile Settings: Update your profile picture and personal
                      details.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Change Password Form */}
            {activeOption === "password" && (
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(handlePasswordChange)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter new password"
                            type="password"
                            className="dark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={loading}
                    className="w-full font-medium"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        changing...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </FormProvider>
            )}

            {/* Accept Messages Toggle */}
            <div>
              {activeOption === "messages" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-white">
                      Accept Messages
                    </label>
                    <Switch
                      checked={acceptMessages}
                      onCheckedChange={handleAcceptMessagesChange}
                      className="bg-gray-800"
                    />
                  </div>
                  <p className="text-sm text-[#9CA3AF]">
                    {acceptMessages
                      ? "You are currently accepting messages."
                      : "You are not accepting messages."}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
