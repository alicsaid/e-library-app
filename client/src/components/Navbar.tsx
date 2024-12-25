import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Modal, Dropdown, Badge } from "antd";
import {
  ExclamationCircleOutlined,
  BookOutlined,
  UserOutlined,
  SolutionOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { getNotificationsCount } from "../services/api";

const { confirm } = Modal;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<number>(0);

  useEffect(() => {
    // Učitaj podatke korisnika iz localStorage
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    setUserName(firstName && lastName ? `${firstName} ${lastName}` : null);

    // Učitaj broj notifikacija
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const count = await getNotificationsCount(); // Direktno koristi rezultat
      setNotifications(count);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const showLogoutConfirm = () => {
    confirm({
      title: "Are you sure you want to log out?",
      icon: <ExclamationCircleOutlined />,
      content: "You will be logged out of the application.",
      okText: "Yes, Log Out",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        localStorage.clear(); // Obrisi sve podatke
        navigate("/"); // Redirektuj na login stranicu
      },
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="notifications">
        <Link to="/notifications">
          Notifications <Badge count={notifications} offset={[10, 0]} />
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={showLogoutConfirm}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="navbar-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        borderBottom: "1px solid #d9d9d9", // Thinner gray line under the navbar
      }}
    >
      {/* Left side - Logo */}
      <div className="logo" style={{ fontSize: "24px", fontWeight: "bold" }}>
        <Link to="/home" style={{ color: "#1890ff" }}>
          eLibrary
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <Menu
        mode="horizontal"
        theme="light"
        style={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="books" icon={<BookOutlined />}>
          <Link to="/books">Books</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="rentals" icon={<SolutionOutlined />}>
          <Link to="/rentals">Rentals</Link>
        </Menu.Item>
        <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
          <Link to="/help">Help</Link>
        </Menu.Item>
      </Menu>

      {/* Right side - User Info with Dropdown */}
      <Dropdown overlay={userMenu} trigger={["click"]}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "#1890ff",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              lineHeight: "24px",
              marginRight: "8px",
            }}
          >
            {userName?.charAt(0) || "U"}
          </div>
          <span style={{ fontSize: "16px", lineHeight: "20px" }}>
            {userName || "User"}
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default Navbar;
