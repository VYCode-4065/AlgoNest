import React from "react";
import BasicLineChart from "../components/LineChart";

const Dashboard = () => {
  return (
    <div className=" px-10 grid h-full">
      <div className="flex items-center gap-8">
        <div className="text-center  shadow-lg shadow-purple-400 p-3 rounded-lg">
          <h1 className="text-xl md:text-3xl font-bold  shadow-lg ">
            Total Sales
          </h1>
          <h2 className="font-bold text-lg md:text-2xl text-purple-600">5</h2>
        </div>
        <div className="text-center shadow-lg shadow-purple-400 p-3 rounded-lg">
          <h1 className="text-xl md:text-3xl font-bold shadow-lg ">
            Total Revenue
          </h1>
          <h2 className="font-bold text-lg md:text-2xl text-purple-600">25K</h2>
        </div>
      </div>
      <div className="my-auto">
        <BasicLineChart />
      </div>
    </div>
  );
};

export default Dashboard;
