const transcriptController = require("../controllers").transcriptController;
const router = require("express").Router();
const prisma = require('../db/db');
const { zipAllFiles } = require('../helper/zip');

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

router.get("/transcript/:reg", transcriptController.getTranscript);

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

router.get("/bulk/:batch", transcriptController.bulkTranscripts);
router.get("/single/:reg", transcriptController.singlePdf);
router.get("/batches", async (req, res, next) => {
  try {
    let batches = await prisma.student.findMany({
      select: {
        Batch: true,
      },
      distinct: ["Batch"],
    });

    // console.log(JSON.stringify(batches));

    batches = batches.map((obj) => obj.Batch);
    res.send(JSON.stringify(batches));
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/students/:batch", async (req, res, next) => {
  try {
    let result = await prisma.student.findMany({
      select: {
        RegNo: true,
      },
      where: {
        Batch: parseInt(req.params.batch),
      },
    });

    // console.log(JSON.stringify(batches));

    result = result.map((obj) => obj.RegNo);
    res.send(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    res.status(404).send(e);
  }
});

router.get('/zip', async (req, res, next) => {
  try {
    console.log('route hit!')
    let result = await zipAllFiles();
    // res.send(JSON.stringify("Download started!"));
    const fileName = 'pdfs.zip';
    const fileType = 'application/zip';
    res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': fileType,
    })
    // res.send(result);
    res.end(result);
  } catch (error) {
    console.log("Archive of bulk files failed!");
    res.status(404).send(JSON.stringify(error.toString()));
  }
});

module.exports = router;