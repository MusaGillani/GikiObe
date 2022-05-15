const { response } = require("express");
const prisma = require("../db/db");

// const obj = {
//     "courseTitle": "Programming",
//     "courseCode": "CS101",
//     "CLOs": ["ABC", "DEF"],
//     "PLOs": ["1", "2"],
//     "threshold": ["0.3", "0.4"]
// }

exports.addCourse = async (req, res, next) => {
  try {
    const courseTitle = req.body.courseTitle;
    const courseCode = req.body.courseCode;
    const CLOs = req.body.CLOs;
    const threshold = req.body.threshold;
    const PLOs = req.body.PLOs;

    console.log(threshold);

    for (let i = 0; i < CLOs.length; i++) {
      let temp = {
        CourseCode: courseCode,
        clo_num: i + 1,
        clo_desc: CLOs[i],
        mapped_on_plo: parseInt(PLOs[i]),
        weightage: parseFloat(threshold[i]),
      };
      const abc = await prisma.course_clos.create({
        data: temp,
      });
    }
    res.send("Sucess");
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
