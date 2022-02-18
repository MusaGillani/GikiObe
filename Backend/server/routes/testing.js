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
      Semesters: [
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
      ],
    };
    let codes = [];
    schemeCourses.forEach((course) => {
      //   console.log(code);
      codes.push(course.CourseCode);
    });

    let result = await prisma.courseplo.findMany({
      select: {
        Semester: true,
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
    });

    /*
    output of above query: 
        [
            {
            "Semester": " Fall 2021",
            "CourseCode": "CS325",
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
            },
            {
            "Semester": " Fall 2021",
            "CourseCode": "CE324",
            "PLO1": "",
            "PLO2": "Y",
            "PLO3": "Y",
            "PLO4": "",
            "PLO5": "",
            "PLO6": "",
            "PLO7": "Y",
            "PLO8": "",
            "PLO9": "",
            "PLO10": "",
            "PLO11": "",
            "PLO12": ""
            }
        ]
    */

    let semesters = [];

    if (result) {
      //   console.log(`found ${result.CourseCode}`);
      // semester number in schemeCourses and session in result ....
      //TODO rethink json format
      schemeCourses.forEach((course) => {
        semesters
          .push
          /*{
          number: course.Semester,
          session: "",
          courses: [
            {
              code: "",
              plos: [
                {
                  PLO1: "",
                  PLO2: "",
                  PLO3: "",
                  PLO4: "Y",
                  PLO5: "",
                  PLO6: "",
                  PLO7: "",
                  PLO8: "",
                  PLO9: "Y",
                  PLO10: "",
                  PLO11: "",
                  PLO12: "Y",
                },
              ],
            },
          ],
        }*/
          ();
      });
    }

    // console.log(schemeCourses.length);
    res.send(JSON.stringify({ result }));
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
});
module.exports = router;
