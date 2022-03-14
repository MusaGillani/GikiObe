import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

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
import faker from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = Array.from({ length: 38 }, (_, index) => index + 1);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 22 })),
      borderColor: "#C5CAE9",
      backgroundColor: "#3F51B5",
    },
  ],
};

export function ChartCardLatest() {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          title="Quiz Number 2"
          subheader="Latest Quiz Distribution"
        ></CardHeader>
        <Line options={options} data={data} />
      </Card>
    </div>
  );
}
