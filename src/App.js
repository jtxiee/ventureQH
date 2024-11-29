// import logo from './logo.svg';
import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./component/protect/protect";

import Home from "./component/home/home";
import Login from "./component/login/login";
import Register from "./component/register/register";
import Room from "./component/rooms/room";
import About from "./component/about/about";
import News from "./component/news/news";
import NewsDetail from "./component/news/NewsDetail";
import Contact from "./component/contact/contact";
import AdminLogin from "./admin/admin-service/admin-service";
import LoginManager from "./admin/service-manager/login-manager/login-manager";
import DashboardHotel from "./admin/service-manager/dashboard/dashboard-hotel";
import RoomManager from "./admin/service-manager/room/room";
import User from "./admin/service-manager/user.js/user";
import FeatureFacilities from "./admin/service-manager/feature-facilities/feature-facilities";
import DashboardAdminHotel from "./admin/admin-staff/dashboard-hotel/dashboard-hotel";
import Settings from "./admin/admin-staff/settings/settings";
import HomeTour from "./component/tours/home-tour";
import TourDetails from "./component/tour-details/tour-details";

import AdminLogin1 from "./admin/AdminLogin1"; // Đảm bảo đường dẫn đúng
import LoginNV from "./admin/NhanVienLogin"; // Đảm bảo đường dẫn đúng
//quản trị viên
import CreateNV from "./admin/admin-staff/Create-NV/create-nv";
import PhanCongNV from "./admin/admin-staff/PhanCong-NV/phancong-nv";
import QuanLyNV from "./admin/admin-staff/QuanLy-NV/quanly-nv";
import AdminChat from "./admin/admin-staff/Chat-Rt/AdminChat";
import AdminDashboard from "./admin/admin-staff/Chat-Rt/AdminDashboard";
// import ThongKe from "./admin/admin-staff/Thong-Ke/thongke";

// hướng dẫn viên
import DashboardHDV from "./admin/huongdanvien/dashboard/dashboard-hotel";
import CapNhatNV from "./admin/huongdanvien/CapNhatThongTin/cap-nhat";
import LichLam from "./admin/huongdanvien/LichLamViec/lich-lam";

// kiểm duyệt viên
import DashboardKDV from "./admin/kiemduyetvien/dashboard/dashboard-hotel";
import ChatRT from "./admin/kiemduyetvien/Chat/ChatRealtime";
import CapNhatNVKD from "./admin/kiemduyetvien/CapNhatThongTin/cap-nhat";

// nhân viên quản lý
import QuanLyTinTuc from "./admin/service-manager/QuanLy-TinTuc/quanly-tintuc";
// khach hang
// import CustomerChat from "./component/user/CustomerChat";

import CustomerChat1 from "./chat1/Chat";

import BookingTour from "./component/booking-tour/booking-tour";

import YourComponent from "./component/hoadon/hoadon";

// thong bao
import Success from "./component/thongbao/Success";
import Cancel from "./component/thongbao/Cancel";
// app.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<Section />} />
//       <Route path="login" element={<Login />} />
//       {/* <Section /> */}
//     </Routes>
//   </BrowserRouter>
// )

function App() {
  return (
    <div className="App">
      <div className="content-wrapper max-w-screen-2xl text-base mx-auto">
        {/* <Header /> */}
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/room" element={<Room />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-service" element={<AdminLogin />} />
            <Route path="/login-manager" element={<LoginManager />} />
            <Route path="/dashboard-hotel" element={<DashboardHotel />} />
            <Route path="/room-manager" element={<RoomManager />} />
            <Route path="/user" element={<User />} />
            <Route
              path="/features-facilities"
              element={<FeatureFacilities />}
            />
            <Route path="/booking-tour/:id" element={<BookingTour />} />
            <Route
              path="/dashboard-admin-hotel"
              element={<DashboardAdminHotel />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tours" element={<HomeTour />} />
            <Route path="/tour-details/:id" element={<TourDetails />} />

            <Route path="/admin-login1" element={<AdminLogin1 />} />
            <Route path="/login-nv" element={<LoginNV />} />
            {/* Quản trị viên */}
            {/* <Route path="/create-nv" element={<CreateNV />} /> */}
            <Route
              path="/create-nv"
              element={<ProtectedRoute element={<CreateNV />} />}
            />
            <Route
              path="/phancong-nv"
              element={<ProtectedRoute element={<PhanCongNV />} />}
            />
            <Route path="/quanly-nv" element={<QuanLyNV />} />
            {/* <Route path="/admin-chat" element={<AdminChat />} /> */}
            <Route
              path="/admin-chat"
              element={<ProtectedRoute element={<AdminChat />} />}
            />
            <Route
              path="/admin-chat/:selectedCustomerId"
              element={<ProtectedRoute element={<AdminChat />} />}
            />
            <Route
              path="/admin-dashboard/*"
              element={<ProtectedRoute element={<AdminDashboard />} />}
            />
            {/* Hướng dẫn viên */}
            <Route
              path="/dashboard-huong-dan-vien"
              element={<DashboardHDV />}
            />
            <Route path="/cap-nhat" element={<CapNhatNV />} />
            <Route path="/lich-lam" element={<LichLam />} />
            {/* kiểm duyệt viên */}
            <Route
              path="/dashboard-kiem-duyet-vien"
              element={<DashboardKDV />}
            />
            <Route path="/chat-real-time" element={<ChatRT />} />
            <Route path="/cap-nhat-kd" element={<CapNhatNVKD />} />

            {/* nhân viên quản lý */}
            <Route path="/quanly-tintuc" element={<QuanLyTinTuc />} />

            {/* khach hang */}
            <Route path="/chat-kh1" element={<CustomerChat1 />} />

            <Route path="/hoa-don" element={<YourComponent />} />

            {/* <Route path="/thong-ke" element={<ThongKe />} /> */}

            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            {/* <Section /> */}
          </Routes>
        </BrowserRouter>

        {/* <Footer /> */}
      </div>
    </div>
  );
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Quay về đầu trang khi đường dẫn thay đổi

  return null;
};

export default App;
