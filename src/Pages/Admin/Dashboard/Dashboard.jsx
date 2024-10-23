import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";

import React, { useContext } from "react";
import Cart from "./Cart";

import { FeeChart, transformFeeData } from './Chart';
import PendingFeesStudents from "../Migration/PendingFeeStudents";
import {AdminDataContext} from "../AdiminData";

Chart.register(CategoryScale);

function Dashboard() {
  const { cardDAta, feeCollection ,to, setTo,from, setFrom,minDate } = useContext(AdminDataContext);

  console.log(feeCollection, "feeCollection");

  // Safely access monthlyCollections
  const chartData = transformFeeData(feeCollection?.monthlyCollections || []);

console.log(chartData, "chartData")

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[35px] w-[98%]">
        {/* Left Column for Students List */}
        <div className="col-span-2">
<input className="mr-5" type="month" value={from} onChange={(e)=> setFrom(e.target.value)}/>
<input type="month" max={minDate} value={to} onChange={(e)=> setTo(e.target.value)}/>


        <FeeChart chartData={chartData} />
        </div>

        {/* Right Column for Another Students List or Other Info */}
        <div className="col-span-1">
          <PendingFeesStudents />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
