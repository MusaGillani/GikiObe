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
  scales: {
    yAxes: {
      title: {
        display: true,
        text: "no of students",
        font: {
          size: 15,
        },
      },
      ticks: {
        precision: 0,
      },
    },
    xAxes: {
      title: {
        display: true,
        text: "Degree PLOs",
        font: {
          size: 15,
        },
      },
    },
  },
};

const labels = [
  "PLO1",
  "PLO2",
  "PLO3",
  "PLO4",
  "PLO5",
  "PLO6",
  "PLO7",
  "PLO8",
  "PLO9",
  "PLO10",
  "PLO11",
  "PLO12",
];

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

export default function ChartCardPLO() {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader title="Analysis on PLOs" subheader="Bar Graph"></CardHeader>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
}
