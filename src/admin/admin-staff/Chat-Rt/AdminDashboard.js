import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminChat from "./AdminChat";
import styled from "styled-components";
import io from "socket.io-client"; // Thêm dòng này

const AdminDashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const CustomerList = styled.div`
  width: 20%;
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
  background-color: #2c2f33;
  border-radius: 10px;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
    color: #ffffff;
    font-weight: ${(props) => (props.$bold ? "bold" : "normal")};
    position: relative;

    &:hover {
      background-color: #7289da;
    }

    &.selected {
      background-color: #888888;
      color: white;
    }
  }
`;

const UnreadCount = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: 5px;
  right: 10px;
`;

const ChatSection = styled.div`
  width: 80%;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Căn chỉnh nút bấm sang trái */
  margin-bottom: 10px; /* Thêm khoảng cách dưới nút bấm */
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ff6347; /* Thay đổi màu nền */
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff4500; /* Thay đổi màu nền khi hover */
  }
`;

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "http://localhost/api-dulich-main/api-dulich/api/Admin/get_usernd.php"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerClick = (customerId, customerName) => {
    setSelectedCustomerId(customerId);
    setSelectedCustomerName(customerName);
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [customerId]: 0,
    }));
  };

  const handleReceiveMessage = (message) => {
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [message.userId]: (prevNotifications[message.userId] || 0) + 1,
    }));
  };

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("newMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("newMessage", handleReceiveMessage);
    };
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard-admin-hotel");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <AdminDashboardContainer>
      <CustomerList>
        <ButtonContainer>
          <Button onClick={handleBackToDashboard}>Trở về</Button>
        </ButtonContainer>
        <ul>
          {customers.map((customer) => (
            <li
              key={customer.id}
              onClick={() => handleCustomerClick(customer.id, customer.name)}
              className={selectedCustomerId === customer.id ? "selected" : ""}
              $bold={notifications[customer.id] > 0 ? true : undefined}
            >
              {customer.name}
              {notifications[customer.id] > 0 && (
                <UnreadCount>{notifications[customer.id]}</UnreadCount>
              )}
            </li>
          ))}
        </ul>
      </CustomerList>
      <ChatSection>
        {selectedCustomerId ? (
          <AdminChat
            selectedCustomerId={selectedCustomerId}
            selectedCustomerName={selectedCustomerName}
          />
        ) : (
          <p>Please select a customer to chat with.</p>
        )}
      </ChatSection>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
