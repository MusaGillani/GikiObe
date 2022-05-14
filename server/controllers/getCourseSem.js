const prisma = require("../db/db");

exports.getCourse = async (req, res, next) => {
  try {
    const sem = req.params.sem;

    const courseJson = await prisma.schemeofstudy.findMany({
      select: {
        CourseTitle: true,
        CourseCode: true,
      },
      where: {
        Semester: sem,
      },
    });
    // console.log(courseJson);
    let response = [];
    for (const obj of courseJson) {
      const courseAllot = await prisma.course_allotments.findMany({
        select: {
          CourseCode: true,
        },
        where: {
          CourseCode: obj.CourseCode,
        },
      });
      // console.log(courseAllot);
      if (courseAllot.length == 0)
        response.push(obj.CourseTitle + " " + obj.CourseCode);
    }
    // console.log(response);
    res.send(JSON.stringify(response));
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
