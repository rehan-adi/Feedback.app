"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Github, LogOut, Settings, User } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      if (response.status === 200) {
        toast.success("Logout successful", {
          description: response.data.message || "You have been logged out.",
          duration: 2000,
        });
        router.push("/signin");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Logout failed", {
        description:
          error?.response?.data?.message ||
          "An error occurred. Please try again.",
        duration: 3000,
      });
    }
  };

  const onProfile = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push("/profile");
  };
  const onSettings = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push("/settings");
  };
  const onGithub = (event: React.MouseEvent<HTMLDivElement>) => {
    window.open("https://github.com/rehan-adi/Next-Fullstack-App", "_blank");
  };

  return (
    <nav className="dark:bg-black bg-white flex justify-between z-50 border-b dark:border-white border-black border-opacity-25 dark:border-opacity-15 fixed top-0 items-center lg:px-20 px-6 dark:text-white text-black h-20 w-full ">
      {/* Logo */}
      <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="h-7 w-7"
      >
        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
      </svg>
      </div>
      <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52 lg:mr-14 mr-7">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettings}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onGithub}>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
