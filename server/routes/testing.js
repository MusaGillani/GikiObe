const router = require("express").Router();
const prisma = require("../db/db");

const { zipAllFiles, zipAndSaveFile } = require("../helper/zip");
const transcriptController = require("../controllers").transcriptController;
const cloController = require("../controllers").cloController;
const graphsController = require("../controllers").graphsController;
const courseController = require("../controllers").courseController;
const assessmentController = require("../controllers").assessmentController;
const studentController = require("../controllers").studentController;
// const allotedCourses = require("../controllers").allotedCourses;
// const allotCourse = require("../controllers").allotCourse;
// const course = require("../controllers").getCourseSem;
const getInstructors = require("../controllers/getInstructors");
const grading = require("../controllers").grading
// const addCourse = require("../controllers").addCourse;
// const getCourseCLOs = require("../controllers").getCourseCLOs;
// const getAssesments = require("../controllers").getAssesments;
// const addCourse = require("../controllers/addCourse");
// const getCourseCLOs = require("../controllers/getCourseCLOs");
// const addQuizAssessment = require("../controllers/addQuizAssessment");

router.get("/student", studentController.getAllStudents);
router.post("/student", studentController.addStudent);

router.get("/courseplo", cloController.getAllClos);

router.get("/scheme", async (req, res, next) => {
  const users = await prisma.schemeofstudy.findMany();

  res.send(JSON.stringify(users));
});

router.get("/transcript/:reg", transcriptController.getTranscript);

router.post("/add", cloController.addCourseClo);

router.get("/bulk/:batch", transcriptController.bulkTranscripts);

router.get("/single/:reg", transcriptController.singlePdf);

router.get("/batches", studentController.getAllBatches);

router.get("/students/:batch", studentController.getBatch);

router.get("/zip", async (req, res, next) => {
  try {
    console.log("zip route hit!");

    const filename = require("path").join(
      __dirname,
      "..",
      "zipFiles",
      "output.zip"
    );
    await zipAndSaveFile();
    // res.writeHead(200, );
    res.setHeader("Content-Disposition", "attachment; filename=output.zip");
    res.setHeader("Content-Type", "application/zip");
    res.sendFile(filename);
  } catch (error) {
    console.log("Archive of bulk files failed!");
    res.status(404).send(JSON.stringify(error.toString()));
  }
});

router.get("/getCLOs", cloController.getCLO);

router.get("/plo-performance/:batch", graphsController.ploPerformance);

router.get("/alloted-course/:inst", courseController.allotedCourses);

router.post("/allot-course", courseController.allotCourse);

router.get("/courses/:sem", courseController.getCourse);

router.get("/instructors", getInstructors.getInstructors);

router.post("/add-course", courseController.addCourse);

router.get("/getCourseClo/:course", courseController.getCourseCLOs);

router.get("/getCourseDetail/:sem", courseController.getDetailCourse);

router.get("/getAssessments/:reg", courseController.getAssesments);

router.post("/addQuizAssessment", assessmentController.addQuizAssessment);

router.post("/addFinalMidP", assessmentController.addFinalMidP);

router.post("/addGrading", grading.grading);

module.exports = router;
