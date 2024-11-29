import React, { useEffect, useState } from "react";
import HeaderAdmin from "../header-admin/header-admin";
import { toast } from "react-toastify";

function LichLam() {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const fetchSchedule = async () => {
    try {
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      const response = await fetch(
        `http://localhost/api-dulich-main/api-dulich/api/Admin/get_schedule.php?id=${userId}`
      );

      if (!response.ok) {
        throw new Error("Không thể tải dữ liệu từ API");
      }

      const data = await response.json();
      console.log("Fetched schedules:", data);
      setSchedules(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching schedule:", err);
      setError(err.message || "Đã xảy ra lỗi không xác định");
      toast.error("Không thể tải lịch làm việc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleDateFilter = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredSchedules = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.date);
    const start = dateRange.startDate ? new Date(dateRange.startDate) : null;
    const end = dateRange.endDate ? new Date(dateRange.endDate) : null;

    if (!start && !end) return true;
    if (start && !end) {
      return scheduleDate >= start;
    }
    if (!start && end) {
      return scheduleDate <= end;
    }
    return scheduleDate >= start && scheduleDate <= end;
  });

  return (
    <div className="bg-gray-100 w-full">
      <HeaderAdmin />
      <div className="container mx-auto sm:px-4 max-w-full -mt-[650px]">
        <div className="flex flex-wrap">
          <div className="lg:w-4/5 pr-4 pl-4 ms-auto p-6 overflow-hidden">
            <h3 className="mb-4 text-left font-semibold text-2xl">
              LỊCH LÀM VIỆC CỦA TÔI
            </h3>
            <div className="relative flex flex-col min-w-0 rounded break-words bg-white border-1 border-gray-300 shadow mb-12">
              <div className="flex-auto p-4">
                <div className="mb-4 flex gap-4">
                  <input
                    type="date"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateFilter}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateFilter}
                    className="border rounded px-2 py-1"
                  />
                </div>

                {loading ? (
                  <p>Đang tải...</p>
                ) : error ? (
                  <p className="text-red-500">Có lỗi xảy ra: {error}</p>
                ) : filteredSchedules.length === 0 ? (
                  <p className="text-gray-500">
                    Không có lịch làm việc phù hợp.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {filteredSchedules.map((schedule, index) => {
                      const formattedDate = new Date(
                        schedule.date
                      ).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      });
                      return (
                        <div
                          key={index}
                          className="p-4 border rounded bg-white shadow-md"
                        >
                          <h4 className="text-lg font-semibold text-blue-600">
                            Ngày: {formattedDate}
                          </h4>
                          <p className="mt-2 text-gray-700">
                            Ca: {schedule.shift}
                          </p>
                          {/* <p className="mt-2 text-gray-700">
                            Trạng thái: {schedule.value ? "Làm việc" : "Nghỉ"}
                          </p> */}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LichLam;
