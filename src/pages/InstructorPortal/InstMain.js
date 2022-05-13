import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CourseCard from "../DeanPortal/CourseCard";
import * as React from "react";

const courseInfo = [
  {
    title: "Database Management Systems",
    code: "CE431",
    des: "This course covers database design and the use of databases in real-world settings, with an introduction to the internals of relational database engines. It includes extensive coverage of the relational model, relational algebra, and SQL. The course also features database design and relational design principles based on dependencies and normal forms. Many additional key database topics from the design and application-building perspective are also covered, including indexes, views, transactions, and integrity constraints. There will be a programming project in the course, which explores database design and management in platform of the student’s choice (Web/Desktop/Mobile) by utilizing appropriate features of SQL.",
    CLO1: "Understand the terminology, features, classifications, and characteristics embodied in database systems",
    CLO2: "Analyze an information storage problem and derive an information model expressed in the form of an entity relation diagram and design an efficient logical and physical database design.",
    CLO3: "Design and implement relational database system, using one or more programming languages and an open-source database management system.",
    PLO1: ["CLO1", "40%"],
    PLO2: ["CLO2", "40%"],
    PLO3: ["CLO3", "40%"],
  },
  {
    title: "Full Stack Web Development",
    code: "CE433",
    des: "This course is designed to serve as a pathway to building blocks of web development starting with introduction to basics of Web and the corresponding technologies involved in design, development, and management of a modern Web Application. Following the basics, the course then focuses on building blocks of web application development i.e.  an introduction to HTML, CSS, and JavaScript. Having grip on fundamentals the course moves to advance concepts of JavaScript like prototyping, asynchronous program execution, ES6 standard. The course then discusses Bootstrap Framework that is essential to building responsive web applications. Owing to the market trend the course shall discuss latest approaches and trends in the field of web development, and shall also introduce the students to modern web communication strategies (such as REST, GraphQL) and service oriented architecture. And finally, the course dives into Full Stack Web Development consisting of a detailed view into a frontend framework, backend framework, and a NoSQL Database.",
    CLO1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CLO2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CLO3: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    PLO1: ["CLO1", "40%"],
    PLO2: ["CLO2", "40%"],
    PLO3: ["CLO3", "40%"],
  },
];

export default function InstMain() {
  const [courses, setCourses] = React.useState(courseInfo);
  // React.useEffect(() => {
  //   fetch("http://localhost:5000/courses")
  //     .then((res) => res.json())
  //     .then((data) => setCourses(data));
  // }, []);
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
