import React from "react";
import { MdSchool } from "react-icons/md";

const AlgoNestLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon */}
      <MdSchool size={30} />
      {/* Brand Text */}
      <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-purple-700 tracking-wide">
        AlgoNest
      </h1>
    </div>
  );
};

export default AlgoNestLogo;
