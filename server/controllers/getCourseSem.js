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
