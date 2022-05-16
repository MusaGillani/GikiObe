const prisma = require("../db/db");
exports.grading = async (req, res, next) => {
  try {
    console.log(req.body);
    const abc = await prisma.grading_policies.create({
      data: req.body,
    });
    res.send("success");
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
