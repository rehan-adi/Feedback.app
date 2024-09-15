"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users");
        if (response.status === 200) {
          setUsers(response.data.data);
          console.log(response.data);
          
          toast.success("Users fetched successfully", {
            duration: 2000,
          });
          setLoading(false);
        }
      } catch (error: any) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch users", {
          description:
            error?.response?.data?.message ||
            "An error occurred. Please try again.",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-20 flex justify-center items-center lg:ml-60 px-1">
      {loading ? (
        <>
          <Loader2 className="animate-spin m-72 h-7 w-7" />
        </>
      ) : (
        <Table className="lg:max-w-screen-xl overflow-x-hidden w-full mx-auto">
          <TableCaption className="mt-10">A list of registered users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="lg:w-[150px]">Username</TableHead>
              <TableHead className="lg:w-[150px]">Email</TableHead>
              <TableHead className="lg:w-[150px]">Profile</TableHead>
              <TableHead className="lg:w-[150px]">Verified</TableHead>
              <TableHead className="lg:w-[150px]">Accept Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link
                    href={`/profile/${user.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </Link>
                </TableCell>
                <TableCell>{user.isVerified ? "Yes" : "No"}</TableCell>
                <TableCell>{user.isAcceptingMessages ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UsersPage;
