import React, { useState, useEffect } from "react";
import HeaderAdmin from "../header-admin/header-admin";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";

function CapNhatNV() {
  const [employee, setEmployee] = useState({
    id: "",
    username: "",
    tennhanvien: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [originalPassword, setOriginalPassword] = useState(""); // Thêm trạng thái để lưu trữ mật khẩu ban đầu
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      console.log("Loaded user data:", storedUser); // Kiểm tra dữ liệu khi chuyển sang chức năng cập nhật
      setEmployee({
        id: storedUser.id,
        username: storedUser.name, //
        tennhanvien: storedUser.ten, //
        password: storedUser.pass, //
        email: storedUser.email,
        phoneNumber: storedUser.number,
        address: storedUser.address,
      });
      setOriginalPassword(storedUser.pass); // Lưu trữ mật khẩu ban đầu
      setIsLoading(false);
    } else {
      setError("Không tìm thấy thông tin nhân viên");
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
    console.log(`Updated ${name}:`, value); // Thêm console.log để kiểm tra giá trị
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", employee);

    // Kiểm tra xem mật khẩu có thay đổi hay không
    const updatedEmployee = {
      ...employee,
      originalPassword: originalPassword, // Gửi thêm tham số originalPassword
      password:
        employee.password === originalPassword
          ? originalPassword
          : employee.password,
    };

    try {
      const response = await fetch(
        "http://localhost/api-dulich-main/api-dulich/api/Admin/update_employee.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Thông tin nhân viên đã được cập nhật thành công");
        // Cập nhật lại sessionStorage với dữ liệu mới
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            id: updatedEmployee.id,
            name: updatedEmployee.username,
            ten: updatedEmployee.tennhanvien,
            pass: updatedEmployee.password,
            email: updatedEmployee.email,
            number: updatedEmployee.phoneNumber,
            address: updatedEmployee.address,
          })
        );
        setEmployee(updatedEmployee); // Cập nhật lại trạng thái employee
        //navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      setError(err);
      toast.error("Cập nhật thông tin nhân viên thất bại. Vui lòng thử lại.");
    }
  };

  if (isLoading) return <div>Đang tải dữ liệu...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 w-full">
      <HeaderAdmin />
      <div
        className="container mx-auto sm:px-4 max-w-full -mt-[650px]"
        id="main-content"
      >
        <div className="flex flex-wrap">
          <div className="lg:w-4/5 pr-4 pl-4 ms-auto p-6 overflow-hidden">
            <h3 className="mb-4 text-left font-semibold text-2xl">
              CẬP NHẬT THÔNG TIN NHÂN VIÊN
            </h3>
            <div className="relative flex flex-col h-auto min-w-0 rounded break-words bg-white border-1 border-gray-300 shadowc mb-12 overflow-y-auto">
              <div className="flex-auto p-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-1/2 px-2 mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tennhanvien"
                      >
                        Họ Và Tên
                      </label>
                      <input
                        type="text"
                        name="tennhanvien"
                        id="tennhanvien"
                        value={employee.tennhanvien || ""}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={employee.password || ""}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={employee.email || ""}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="phoneNumber"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={employee.phoneNumber || ""}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="w-1/2 px-2 mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="address"
                      >
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        value={employee.address || ""}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cập Nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CapNhatNV;
