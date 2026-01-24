import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
);

function BarChart({ data }) {
  const options = {
    responsive: true,
    plugins:{
        legend:{
            display: false
        }
    },
      scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
    //   grid: {
    //     display: false,
    //   },
      ticks:{
        stepSize : 1,
        precision : 0
      }
    },
  },
  };
  const barChartData = {
    labels: [
      "Pending",
      "In Progress",
      "Completed",
    ],
    datasets: [
      {
        label: "No of Tasks:",
        data: [data.pendingTasks, data.inProgressTasks, data.completedTasks],
        backgroundColor:["rgba(248, 244, 2, 0.7)", "rgba(0, 0, 255, 0.7)", "rgb(0, 128, 0, 0.7)"],
        borderColor: "rgb(75, 192, 192)",
        borderRadius: 20
      },
    ],
  };
  // console.log(data);

  return (
    <>
      <Bar options={options} data={barChartData} />
    </>
  );
}

export default BarChart;
