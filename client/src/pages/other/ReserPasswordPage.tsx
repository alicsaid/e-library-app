import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useParams(); // Token iz URL-a
  const navigate = useNavigate();

  const handleSubmit = async (values: { password: string }) => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5001/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        toast.success("Password has been reset successfully!");
        navigate("/login"); // Preusmeri korisnika na login stranicu
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Error occurred, please try again later."
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-4xl font-bold text-center mb-4">
          Reset Your Password
        </h1>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter a new password!" },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPage;
