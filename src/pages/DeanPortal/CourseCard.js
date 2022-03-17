import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import ButtonBase from "@material-ui/core/ButtonBase";
import CourseInfo from "./CourseInfo";
import { Button } from "@mui/material";

const styles = {};

const useStyles = makeStyles({
  test: {
    border: (course) => {
      if (course.code == "CS101") {
        return "1px solid red";
      }
    },
    cardAction: {
      display: "block",
      textAlign: "initial",
    },
  },
});

export default function CourseCard({ course }) {
  const classes = useStyles(course);
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <ButtonBase className={classes.cardAction} onClick={() => setFlag(true)}>
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
              {console.log(course)}
              {course.des}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
      {flag && <CourseInfo flag={flag} course={course} />}
    </div>
  );
}
