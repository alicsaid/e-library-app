// src/components/UserDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../../services/api";
import { User } from "../../types";
import Navbar from "../../components/Navbar";
import { message, Button, Spin } from "antd";
import moment from "moment";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const fetchedUser = await getUserById(Number(id));
      setUser(fetchedUser);
    } catch (error) {
      message.error("Error fetching user details");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center">User not found</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6 text-center">
        <h2 className="text-3xl font-bold">
          {user.first_name} {user.last_name}
        </h2>
        <p className="mt-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mt-2">
          <strong>Role:</strong>{" "}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
        <p className="mt-2">
          <strong>Member Since:</strong> {moment(user.created_at).format("LL")}
        </p>
        <p className="mt-2">
          <strong>Last Modified:</strong> {moment(user.updated_at).format("LL")}
        </p>
        <div className="mt-6">
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
