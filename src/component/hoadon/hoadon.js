import React, { useEffect, useState } from "react";

const YourComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (user) {
        try {
          const response = await fetch(
            "http://localhost/api-dulich/api/get_hd_nguoidung.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: user.id }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.status === "success") {
            setInvoices(data.data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Failed to fetch invoices:", error);
        }
      }
    };

    fetchInvoices();
  }, [user]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Hóa đơn của bạn</h1>
          <ul>
            {invoices.map((invoice) => (
              <li key={invoice.id}>{invoice.details}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Vui lòng đăng nhập để xem hóa đơn của bạn.</p>
      )}
    </div>
  );
};

export default YourComponent;
