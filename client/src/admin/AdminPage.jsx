import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminPage = () => {
  return (
    <div className="container  grid lg:grid-cols-4 bg-purple-100 h-[91vh]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full lg:col-span-3 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
