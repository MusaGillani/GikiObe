const prisma = require("../db/db");

exports.getCLO = async (req, res, next) => {
  try {

    const count = await prisma.course_clos.groupBy({
      by: ['CourseCode'],
      _count: {CourseCode: true}
    });

    // console.log(count);

    const clo = await prisma.course_clos.findMany();

    console.log(clo);
    for (const obj of clo) {
      const course = await prisma.schemeofstudy.findFirst({
        select: {
          CourseTitle: true,
        },
        where: {
          CourseCode: obj.CourseCode,
        },
      });
      console.log(course);
    }

    const response = [
      {
        Name: '',
        Code: '',
        CLO: '',
      },
    ];


    res.send(clo);




  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
};