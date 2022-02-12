const courseClo = require("../models").Course_CLO;

module.exports = {
  insert(req, res, next) {
    return courseClo.create();
  },
};
