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
  scales: {
    yAxes: {
      title: {
        display: true,
        text: "Cummulative PLO Average",
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
        text: "PLOs",
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
      data: labels.map(() => faker.datatype.number({ min: 0, max: 22 })),
      borderColor: "#C5CAE9",
      backgroundColor: "#3F51B5",
    },
  ],
};

export default function ChartCardPLODean(props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: props.values,
        borderColor: "#C5CAE9",
        backgroundColor: "#3F51B5",
      },
    ],
  };

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          title={`PLO Progress of Batch ${props.batch}`}
          subheader="Line Graph show batch progress"
        ></CardHeader>
        <Line options={options} data={data} />
      </Card>
    </div>
  );
}
