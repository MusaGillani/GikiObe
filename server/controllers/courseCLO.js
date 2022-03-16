const prisma = require("../db/db");

exports.getCLO = async (req, res, next) => {
  try {
    var dictObj = {
      Code: "",
      Desc: "",
      Name: "",
      CLOs: []
    };
    const responseObjectArray = [];

    const courseCodes = await prisma.course_clos.findMany({
      select: { CourseCode: true },
      distinct: ['CourseCode']
    });

    const clo = await prisma.course_clos.findMany();

    for (const obj of clo) {
      const course = await prisma.schemeofstudy.findFirst({
        select: {
          CourseTitle: true,
        },
        where: {
          CourseCode: obj.CourseCode,
        },
      });
      const ploDesc = await prisma.plos.findFirst({
        select: {
          plo_statement: true,
          plo_desc: true
        },
        where: {
          plo_num: obj.mapped_on_plo,
        },
      });
      if (dictObj["Code"] === "") {
        dictObj["Code"] = obj.CourseCode;
        dictObj["Desc"] = obj.clo_desc;
        dictObj["Name"] = course.CourseTitle;
        dictObj["CLOs"].push([obj.clo_num, obj.mapped_on_plo, parseFloat(obj.weightage), ploDesc.plo_statement, ploDesc.plo_desc]);
      } else if (obj.CourseCode === dictObj["Code"]) {
        dictObj["CLOs"].push([obj.clo_num, obj.mapped_on_plo, parseFloat(obj.weightage), ploDesc.plo_statement, ploDesc.plo_desc]);
      } else {
        responseObjectArray.push({ ...dictObj });
        dictObj["Code"] = obj.CourseCode;
        dictObj["Desc"] = obj.clo_desc;
        dictObj["Name"] = course.CourseTitle;
        dictObj["CLOs"] = []
        dictObj["CLOs"].push([obj.clo_num, obj.mapped_on_plo, parseFloat(obj.weightage), ploDesc.plo_statement, ploDesc.plo_desc]);
      }
    }
    responseObjectArray.push({ ...dictObj });

    res.send({ Courses: responseObjectArray });
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
};