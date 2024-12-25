import React, { useEffect, useState } from "react";
import { Table, Button, Space, message, Input, Select, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../types";
import { getUsers, deleteUser } from "../../services/api";
import Navbar from "../../components/Navbar";
import {
  ViewButton,
  EditButton,
  DeleteButton,
  AddNewButton,
} from "../../components/common/Buttons";

const { Search } = Input;
const { Option } = Select;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      message.error("Error loading users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const applyFilters = () => {
    let filtered = users;

    // Search filter by user name
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(
          searchTerm.toLowerCase()
        )
      );
    }

    // Filter by selected role
    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedRole, users]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      message.success("User successfully deleted");
      fetchUsers();
    } catch (error) {
      message.error("Error deleting user");
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      sorter: (a: User, b: User) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      sorter: (a: User, b: User) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        if (!role) return null;
        // Capitalize the first letter of the role
        return role.charAt(0).toUpperCase() + role.slice(1);
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Space size="middle">
          <ViewButton entityId={record.user_id} basePath="users" />
          <EditButton entityId={record.user_id} basePath="users" />
          <DeleteButton entityId={record.user_id} onDelete={handleDelete} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Users</h2>
          <div className="flex space-x-4">
            <Search
              placeholder="Search by user name"
              onSearch={handleSearch}
              enterButton
            />
            <AddNewButton basePath="users" label="Add New User" />
          </div>
        </div>

        <div className="flex justify-start mb-4">
          <Select
            placeholder="Filter by Role"
            style={{ width: 200 }}
            onChange={handleRoleChange}
            allowClear
          >
            <Option value="librarian">Librarian</Option>
            <Option value="member">Member</Option>
          </Select>
        </div>

        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="user_id"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserList;
