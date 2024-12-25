import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Radio } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../../services/api";
import Navbar from "../../components/Navbar";

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (id) {
      fetchUser(Number(id));
    }
  }, [id]);

  const fetchUser = async (userId: number) => {
    setLoading(true);
    try {
      const user = await getUserById(userId);
      form.setFieldsValue({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        password: "", // Password is left blank for security reasons
      });
      setRole(user.role);
    } catch (error) {
      message.error("Error loading user");
    }
    setLoading(false);
  };

  const onFinish = async (values: any) => {
    const userData = {
      ...values,
      status: true,
    };

    setLoading(true);
    try {
      if (id) {
        await updateUser(Number(id), userData);
        message.success("User updated successfully");
      } else {
        await createUser(userData);
        message.success("User created successfully");
      }
      navigate("/users");
    } catch (error) {
      message.error("Error saving user");
    }
    setLoading(false);
  };

  const handleRoleChange = (e: any) => {
    setRole(e.target.value);
    if (e.target.value !== "librarian") {
      form.setFieldsValue({ password: "" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          {id ? "Edit User" : "Add a new User"}
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            role: "",
            password: "",
          }}
          className="w-full max-w-2xl"
        >
          {/* First Name and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[{ required: true, message: "Please enter first name!" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[{ required: true, message: "Please enter last name!" }]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </div>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter an email!" }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          {/* Role Selection with Radio Buttons */}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Radio.Group onChange={handleRoleChange}>
              <Radio value="librarian">Librarian</Radio>
              <Radio value="member">Member</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Password Field */}
          {role === "librarian" && (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter a password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          )}

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              {id ? "Update" : "Add"} User
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
