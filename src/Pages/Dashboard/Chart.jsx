// components/FeeChart.js
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';

export const FeeChart = ({ chartData }) => {

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Monthly Fee Collection</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Fee Collection (Monthly)"
            },
            legend: {
              display: false // No need for a legend if showing one dataset
            }
          },
          scales: {
            y: {
              beginAtZero: true, // Start the Y-axis at zero
              ticks: {
                callback: function(value) {
                  return '₹' + value; // Display as currency
                }
              }
            }
          }
        }}
        style={{ width: '95%', height: '400px' }}
      />
    </div>
  );
};

export const transformFeeData = (data) => {
  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Data is not an array", data);
    return {
      labels: [],
      datasets: [],
    };
  }

  return {
    labels: data.map((item) => item._id), // Use _id as the month
    datasets: [
      {
        label: "Fee Collected",
        data: data.map((item) => item.monthly_fee_collected), // Y-axis values
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Customize bar color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
};
