import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const useStyles = makeStyles({
  test: {
    border: (course) => {
      if (course.code == "CS101") {
        return "1px solid red";
      }
    },
  },
});

export default function CourseCard({ course }) {
  const classes = useStyles(course);
  return (
    <div>
      <Card elevation={1} className={classes.test}>
        <CardHeader
          action={
            <IconButton onClick={() => console.log("delete", course.title)}>
              <DeleteOutline />
            </IconButton>
          }
          title={course.title}
          subheader={course.code}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            CLO1: {course.CLO1}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            CLO2: {course.CLO2}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            CLO3: {course.CLO3}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
