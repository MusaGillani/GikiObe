const prisma = require("../db/db");

exports.getCLO = async (req, res, next) => {
  try {
    var dictObj = {
      Code: "",
      Desc: "",
      Name: "",
      CLOs: [],
    };
    const responseObjectArray = [];

    const courseCodes = await prisma.course_clos.findMany({
      select: { CourseCode: true },
      distinct: ["CourseCode"],
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
          plo_desc: true,
        },
        where: {
          plo_num: obj.mapped_on_plo,
        },
      });
      if (dictObj["Code"] === "") {
        dictObj["Code"] = obj.CourseCode;
        dictObj["Desc"] = obj.clo_desc;
        dictObj["Name"] = course.CourseTitle;
        dictObj["CLOs"].push([
          obj.clo_num,
          obj.mapped_on_plo,
          parseFloat(obj.weightage),
          ploDesc.plo_statement,
          ploDesc.plo_desc,
        ]);
      } else if (obj.CourseCode === dictObj["Code"]) {
        dictObj["CLOs"].push([
          obj.clo_num,
          obj.mapped_on_plo,
          parseFloat(obj.weightage),
          ploDesc.plo_statement,
          ploDesc.plo_desc,
        ]);
      } else {
        responseObjectArray.push({ ...dictObj });
        dictObj["Code"] = obj.CourseCode;
        dictObj["Desc"] = obj.clo_desc;
        dictObj["Name"] = course.CourseTitle;
        dictObj["CLOs"] = [];
        dictObj["CLOs"].push([
          obj.clo_num,
          obj.mapped_on_plo,
          parseFloat(obj.weightage),
          ploDesc.plo_statement,
          ploDesc.plo_desc,
        ]);
      }
    }
    responseObjectArray.push({ ...dictObj });

    res.send({ Courses: responseObjectArray });
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
};

exports.addCourseClo = async (req, res, next) => {
  try {
    console.log("route hit!");
    // const title = req.body.title;
    const files = req.files;
    // req.files.forEach((file) =>
    /*
    {
            RegNo: 2201846,
            CourseCode:
            Semester:
            PLO1:
            PLO2:
            PLO3:
            PLO4:
            PLO5:
            PLO6:
            PLO7:
            PLO8:
            PLO9:
            PLO10:
            PLO11:
            PLO12:
          }
        */
    let data = [];
    for (let i = 0; i < files.length; i++) {
      const filename = files[i].originalname;
      try {
        let parsedfile = await require("../helper/parse").read(filename);
        // console.log(parsedfile[0]["Reg No."]);
        console.log("file:", filename);
        console.log(parsedfile);
        parsedfile.forEach((record) => {
          data.push({
            RegNo: parseInt(record["Reg No."]),
            CourseCode: record["Course Code"],
            Semester: record["Semester"],
            PLO1: record["PLO 1"],
            PLO2: record["PLO 2"],
            PLO3: record["PLO 3"],
            PLO4: record["PLO 4"],
            PLO5: record["PLO 5"],
            PLO6: record["PLO 6"],
            PLO7: record["PLO 7"],
            PLO8: record["PLO 8"],
            PLO9: record["PLO 9"],
            PLO10: record["PLO 10"],
            PLO11: record["PLO 11"],
            PLO12: record["PLO 12"],
          });
        });
      } catch (e) {
        console.log(e);
        res.status(404).send(e.toString);
      }
    }

    let response = await prisma.courseplo.createMany({
      data: data,
    });
    console.log("response", response);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.toString);
  }
};

exports.getAllClos = async (req, res, next) => {
  const users = await prisma.courseplo.findMany();

  res.send(JSON.stringify(users));
};
