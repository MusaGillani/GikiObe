const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/student", async (req, res, next) => {
  const users = await prisma.student.findMany();

  res.send(JSON.stringify(users));
});
router.post("/student", async (req, res, next) => {
  // run inside `async` function
  try {
    const newUser = {
      RegNo: req.body.reg,
      Name: req.body.name,
      Faculty: req.body.faculty,
      Batch: req.body.batch,
    };
    await prisma.student.create({
      data: newUser,
    });

    res.status(200).send({ message: "Added!" });
  } catch (e) {
    res.status(404).send(JSON.stringify(e));
  }
});

router.get("/courseplo", async (req, res, next) => {
  const users = await prisma.courseplo.findMany();

  res.send(JSON.stringify(users));
});

router.get("/scheme", async (req, res, next) => {
  const users = await prisma.schemeofstudy.findMany();

  res.send(JSON.stringify(users));
});

router.get("/transcript/:reg", async (req, res, next) => {
  try {
    const data = {
      reg: parseInt(req.params.reg),
      //   batch: req.query.batch,
    };

    const student = await prisma.student.findUnique({
      where: {
        RegNo: data.reg,
      },
    });

    const schemeCourses = await prisma.schemeofstudy.findMany({
      where: {
        Batch: student.batch,
      },
      select: {
        Semester: true,
        CourseCode: true,
      },
      orderBy: {
        Semester: "asc",
      },
    });

    // console.log(schemeCourses);

    let codes = [];
    schemeCourses.forEach((course) => {
      //   console.log(code);
      codes.push(course.CourseCode);
    });

    // console.log("codes", codes);

    let result = await prisma.courseplo.findMany({
      select: {
        Semester: true,
        // CourseTitle: true,
        CourseCode: true,
        PLO1: true,
        PLO2: true,
        PLO3: true,
        PLO4: true,
        PLO5: true,
        PLO6: true,
        PLO7: true,
        PLO8: true,
        PLO9: true,
        PLO10: true,
        PLO11: true,
        PLO12: true,
      },
      where: {
        AND: [
          {
            RegNo: data.reg,
          },
          {
            CourseCode: { in: codes },
          },
        ],
      },
      // include: {
      //   CourseTitle: true,
      // },
    });
    // console.log("result", result);

    // let semesters = { };

    let transcript = {
      reg: data.reg,
      name: student.Name,
      faculty: student.Faculty,
      batch: student.Batch,
    };

    if (result) {
      // semesters.set(`${result.Semester}`, arr);
      // trans.Semesters = semesters;
      for (const obj of result) {
        const course = await prisma.schemeofstudy.findFirst({
          select: {
            CourseTitle: true,
            Semester: true,
          },
          where: {
            CourseCode: obj.CourseCode,
          },
        });
        // console.log(course);
        obj["course_name"] = course.CourseTitle;
        obj["number"] = course.Semester;
      }

      console.log("result", result.length);

      result.forEach((obj) => {
        // console.log(obj);
        // for (const key in obj) {

        // if (key == "Semester") {
        // console.log(obj[key]);
        const key = "Semester";
        if (
          !transcript.hasOwnProperty(`${obj["number"]}`)
          // .hasOwnProperty(`${obj[key]}`)
        ) {
          // semesters.set(`${obj[key]}`, []);
          // semesters[`${obj[key]}`] = [];
          // semesters[`${obj[key]}`] = [];
          transcript[`${obj["number"]}`] = {};
          transcript[`${obj["number"]}`][`${obj[key]}`] = [];
          // semesters[`${obj["number"]}_${obj[key]}`] = [];
        }
        let keys = [];
        // storing keys from obj
        keys = Object.keys(obj)
          // removing semester key from array
          .filter((k) => k != key);

        // let values = new Map();
        let values = {};
        keys.forEach((i) => {
          // values.set(i, obj[i]);
          values[i] = obj[i];
        });

        // console.log(values);
        // semesters.get(`${obj[key]}`).push(values);

        // renaming CourseCode key to course_code
        delete Object.assign(values, {
          ["course_code"]: values["CourseCode"],
        })["CourseCode"];

        // semesters[`${obj[key]}`].push(values);
        // semesters[`${obj["number"]}_${obj[key]}`].push(values);
        // console.log(semesters[`${obj[key]}`]);

        transcript[`${obj["number"]}`][`${obj[key]}`].push(values);
        // }
        // }
        // console.log(semesters);
        // console.log(JSON.parse(semesters));
      });
    }
    // let length = 0;
    // Object.keys(transcript).forEach((key) => {
    //   console.log(transcript[key]);
    // });
    // console.log("transcript", length);
    res.send(JSON.stringify(transcript));
    // res.send(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
});

router.post("/add", async (req, res, next) => {
  try {
    // const title = req.body.title;
    const files = req.files;
    // req.files.forEach((file) =>
    for (let i = 0; i < files.length; i++) {
      const filename = files[i].originalname;
      let data = await require("../helper/parse").read(filename);
      console.log(data[0]["Reg No."]);
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.toString);
  }
});

module.exports = router;
