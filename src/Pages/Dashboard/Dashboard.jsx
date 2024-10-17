import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";

import React, { useContext } from "react";
import Cart from "./Cart";
import { DataContext } from "../../Store/store";
import StudentsList from "./StudentsList";
// import { Data } from "./Data";
import { FeeChart, transformFeeData, FeeData } from './Chart';

Chart.register(CategoryScale);

function Dashboard() {
  const { cardDAta, institutes } = useContext(DataContext);

  const chartData = transformFeeData(FeeData);
// console.log(institutes, "institutes")

  return (
    <div className="container px-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Card Data */}
      <div className="flex flex-wrap py-5 pb-3">
        {cardDAta.map((items, index) => (
          <div key={index} className="w-full md:w-1/3 mb-7">
            <Cart
              title={items.title}
              descriptioin={items.descriptioin}
              bgColor={items.bgColor}
              icon={items.icon}
            />
          </div>
        ))}
      </div>

      {/* Grid Layout for StudentsList */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px] w-[96%]">
        {/* Left Column for Students List */}
        <div className="col-span-2">
        <FeeChart chartData={chartData} />
        </div>

        {/* Right Column for Another Students List or Other Info */}
        <div className="col-span-1">
          <StudentsList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
