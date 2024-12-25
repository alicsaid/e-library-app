import React, { useEffect, useState } from "react";
import { List, Badge, Select, Button, Row, Col } from "antd";
import { BookOutlined } from "@ant-design/icons";
import Navbar from "../../components/Navbar";
import { getNotificationRentals } from "../../services/api"; // Import your service function
import { Rental } from "../../types";

interface Notification {
  id: number;
  title: string;
  rentedBy: string;
  type: "overdue" | "dueToday";
  returnDate: string;
}

const { Option } = Select;

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [todayDate, setTodayDate] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  // Helper function to format date as DD-MM-YYYY
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Helper function to reset time to 00:00:00
  const resetTimeToMidnight = (date: Date): Date => {
    const resetDate = new Date(date);
    resetDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return resetDate;
  };

  // Function to check if two dates are the same (only comparing date, not time)
  const isSameDate = (date1: Date, date2: Date): boolean => {
    const resetDate1 = resetTimeToMidnight(date1);
    const resetDate2 = resetTimeToMidnight(date2);
    return resetDate1.getTime() === resetDate2.getTime();
  };

  useEffect(() => {
    // Set today's date in DD-MM-YYYY format
    const today = new Date();
    setTodayDate(formatDate(today));

    // Fetch rentals data from API
    const fetchRentals = async () => {
      try {
        const rentals: Rental[] = await getNotificationRentals();

        if (Array.isArray(rentals)) {
          const mappedNotifications: Notification[] = rentals.map((rental) => {
            const dueDate = new Date(rental.return_date);
            const today = new Date();

            // Reset both dates to midnight for comparison
            const resetToday = resetTimeToMidnight(today);
            const resetDueDate = resetTimeToMidnight(dueDate);

            let type: "overdue" | "dueToday" = "dueToday";

            // Adjust the logic: if due date is today or earlier
            if (resetDueDate < resetToday) {
              type = "overdue"; // If due date is earlier than today
            } else if (resetDueDate.getTime() === resetToday.getTime()) {
              type = "dueToday"; // If the due date is the same as today's date
            }

            return {
              id: rental.rental_id,
              title: `Book ${rental.book_id}`,
              rentedBy: `User ${rental.user_id}`,
              type,
              returnDate: formatDate(dueDate), // Format return date as DD-MM-YYYY
            };
          });

          setNotifications(mappedNotifications);
          setFilteredNotifications(mappedNotifications);
        } else {
          console.error(
            "Expected rentals to be an array, but received:",
            rentals
          );
          setNotifications([]);
          setFilteredNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  const handleFilterChange = (value: string) => {
    setFilter(value);

    if (value === "all") {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(
        notifications.filter((notification) => notification.type === value)
      );
    }
  };

  const handleClearNotifications = () => {
    // Placeholder function for "Clear Notifications" button (currently does nothing)
    console.log("Clear notifications clicked!");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Notifications Page */}
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        {/* Header Section */}
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "16px", color: "#555" }}>
            Today is <strong>{todayDate}</strong>
          </p>
          <p style={{ fontSize: "16px", color: "#333" }}>
            Below are the books that are due today or are overdue.
          </p>

          {/* Filter and Clear Notifications Section */}
          <Row justify="center" align="middle" gutter={[10, 0]}>
            <Col>
              <Select
                defaultValue="all"
                style={{ width: 200 }}
                onChange={handleFilterChange}
              >
                <Option value="all">All</Option>
                <Option value="overdue">Overdue</Option>
                <Option value="dueToday">Due Today</Option>
              </Select>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={handleClearNotifications}
                style={{ marginLeft: "10px" }}
              >
                Clear Notifications
              </Button>
            </Col>
          </Row>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={filteredNotifications}
            renderItem={(notification) => (
              <List.Item style={{ borderBottom: "1px solid #f0f0f0" }}>
                <List.Item.Meta
                  avatar={
                    <Badge
                      count={
                        notification.type === "overdue"
                          ? "Overdue"
                          : "Due Today"
                      }
                      style={{
                        backgroundColor:
                          notification.type === "overdue"
                            ? "#f5222d"
                            : "#faad14",
                      }}
                    >
                      <BookOutlined
                        style={{ fontSize: "24px", color: "#1890ff" }}
                      />
                    </Badge>
                  }
                  title={
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                      {notification.title}
                    </span>
                  }
                  description={
                    <span style={{ color: "#555" }}>
                      <strong>{notification.rentedBy}</strong> rented this book.
                      <br />
                      <strong>Return Date: </strong>
                      {notification.returnDate}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p>No notifications to display.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationsPage;
