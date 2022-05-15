const prisma = require("../db/db");
exports.getCourseCLOs = async (req, res, next) => {
  try {
    const course = req.params.course;

    const courseCloJson = await prisma.course_clos.findMany({
      select: {
        clo_num: true,
        clo_desc: true,
      },
      where: {
        CourseCode: course,
      },
    });

    console.log(courseCloJson);

    let response = [];
    for (let i = 0; i < courseCloJson.length; i = i + 1) {
      response.push(
        `CLO ${courseCloJson[i].clo_num}: ${courseCloJson[i].clo_desc}`
      );
    }
    res.send(response);
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
