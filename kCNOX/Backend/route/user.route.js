const express = require('express');
var router = express.Router();
const controller = require("../controller/user.controller")


router.post("/",controller.addStudent);
router.get("/students",controller.getstudent);
router.post("/update/:id",controller.editstudent);
router.delete("/students/:id",controller.deleteStudent);


module.exports = router;