import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CourseCard from "../DeanPortal/CourseCard";
import * as React from "react";
import { useParams } from "react-router-dom";

export default function InstMain(props) {
  const [courses, setCourses] = React.useState([]);
  let { id } = useParams();
  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/testing/getCourseDetail/6")
      .then((res) => res.json())
      .then((data) => {
        console.log(props.id.id);
        let instructors = [props.id.id];
        var filteredArray = data.filter(function (itm) {
          return instructors.indexOf(itm.instructor_id) > -1;
        });
        console.log();
        setCourses(filteredArray);
      });
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