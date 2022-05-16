const prisma = require("../db/db");

exports.getInstructors = async (req, res, next) => {
  try {
    const intJson = await prisma.course_instructors.findMany({
      select: {
        full_name: true,
        instructor_id: true,
      },
    });

    let response = [];
    for (const obj of intJson) {
      response.push(`${obj.full_name} ${obj.instructor_id}`);
    }
    // console.log(response);
    res.send(JSON.stringify(response));
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
