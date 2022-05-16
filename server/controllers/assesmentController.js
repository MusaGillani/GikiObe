const prisma = require("../db/db");
exports.addQuizAssessment = async (req, res, next) => {
  try {
    console.log(req.body);
    const registrain_numbers = req.body.reg_no;
    const marks_obtained = req.body.marks_obtained;
    let clo = parseInt(req.body.mapped_on_clo.split(":")[0].split(" ")[1]);
    console.log(clo);
    let totalMarks = parseFloat(req.body.total_marks);
    let threshold = [];

    for (let i = 0; i < marks_obtained.length; i++) {
      let a =
        (marks_obtained[i] / totalMarks) * parseFloat(req.body.clo_threshold);
      threshold.push(a);
    }

    for (let i = 0; i < marks_obtained.length; i++) {
      let temp = {
        course_code: req.body.course_code,
        reg_no: parseInt(registrain_numbers[i]),
        assessment_type: req.body.assessment_type,
        serial_no: parseInt(req.body.serial_no),
        question_no: 1,
        marks_obtained: parseFloat(marks_obtained[i]),
        total_marks: parseFloat(req.body.total_marks),
        mapped_on_clo: clo,
        clo_threshold: parseFloat(req.body.clo_threshold),
        obtained_clo_threshold: threshold[i],
      };
      const abc = await prisma.assessments.create({
        data: temp,
      });
    }
    res.send("Sucess");
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};

exports.addFinalMidP = async (req, res, next) => {
  try {
    // console.log(req.body);
    let numberQuestion = req.body.mapped_on_clo.length;
    const courseCode = req.body.course_code;
    var threshold_ = [];
    var clo_ = [];

    var i = 0;
    for (i = 0; i < req.body.obtained_marks.length; ) {
      for (let j = 0; j < numberQuestion; j++) {
        var abc =
          (req.body.obtained_marks[i] / req.body.total_marks[j]) *
          req.body.clo_threshold[j];
        threshold_.push(abc);
        i = i + 1;
      }
    }
    // console.log(req.body);
    var l = 0;
    var m = 0;
    for (let k = 0; k < req.body.obtained_marks.length; k++) {
      let temp = {
        course_code: req.body.course_code,
        reg_no: parseInt(req.body.registration_numbers[l]),
        assessment_type: req.body.assessment_type,
        serial_no: 1,
        question_no: k + 1,
        marks_obtained: parseFloat(req.body.obtained_marks[k]),
        total_marks: parseFloat(req.body.total_marks[m]),
        mapped_on_clo: parseInt(
          req.body.mapped_on_clo[m].split(":")[0].split(" ")[1]
        ),
        clo_threshold: parseFloat(req.body.clo_threshold[m]),
        obtained_clo_threshold: threshold_[k],
      };

      if ((k + 1) % req.body.total_marks.length == 0) l = l + 1;

      if ((k + 1) % req.body.total_marks.length == 0) m = 0;
      else m = m + 1;

      const abc = await prisma.assessments.create({
        data: temp,
      });
    }
    res.send("Success");
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
