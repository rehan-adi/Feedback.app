"use client";

import axios from "axios";
import Link from "next/link";
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

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/users");
        if (response.status === 200) {
            setUsers(response.data);
            setLoading(false);
        };
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-20 flex justify-center items-center ml-60 px-8">
      { loading ? 
      <>
       <Loader2 className="animate-spin m-72 h-7 w-7"/>
      </>
       :    <Table className="w-full max-w-screen-lg mx-auto">
      <TableCaption>A list of registered users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Username</TableHead>
          <TableHead className="w-[150px]">Email</TableHead>
          <TableHead className="w-[150px]">Profile</TableHead>
          <TableHead className="w-[150px]">Verified</TableHead>
          <TableHead className="w-[150px]">Accept Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Link href={`/profile/${user.id}`} className="text-blue-500 hover:underline">
                View Profile
              </Link>
            </TableCell>
            <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
            <TableCell>{user.acceptMessage ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table> }
  </div>
  );
};

export default UsersPage;
