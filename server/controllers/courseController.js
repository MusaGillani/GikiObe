const { response } = require("express");
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
    let coursesResponse = [];
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
        coursesResponse.push(obj.CourseTitle + " " + obj.CourseCode);
    }
    // console.log(coursesResponse);
    res.send(JSON.stringify(coursesResponse));
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};

exports.getDetailCourse = async (req, res, next) => {
  try {
    const sem = req.params.sem;

    const courseJson = await prisma.schemeofstudy.findMany({
      select: {
        CourseTitle: true,
        CourseCode: true,
        course_description: true,
      },
      where: {
        Semester: sem,
      },
    });
    // console.log(courseJson);

    var abc = [];

    for (const obj of courseJson) {
      let response = {};

      const courseAllot = await prisma.course_allotments.findMany({
        select: {
          CourseCode: true,
          instructor_id: true,
        },
        where: {
          CourseCode: obj.CourseCode,
        },
      });

      //console.log(courseAllot);

      if (courseAllot.length != 0) {
        response["instructor"] = courseAllot[0].instructor_id;

        const inst_name = await prisma.course_instructors.findUnique({
          select: {
            full_name: true,
          },
          where: {
            instructor_id: courseAllot[0].instructor_id,
          },
        });
        response["instructor"] = inst_name.full_name;
        response["instructor_id"] = courseAllot[0].instructor_id;
        console.log(response["instructor_id"]);
      }

      response["code"] = obj.CourseCode;
      response["title"] = obj.CourseTitle;

      const courseCLO = await prisma.course_clos.findMany({
        select: {
          clo_num: true,
          clo_desc: true,
          mapped_on_plo: true,
          weightage: true,
        },
        where: {
          CourseCode: obj.CourseCode,
        },
      });
      response["des"] = obj.course_description;
      var clos = [];
      var clos_des = [];
      var plo = [];
      var weightage = [];
      for (let j = 0; j < courseCLO.length; j++) {
        clos.push(courseCLO[j].clo_num);
        clos_des.push(courseCLO[j].clo_desc);
        plo.push(courseCLO[j].mapped_on_plo);
        weightage.push(courseCLO[j].weightage);
      }
      response["clos"] = clos;
      response["clos_des"] = clos_des;
      response["plos"] = plo;
      response["weightage"] = weightage;
      // for (let k = 0; k < plo.length; k++) {
      //   response[`CLO ${clos[k]}`] = clos_des[k];
      //   response[`PLO ${plo[k]}`] = weightage[k];
      // }
      //console.log(response);
      abc.push(response);
    }
    res.send(abc);
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};

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

exports.allotedCourses = async (req, res, next) => {
  try {
    const inst = req.params.inst.toUpperCase();
    console.log(inst);
    // const inst_id = await prisma.course_instructors.findFirst({
    //   select: {
    //     instructor_id: true,
    //   },
    //   where: {
    //     instructor_id: inst,
    //   },
    // });

    const id_inst = inst;

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

exports.getAssesments = async (req, res, next) => {
  try {
    let reg = parseInt(req.params.reg);

    let studentData = await prisma.student.findFirst({
      where: { RegNo: reg },
      select: {
        Name: true,
        Faculty: true,
      },
    });

    let result = await prisma.assessments.findMany({
      where: {
        reg_no: reg,
      },
    });

    // console.log(result);

    /*
    {
        course_code: , 
        course_title: ,
        CLOs: [],
        obtained_weightage: [],
        assessments: [],
    }
    */

    let response = [];

    response.push(studentData);

    for (const assessment of result) {
      let query = await prisma.schemeofstudy.findFirst({
        where: {
          CourseCode: assessment.course_code,
        },
        select: {
          CourseTitle: true,
        },
      });
      let course_title = query.CourseTitle;
      //console.log
      assessment.course_title = course_title;
      // quiz
      if (
        assessment.assessment_type.charAt(0) == "Q" ||
        assessment.assessment_type.charAt(0) == "q"
      ) {
        assessment.assessment_type =
          assessment.assessment_type + " " + assessment.serial_no;
      }
      // midterm
      else {
        assessment.assessment_type =
          assessment.assessment_type + " question " + assessment.question_no;
      }
      let index = response.findIndex(
        (obj) => obj.course_code == assessment.course_code
      );
      //   console.log(index);
      if (index == -1) {
        response.push({
          course_code: assessment.course_code,
          course_title: course_title,
          CLOs: [assessment.mapped_on_clo],
          obtained_weightage: [assessment.obtained_clo_threshold],
          assessments: [assessment.assessment_type],
        });
      } else {
        //   console.log(typeof response[index]["CLOs"]);
        response[index].CLOs.push(assessment.mapped_on_clo);
        response[index].obtained_weightage.push(
          assessment.obtained_clo_threshold
        );
        response[index].assessments.push(assessment.assessment_type);
      }
    }

    res.send(JSON.stringify(response));
  } catch (e) {
    console.log(e);
    res.send("err");
  }
};
