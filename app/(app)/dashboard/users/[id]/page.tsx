"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const UserProfilePage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users/${params.id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [params.id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user}'s Profile</h1>
      <p>Other details...</p>
    </div>
  );
};

export default UserProfilePage;
