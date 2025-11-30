// src/components/Graph.jsx
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export default function Graph({ xValues, yValues, title }) {
  const data = {
    labels: xValues,
    datasets: [
      {
        label: title || "Simulation Output",
        data: yValues,
        borderWidth: 2,
        tension: 0.25,
        borderColor: "rgb(75, 192, 192)",
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
      x: { title: { display: true, text: "X" } },
      y: { title: { display: true, text: "Y" } }
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}
