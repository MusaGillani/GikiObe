const course = require("../models").Courses;

module.exports = {
  insert(req, res, next) {
    return course
      .create({
        course_code: req.body.code,
        name: req.body.name,
        introduction: req.body.intro,
        creditHours: req.body.ch,
        preReq: null,
      })
      .then((result) => res.send(result))
      .catch((err) => res.status(404).send(err));
  },
  list(req, res, next) {
    return course
      .findAll()
      .then((result) => res.send(result))
      .catch((error) => res.status(404).send(error));
  },
};
