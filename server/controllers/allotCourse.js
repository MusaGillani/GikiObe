const prisma = require("../db/db");

exports.allotCourse = async (req, res, next) => {
  try {
    const inst = req.body.inst;
    const courseCode = req.body.courseCode;
    // console.log(courseCode);
    const inst_id = await prisma.course_instructors.findFirst({
      select: {
        instructor_id: true,
      },
      where: {
        full_name: inst,
      },
    });

    const id_inst = inst_id.instructor_id;
    console.log(id_inst);

    const a = await prisma.course_allotments.deleteMany({
      where: {
        instructor_id: id_inst,
      },
    });
    console.log(courseCode);
    for (const i of courseCode) {
      let obj = { CourseCode: i, instructor_id: id_inst };

      const abc = await prisma.course_allotments.create({
        data: obj,
      });
    }
    res.send("Sucess");
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
