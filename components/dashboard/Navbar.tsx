"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
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
          error?.response?.data?.message || "An error occurred. Please try again.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex justify-between items-center lg:px-20 px-6 text-white h-20 w-full ">
      <h1>Logo</h1>

      <Button variant="secondary" onClick={onLogout} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging out...
          </>
        ) : (
          "Logout"
        )}
      </Button>
    </div>
  );
};

export default Navbar;
