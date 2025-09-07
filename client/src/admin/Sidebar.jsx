import React from "react";
import { Link } from "react-router-dom";
import { LuChartNoAxesCombined, LuFolder } from "react-icons/lu";
import { FaVideo } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-full bg-purple-400 py-10 px-3 space-y-5 border-r-2 border-r-neutral-800  dark:bg-slate-800 dark:text-slate-300 dark:border-r-slate-300">
      <Link
        to={""}
        className="flex items-center gap-2 text-white font-semibold shadow-md hover:shadow-gray-100 px-3 py-1 transition-all duration-300 rounded-full dark:border dark:border-slate-300"
      >
        <LuChartNoAxesCombined />
        <span>Dashboard</span>
      </Link>
      <Link
        to={"courses"}
        className="flex items-center gap-2 text-white font-semibold shadow-md hover:shadow-gray-100 px-3 py-1 transition-all duration-300 rounded-full  dark:border dark:border-slate-300"
      >
        <LuFolder />
        <span>Courses</span>
      </Link>
    </div>
  );
};

export default Sidebar;
