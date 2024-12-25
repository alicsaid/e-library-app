import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();

        // Check if user is librarian
        if (
          data.error &&
          data.error === "Access denied. Only librarians can log in."
        ) {
          toast.error("You must be a librarian to log in.");
          return; // Prevent further execution if not a librarian
        }

        // Save the token and user details in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken || ""); // Handle optional refreshToken
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("last_name", data.last_name);
        localStorage.setItem("email", data.email);

        toast.success("Login successful!");

        // Navigate to the home page
        navigate("/home");
      } else {
        const errorData = await response.json();
        if (errorData.error === "User not found.") {
          toast.error("User not found. Please check your email.");
        } else if (errorData.error === "Incorrect password.") {
          toast.error("Incorrect password. Please try again.");
        } else if (
          errorData.error === "Too many login attempts, please try again later."
        ) {
          toast.error("Too many login attempts, please try again later.");
        } else {
          toast.error("Error during login. Please check your credentials.");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-4xl font-bold text-center mb-4">E-Library</h1>
        <p className="text-lg text-center mb-6">
          Welcome back! Please enter your credentials to continue.
        </p>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center">
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot your password? Reset here
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
