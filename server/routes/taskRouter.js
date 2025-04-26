const express = require("express");
const router = express.Router();

const taskController = require("../Controllers/taskController");

router.get("/get-all", taskController.getAllTasks);

router.get("/get", taskController.getTask);

router.post("/create", taskController.createTask);

router.put("/update-status", taskController.updateStatus);

router.post("/delete", taskController.deleteTask);

module.exports = router;