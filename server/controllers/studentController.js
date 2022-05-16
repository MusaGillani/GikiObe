const prisma = require("../db/db");

exports.getAllBatches = async (req, res, next) => {
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
};

exports.getBatch = async (req, res, next) => {
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
};

exports.addStudent = async (req, res, next) => {
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
};

exports.getAllStudents = async (req, res, next) => {
  const users = await prisma.student.findMany();

  res.send(JSON.stringify(users));
};
