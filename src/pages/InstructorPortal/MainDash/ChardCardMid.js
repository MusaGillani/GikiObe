import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

var cardStyle = {
  height: "38vw",
};

export const data = {
  labels: ["Question 1", "Question 2", "Question 3", "Question 4"],
  datasets: [
    {
      label: "Average Marks",
      data: [12, 13, 20, 4],
      backgroundColor: ["#C5CAE9", "#009688", "#3F51B5", "#757575"],
      borderColor: ["#C5CAE9", "#009688", "#3F51B5", "#757575"],
      borderWidth: 1,
      radius: 150,
    },
  ],
};

export function ChartCardMid() {
  return (
    <div>
      <Card elevation={1} style={cardStyle}>
        <CardHeader
          title="Mid Marks"
          subheader="Average of Each Question"
        ></CardHeader>
        <Pie data={data} />
      </Card>
    </div>
  );
}
