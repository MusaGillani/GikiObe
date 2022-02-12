const express = require("express");
const courseController = require("../controllers").courses;

const router = express.Router();

router.get("/", courseController.list);
router.post("/", courseController.insert);

module.exports = router;
