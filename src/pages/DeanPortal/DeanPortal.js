import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CourseCard from "./CourseCard";
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
    title: "Introduction to Programming",
    code: "CS102",
    des: "This course introduces computer concepts, including fundamental functions and operations of the computer. Topics include identification of hardware components, basic computer operations, security issues, and use of software applications. Upon completion, students should be able to demonstrate an understanding of the role and function of computers and use the computer to solve problems.This course is for people who have never touched a computer, though computer users will learn many new things too. This course (or equivalent experience) is prerequisite to the other computer courses listed below",
    CLO1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CLO2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CLO3: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
  {
    title: "Software Engineering",
    code: "CS104",
    des: "Customers expect reliable and easy to use software to be developed within a set budget and to a tight deadline. Increasing size and complexity of software, together with more demanding users, means the consequences of failure are increasingly severe. Programming is only one of a range of activities necessary for the development of software, which is a challenging process that meets customer needs. The rest of the activities are: planning and acquiring resources for the project; investigating the business and technical contexts for the system; eliciting and documenting user requirements; creating a design for the system; and integrating, verifying and deploying the completed components. This course provides with an understanding of the major challenges inherent in real software development, and with some of the tools and techniques that can be used in their attainment.",
    CLO1: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CLO2: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    CLO3: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    PLO1: ["CLO1", "40%"],
    PLO2: ["CLO2", "40%"],
    PLO3: ["CLO3", "40%"],
  },
];

export default function DeanPortal() {
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
