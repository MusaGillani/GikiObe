const env = require("dotenv").config();
const mysql = require("mysql2");
const { PrismaClient, Prisma } = require("@prisma/client");

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
            Semester: true,
          },
          where: {
            CourseCode: obj.CourseCode,
          },
        });
        console.log(course);
        obj["course_name"] = course.CourseTitle;
        obj["number"] = course.Semester;
        // console.log(result);
      }

      result.forEach((obj) => {
        // console.log(obj);
        for (const key in obj) {
          if (key == "Semester") {
            // console.log(obj[key]);
            if (!semesters.hasOwnProperty(`${obj[key]}`)) {
              // semesters.set(`${obj[key]}`, []);
              semesters[`${obj[key]}`] = [];
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

            semesters[`${obj[key]}`].push(values);
            // semesters[`${obj["number"]}_${obj[key]}`].push(values);
            // console.log(semesters[`${obj[key]}`]);
          }
        }
        console.log(semesters);
        // console.log(JSON.parse(semesters));
      });
    }

    // console.log(JSON.parse(semesters));

    // console.log(schemeCourses.length);
    // console.log(typeof result);
    res.send(JSON.stringify(semesters));
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

      // console.log(title);
      // console.log(`${filename}`);
      // const query = (filename) =>
      //   `LOAD DATA INFILE 'E:\\GIK\\fyp\\Backend\\server\\csvs\\${filename}' INTO TABLE courseplo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (RegNo,CourseCode,Semester,PLO1,PLO2,PLO3,PLO4,PLO5,PLO6,PLO7,PLO8,PLO9,PLO10,PLO11,PLO12);`;
      // query = `SELECT * FROM COURSEPLO;`;
      // const result = await prisma.$queryRaw(
      //   Prisma.sql`LOAD DATA INFILE 'E:\GIK\fyp\Backend\server\csvs\${filename}' INTO TABLE courseplo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (RegNo,CourseCode,Semester,PLO1,PLO2,PLO3,PLO4,PLO5,PLO6,PLO7,PLO8,PLO9,PLO10,PLO11,PLO12);`
      // );
      // const connection = await mysql.createConnection({
      //   host: "localhost",
      //   user: "root",
      //   password: "Gillani1",
      //   port: 3306,
      //   database: "obe_development",
      // });
      const connection = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        port: process.env.DBPORT,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      let command = "LOAD DATA INFILE '";
      let filePath = "E:/GIK/fyp/Backend/server/csvs/";
      let table =
        "' INTO TABLE courseplo1 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (RegNo,CourseCode,Semester,@dummy,@dummy,PLO1,PLO2,PLO3,PLO4,PLO5,PLO6,PLO7,PLO8,PLO9,PLO10,PLO11,PLO12);";
      let query = command + filePath + filename + table;
      // const [results, fields] = await connection.execute(query);
      // connection.end();
      let resultQuery;
      try {
        resultQuery = await new Promise((resolve, reject) => {
          connection.query(query, function (err, results, fields) {
            return err ? reject(err) : resolve(results);
          });
        });
      } catch (e) {
        console.log(e);
        res.status(404).send(e.toString);
      }
      console.log(resultQuery);
      console.log(filename);
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(404).send(e.toString);
  }
});
// router.get("/test", async (req, res, next) => {
//   const filename = "courseplo3.csv";
//   const users = await prisma.$executeRawUnsafe(
//     `LOAD DATA INFILE 'E:\\GIK\\fyp\\Backend\\server\\csvs\\${filename}' INTO TABLE courseplo FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\n' IGNORE 1 ROWS (RegNo,CourseCode,Semester,PLO1,PLO2,PLO3,PLO4,PLO5,PLO6,PLO7,PLO8,PLO9,PLO10,PLO11,PLO12);`
//   );

//   res.send(JSON.stringify(users));
// });

function execQuery(filename) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Gillani1",
      port: 3306,
      database: "obe_development",
    });

    let command = "LOAD DATA INFILE '";
    let query =
      command +
      "E:/GIK/fyp/Backend/server/csvs/" +
      filename +
      "' INTO TABLE courseplo1 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (RegNo,CourseCode,Semester,@dummy,@dummy,PLO1,PLO2,PLO3,PLO4,PLO5,PLO6,PLO7,PLO8,PLO9,PLO10,PLO11,PLO12);";
    connection.query(query, function (err, results, fields) {
      if (results) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        resolve(results);
        // res.send("added");
      } else {
        console.log(err);
        // res.send(err);
        reject(err);
      }
    });
  });
}
module.exports = router;
