import React from "react";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Question 1", "Question 2", "Question 3", "Question 4"],
  datasets: [
    {
      label: "# of Votes",
      data: [8, 10, 3, 5],
      backgroundColor: ["#C5CAE9", "#3F51B5", "#757575", "#009688"],
      borderWidth: 1,
    },
  ],
};

export function ChartCardMid() {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          title="Quiz Number 2"
          subheader="Latest Quiz Distribution"
        ></CardHeader>
        <PolarArea data={data} />
      </Card>
    </div>
  );
}
