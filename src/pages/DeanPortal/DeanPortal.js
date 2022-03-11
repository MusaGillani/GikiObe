import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CourseCard from "./CourseCard";
import * as React from "react";
export default function DeanPortal() {
  const [courses, setCourses] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item key={course.code} xs={12} md={6} lg={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
