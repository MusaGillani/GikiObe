const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();
const router = require("express").Router();

const semesterLookup = {
    "Spring": 1,
    "Summer": 2,
    "Fall": 3,
}

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

        res.status(200).send({message: "Added!"});
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
                        CourseCode: {in: codes},
                    },
                ],
            },
        });

        if (result) {
            for (const obj of result) {
                const course = await prisma.schemeofstudy.findFirst({
                    select: {
                        CourseTitle: true,
                    },
                    where: {
                        CourseCode: obj.CourseCode,
                    },
                });
                obj["courseTitle"] = course.CourseTitle;
            }
        }

        result.forEach((obj) => {
                let [semType, year] = obj.Semester.split(' ');
                obj.semType = semesterLookup[semType];
                obj.year = year;
            }
        );

        let tmpResult = {};
        for (let row of result){
            if (!Object.keys(tmpResult).includes(row.year)){
                tmpResult[row.year] = {};
            }
            if (!Object.keys(tmpResult[row.year]).some(el => el == row.semType)) {
                tmpResult[row.year][row.semType] = [];
            }
            tmpResult[row.year][row.semType].push(row);
        }



        let transcript = {
            reg: data.reg,
            name: student.Name,
            faculty: student.Faculty,
            batch: student.Batch,
            result: tmpResult
        };

        res.send(JSON.stringify(transcript));
    } catch (e) {
        console.log(e);
        res.status(404).send(JSON.stringify({message: e.toString()}));
    }
});

router.post("/add", async (req, res, next) => {
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
});

module.exports = router;
