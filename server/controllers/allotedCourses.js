const { response } = require("express");
const prisma = require("../db/db");
exports.allotCourse = async (req, res, next) => {
  try {
    const inst = req.params.inst;
    console.log(inst);
    const inst_id = await prisma.course_instructors.findFirst({
      select: {
        instructor_id: true,
      },
      where: {
        full_name: inst,
      },
    });

    const id_inst = inst_id.instructor_id;

    const courses = await prisma.course_allotments.findMany({
      select: {
        CourseCode: true,
      },
      where: {
        instructor_id: id_inst,
      },
    });

    // console.log(courses);

    let response = [];
    for (const obj of courses) {
      response.push(obj.CourseCode);
    }
    // console.log(response);
    res.send(JSON.stringify(response));
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
