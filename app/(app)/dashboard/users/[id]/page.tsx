"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h1>{user}'s Profile</h1>
      {/* <p>Email: {user.email}</p>
      <p>Verified: {user.isVerified ? "Yes" : "No"}</p> */}
      {/* Display more user information as needed */}
    </div>
  );
};

export default UserProfile;
