import React, { useState, useEffect } from "react";
import { Card, Form, Input, Button, Typography, Avatar, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import { changePassword } from "../../services/api"; // Assuming you have a changePassword API function

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Librarian",
  });

  useEffect(() => {
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const email = localStorage.getItem("email");

    if (firstName && lastName && email) {
      setProfile({
        firstName,
        lastName,
        email,
        role: "Librarian",
      });
    }
  }, []);

  // Handle password change
  const onFinish = async (values: any) => {
    const { currentPassword, newPassword } = values;

    try {
      const response = await changePassword(currentPassword, newPassword);
      if (response) {
        message.success("Password changed successfully!");
      }
    } catch (error) {
      message.error("Failed to change password");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <Title level={2}>Profile</Title>

        {/* Profile Card */}
        <Card style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {/* Avatar with initials */}
            <Avatar
              size={80}
              style={{ backgroundColor: "#87d068", marginRight: "20px" }}
            >
              {profile.firstName[0]}
              {profile.lastName[0]}
            </Avatar>
            <div>
              <Title level={4}>
                {profile.firstName} {profile.lastName}
              </Title>
              <p>{profile.email}</p>
              <p>{profile.role}</p>
            </div>
          </div>
        </Card>

        {/* Change Password Section */}
        <Title level={4}>Change Password</Title>
        <Card style={{ marginBottom: "20px" }}>
          <Form name="change_password" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Current Password"
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm New Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
