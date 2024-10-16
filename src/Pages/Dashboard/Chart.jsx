// components/FeeChart.js
import React from 'react';
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
                  return '$' + value; // Display as currency
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

// Sample data for monthly fee collection
export const FeeData = [
  { month: 'January', feeCollected: 5000 },
  { month: 'February', feeCollected: 7000 },
  { month: 'March', feeCollected: 6500 },
  { month: 'April', feeCollected: 4800 },
  { month: 'May', feeCollected: 6000 },
  { month: 'June', feeCollected: 7500 },
  { month: 'July', feeCollected: 5000 },
  { month: 'August', feeCollected: 8200 },
  { month: 'September', feeCollected: 5600 },
  { month: 'October', feeCollected: 6800 },
  { month: 'November', feeCollected: 7400 },
  { month: 'December', feeCollected: 8000 }
];

// Transform FeeData to chart.js data format
export const transformFeeData = (data) => {
  return {
    labels: data.map((item) => item.month), // X-axis labels (Months)
    datasets: [
      {
        label: "Fee Collected",
        data: data.map((item) => item.feeCollected), // Y-axis values (Fees collected)
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  };
};