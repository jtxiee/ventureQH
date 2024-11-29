import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin1() {
  const [admin_name, setAdminName] = useState("");
  const [admin_password, setAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/api-dulich-main/api-dulich/api/Admin/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ admin_name, admin_password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data.status === "success") {
        console.log("Login successful:", data);
        // Chuyển hướng đến trang dashboard-admin-hotel
        navigate("/dashboard-admin-hotel");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div>
      <style>
        {`
                    .login-form {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 400px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }
                    .bg-dark {
                        background-color: #343a40;
                        color: white;
                        padding: 10px 0;
                    }
                    .custom-bg {
                        background-color: #007bff;
                        border: none;
                        border-radius: 5px;
                        padding: 10px 15px;
                        cursor: pointer;
                    }
                    .custom-bg:hover {
                        background-color: #0056b3;
                    }
                    .form-control {
                        border: 1px solid #ced4da;
                        border-radius: 5px;
                        padding: 10px;
                        width: 100%;
                    }
                    .form-control:focus {
                        border-color: #007bff;
                        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
                    }
                `}
      </style>
      <div className="login-form text-center rounded overflow-hidden">
        <form method="POST" onSubmit={handleLogin}>
          <h4 className="bg-dark">ADMIN LOGIN PANEL</h4>
          <div className="p-4">
            <div className="mb-3">
              <input
                name="admin_name"
                required
                type="text"
                className="form-control shadow-none text-center"
                placeholder="Admin name"
                value={admin_name}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                name="admin_password"
                required
                type="password"
                className="form-control shadow-none text-center"
                placeholder="Password"
                value={admin_password}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <button
              name="login"
              type="submit"
              className="btn custom-bg shadow-none"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin1;
