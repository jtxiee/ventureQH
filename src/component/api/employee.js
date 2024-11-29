// import { Component } from "react";
import axios from "axios";
// import React, { useEffect, useState } from 'react';
import config from "../config.json";

const { SERVER_API } = config;

// Tạo instance của Axios
const api = axios.create({
  baseURL: `${SERVER_API}`,
  timeout: 10000, // Thời gian chờ 10 giây
  headers: { "Content-Type": "application/json" },
});

// api lấy toàn bộ thông tin tài khoản người dùng
export const selectAllEmployees = () => {
  return api.get(`/admin/get_dsnv.php`);
};
