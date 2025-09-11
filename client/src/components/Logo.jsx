import React from "react";
import { MdSchool } from "react-icons/md";

const AlgoNestLogo = ({ textColor }) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon */}
      <MdSchool size={30} />
      {/* Brand Text */}
      <h1
        className={`text-lg md:text-xl lg:text-2xl font-extrabold text-purple-500 dark:text-[#EB3678] tracking-wide`}
      >
        AlgoNest
      </h1>
    </div>
  );
};

export default AlgoNestLogo;
