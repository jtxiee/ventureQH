import Header from "../header";
import Footer from "../footer/footer";

import React from "react";
// import ReactDOM from 'react-dom';
// import ProductList from "../api/room";
// import RoomList from "../ajax/roomlist";
import HotelRooms from "../ajax/roomlist";

function Room() {
  return (
    <div className="Travel-room">
      {/* <div className="content-wrapper max-w-screen-2xl text-base mx-auto"> */}
      <Header />
      <div className="container mx-auto sm:px-4 max-w-full bg-gray-100">
        <div className="">
          {/* Our Room  */}
          <div className="py-10 px-4">
            <h2 className="font-semibold text-2xl text-center">KHÁCH SẠN</h2>
            <div className="h-[2px] w-[150px] my-2 mx-auto bg-gray-900" />
          </div>
          <div className="flex">
            <div className="lg:w-1/4 md:w-full pr-4 pl-4 lg:mb-0 mb-4 ps-4">
              <nav className="relative flex flex-wrap items-center content-between py-3 px-4  text-black bg-white rounded shadow">
                <div className="container max-w-full mx-auto sm:px-4 lg:flex-col items-stretch">
                  <h4 className="mt-2 font-semibold text-left text-xl uppercase">
                    Tìm kiếm
                  </h4>
                  {/* <button className="py-1 px-2 text-md leading-normal bg-transparent border border-transparent rounded" type="button" data-bs-toggle="collapse" data-bs-target="#filterDropdown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="px-5 py-1 border border-gray-600 rounded" />
                                        </button> */}
                  <div
                    className="flex-grow items-center flex-col mt-2"
                    id="filterDropdown"
                  >
                    {/* check availablity */}
                    <div className="border bg-gray-100 p-6 rounded mb-3">
                      <h5 className="flex items-center justify-between mb-3">
                        <span className="uppercase">Kiểm tra ngày đặt</span>
                        <button
                          id="chk_avail_btn"
                          className="align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline shadow-none py-1 px-2 leading-tight text-xs  text-gray-600 hidden"
                        >
                          Reset
                        </button>
                      </h5>
                      <div className="text-left">Ngày nhận phòng</div>
                      <input
                        type="date"
                        className="block appearance-none w-full py-1 px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded shadow-none mb-3"
                        defaultValue="<?php echo $checkin_default ?>"
                        id="checkin"
                      />
                      <div className="form-label text-left">Ngày trả phòng</div>
                      <input
                        type="date"
                        className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded shadow-none"
                        id="checkout"
                      />
                    </div>
                    {/* Facilities  */}
                    <div className="border bg-gray-100 p-6 rounded mb-3">
                      <h5
                        className="flex items-center justify-between mb-3"
                        style={{ fontSize: 18 }}
                      >
                        <span>Địa điểm</span>
                        <button
                          id="facilities_btn"
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline shadow-none py-1 px-2 leading-tight text-xs  text-gray-600"
                        >
                          Reset
                        </button>
                      </h5>
                    </div>
                    {/* Guests  */}
                    <div className="border bg-gray-100 p-6 rounded mb-3">
                      <h5
                        className="flex items-center justify-between mb-3"
                        style={{ fontSize: 18 }}
                      >
                        <span>KHÁCH</span>
                        <button
                          id="guests_btn"
                          className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded  no-underline shadow-none py-1 px-2 leading-tight text-xs  text-gray-600"
                        >
                          Reset
                        </button>
                      </h5>
                      <div className="flex">
                        <div className="me-3">
                          <label className="form-label ">Người lớn</label>
                          <input
                            type="number"
                            min={1}
                            id="adults"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded shadow-none"
                          />
                        </div>
                        <div>
                          <label className="form-label ">Trẻ em</label>
                          <input
                            type="number"
                            min={1}
                            id="children"
                            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded shadow-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
            <div className="lg:w-3/4 md:w-full pr-4 pl-4 px-4" id="rooms-data">
              <HotelRooms />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* </div> */}
    </div>
  );
}
// ReactDOM.render(<Room />, document.getElementById('root'));
export default Room;
