import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "@faker-js/faker";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["CLO1", "CLO2", "CLO3", "CLO4", "CLO5"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 40 })),
      backgroundColor: "#C5CAE9",
    },
  ],
};

export default function ChartCardCLO() {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          title="Analysis on CLOs"
          subheader="Full Stack Web Development"
        ></CardHeader>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
}
