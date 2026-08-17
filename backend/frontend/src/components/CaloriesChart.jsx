import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CaloriesChart({ tracking }) {
  const data = {
    labels: tracking.map((item) => item.record_date),
    datasets: [
      {
        label: "Calories",
        data: tracking.map((item) => item.calories),
        borderColor: "#ff9800",
        backgroundColor: "#ffb74d",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default CaloriesChart;