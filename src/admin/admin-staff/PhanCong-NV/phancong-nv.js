import React, { useEffect, useState } from "react";
import HeaderAdmin from "../header-admin/header-admin";
import { toast } from "react-toastify";

function PhanCongNV() {
  const [employees, setEmployees] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedDate, setSelectedDate] = useState(""); // Lưu ngày được chọn
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch dữ liệu nhân viên
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost/api-dulich-main/api-dulich/api/Admin/get_dsnv.php"
      );
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Cập nhật lịch làm việc của nhân viên
  const handleScheduleChange = (employeeId, shift, checked) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [employeeId]: {
        ...prevSchedule[employeeId],
        [shift]: checked,
      },
    }));
  };

  // Xử lý phân công lịch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost/api-dulich-main/api-dulich/api/Admin/assign_schedule.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ schedule, selectedDate }),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        toast.success("Lịch làm việc đã được phân công thành công");
        setSchedule({});
        setSelectedDate("");
        fetchData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error assigning schedule:", err);
      toast.error("Phân công lịch làm việc thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gray-100 w-full">
      <HeaderAdmin />
      <div className="container mx-auto sm:px-4 max-w-full -mt-[650px]">
        <div className="flex flex-wrap">
          <div className="lg:w-4/5 pr-4 pl-4 ms-auto p-6 overflow-hidden">
            <h3 className="mb-4 text-left font-semibold text-2xl">
              PHÂN CÔNG LỊCH LÀM VIỆC
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="relative flex flex-col h-[500px] min-w-0 rounded break-words bg-white border-1 border-gray-300 shadowc mb-12 overflow-y-auto">
                <div className="flex-auto p-4">
                  <div className="block w-full overflow-auto scrolling-touch">
                    {/* Input cho chọn ngày */}
                    <div className="mb-4">
                      <label
                        htmlFor="date"
                        className="block text-lg font-semibold"
                      >
                        Chọn ngày phân công:
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>

                    <table className="w-full max-w-full mb-4 bg-transparent table-hover border text-center text-sm">
                      <thead>
                        <tr className="bg-gray-900 text-gray-100 h-9">
                          <th scope="col">MANV</th>
                          <th scope="col">Tên nhân viên</th>
                          <th scope="col">Sáng</th>
                          <th scope="col">Trưa</th>
                          <th scope="col">Chiều</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee) => (
                          <tr className="h-16 border-b-2" key={employee.id}>
                            <td>{employee.username}</td>
                            <td>{employee.tennhanvien}</td>
                            {["Sáng", "Trưa", "Chiều"].map((shift) => (
                              <td key={shift}>
                                <input
                                  type="checkbox"
                                  checked={
                                    schedule[employee.id]?.[shift] || false
                                  }
                                  onChange={(e) =>
                                    handleScheduleChange(
                                      employee.id,
                                      shift,
                                      e.target.checked
                                    )
                                  }
                                  className="form-checkbox h-5 w-5 text-blue-600"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Phân công"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhanCongNV;
