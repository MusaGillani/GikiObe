const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

router.get("/transcript", async (req, res, next) => {
  try {
    const data = {
      reg: parseInt(req.query.reg),
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

    // JSON RESPONSE sample transcript format
    const trans = {
      reg: data.reg,
      // Semesters: [
      /*
        {
            number : 1,
            session: '' , fall/spring
            courses: [
                {
                    code: '' ,
                    plos: [
                        {
                            "PLO1": "",
                            "PLO2": "",
                            "PLO3": "",
                            "PLO4": "Y",
                            "PLO5": "",
                            "PLO6": "",
                            "PLO7": "",
                            "PLO8": "",
                            "PLO9": "Y",
                            "PLO10": "",
                            "PLO11": "",
                            "PLO12": "Y"
                        }
                    ],
                }
            ]
        }
        */
      // ],
    };
    let codes = [];
    schemeCourses.forEach((course) => {
      //   console.log(code);
      codes.push(course.CourseCode);
    });

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

    // let semesters = new Map();
    let semesters = {};

    if (result) {
      // semesters.set(`${result.Semester}`, arr);
      // trans.Semesters = semesters;
      for (const obj of result) {
        const course = await prisma.schemeofstudy.findFirst({
          select: {
            CourseTitle: true,
          },
          where: {
            CourseCode: obj.CourseCode,
          },
        });
        console.log(course.CourseTitle);
        obj["course_name"] = course.CourseTitle;
        // console.log(result);
      }

      result.forEach((obj) => {
        // console.log(obj);
        for (const key in obj) {
          if (key == "Semester") {
            // console.log(obj[key]);
            if (!semesters.hasOwnProperty(`${obj[key]}`)) {
              // semesters.set(`${obj[key]}`, []);
              semesters[obj[key]] = [];
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

            semesters[obj[key]].push(values);
            // console.log(semesters[`${obj[key]}`]);
          }
        }
        // console.log(semesters);
        // console.log(JSON.parse(semesters));
      });
    }

    // console.log(JSON.parse(semesters));

    // console.log(schemeCourses.length);
    // console.log(typeof result);
    res.send(JSON.stringify(semesters));
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
});
module.exports = router;
