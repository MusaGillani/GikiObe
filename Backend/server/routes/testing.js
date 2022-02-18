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

module.exports = router;
