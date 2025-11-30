// src/components/Graph.jsx
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function Graph({ xValues = [], yValues = [], title = "Simulation Output" }) {
  const data = {
    labels: xValues,
    datasets: [
      {
        label: title,
        data: yValues,
        borderWidth: 2,
        tension: 0.25,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      x: {
        title: { display: true, text: "X" }
      },
      y: {
        title: { display: true, text: "Y" }
      }
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "650px", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}
