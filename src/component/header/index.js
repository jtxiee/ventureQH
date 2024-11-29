import "./header.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

function toggleDropdown() {
  var dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("hidden");
}

function toggleDropdownService() {
  var dropdown = document.getElementById("dropdownService");
  dropdown.classList.toggle("hidden");
}

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <header className="">
      <div className="flex w-full bg-[rgba(28,41,48,1)] h-10">
        <div className="travel-header-contact flex w-[10%] justify-between pl-8 items-center">
          <div className="header-contact-facebook basis-1/3">
            <a href="https://www.facebook.com/">
              <i className="fa-brands fa-facebook text-[rgba(255,255,255,1.00)]"></i>
            </a>
          </div>

          <div className="header-contact-zalo basis-1/3">
            <a href="https://www.facebook.com/">
              <i className="fa-brands fa-twitter text-[rgba(255,255,255,1.00)]"></i>
            </a>
          </div>

          <div className="header-contact-zalo basis-1/3">
            <a href="https://www.facebook.com/">
              <i className="fa-brands fa-instagram text-[rgba(255,255,255,1.00)]"></i>
            </a>
          </div>
        </div>

        <div className="w-[60%]"></div>

        <div className="travel-header-user justify-center flex w-[30%]">
          {!isLoggedIn ? (
            <>
              <div className="travel-header-register flex items-center mx-2 text-[rgba(255,255,255,1.00)]">
                <i className="fa-solid fa-user mx-2"></i>
                <div className="font-medium">
                  <Link to={"/register"}>Đăng ký</Link>
                </div>
              </div>

              <div className="travel-header-login flex items-center mx-2 text-[rgba(255,255,255,1.00)]">
                <i className="fa-solid fa-right-to-bracket mx-2"></i>
                <div className="font-medium">
                  <Link to={"/login"}>Đăng nhập</Link>
                </div>
              </div>
            </>
          ) : (
            <div className="travel-header-dashboard flex items-center mx-2 text-[rgba(255,255,255,1.00)]">
              <img
                src={`http://localhost/api-dulich-main/api-dulich/api/Images/cred/${user.profile}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mx-2"
              />
              <div className="">
                <div className="relative cursor-pointer font-medium">
                  <button onClick={toggleDropdown}>Tài khoản</button>
                </div>
                <div
                  id="dropdownMenu"
                  className="z-20 w-[200px] -ml-24 mr-9 hidden absolute bg-[rgba(28,41,48,1)] px-7 py-3 mt-3 rounded-2xl"
                >
                  <ul className="travel-header-dashboard-item text-[rgba(255,255,255,1.00)]">
                    <li>
                      <div className="flex items-center my-1">
                        <i className="fa-regular fa-user mx-2"></i>
                        <a href="https://www.facebook.com/">My Profile</a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center my-1">
                        <i className="fa-solid fa-bell mx-2"></i>
                        <Link to="/chat-kh">Notifications</Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center my-1">
                        <i className="fa-solid fa-bell mx-2"></i>
                        <Link to="/chat-kh1">Trò Chuyện</Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center my-1">
                        <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                        <button onClick={handleLogout}>Log Out</button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <nav className="flex flex-row justify-between items-center py-6 mx-10">
        <div className="logo basis-2/6 text-center text-xl font-semibold cursor-pointer">
          <Link to={"/"}>TravelVN.</Link>
        </div>
        <ul className="tqd-top-menu text-sm lg:basis-3/6 font-medium hidden lg:flex lg:items-center lg:justify-center lg:gap-8 text-gray-600 uppercase">
          <li className="ct-top-menu-item">
            <Link to={"/"}>Trang chủ</Link>
          </li>
          <li className="ct-top-menu-item">
            <Link to={"/about"}>Giới thiệu</Link>
          </li>
          <li className="ct-top-menu-item">
            <div className="relative">
              <button className="uppercase" onClick={toggleDropdownService}>
                dịch vụ
              </button>
            </div>
            <div
              id="dropdownService"
              className="z-20 w-[200px] -ml-16 mr-9 hidden absolute bg-[rgba(28,41,48,1)] px-7 py-3 mt-3 rounded-2xl"
            >
              <ul className="travel-header-dashboard-item text-[rgba(255,255,255,1.00)]">
                <li>
                  <div className="flex items-center my-3">
                    <i className="fa-regular fa-user mx-2"></i>
                    <Link to={"/room"}>Khách sạn</Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center my-1">
                    <i className="fa-solid fa-bell mx-2"></i>
                    <Link to={"/tours"}>Tours</Link>
                  </div>
                </li>
              </ul>
            </div>
          </li>
          <li className="ct-top-menu-item">
            <a href="https://www.facebook.com/">Thuê xe</a>
          </li>
          <li className="ct-top-menu-item">
            <Link to={"/contact"}>Liên hệ</Link>
          </li>
          <li className="ct-top-menu-item">
            <Link to={"/news"}>Tin Tức</Link>
          </li>
        </ul>
        <div className="tqd-top-menu-icon lg:hidden basis-1/6 flex items-center px-2 sm:px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>
    </header>
  );
}

export default Header;
