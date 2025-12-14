const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Team = require("../models/Team");
const authMiddleware = require("../middleware/auth.middleware");

// GET TASKS FOR TEAM
router.get("/:teamId", authMiddleware, async (req, res) => {
  const team = await Team.findOne({
    _id: req.params.teamId,
    members: req.user._id,
  });

  if (!team) {
    return res.status(403).json({ message: "Access denied" });
  }

  const tasks = await Task.find({ team: team._id });
  res.json(tasks);
});

// CREATE TASK IN TEAM
router.post("/:teamId", authMiddleware, async (req, res) => {
  const { title, priority, assignedTo } = req.body;

  const team = await Team.findOne({
    _id: req.params.teamId,
    members: req.user._id,
  });

  if (!team) {
    return res.status(403).json({ message: "Access denied" });
  }

  const task = await Task.create({
    title,
    priority,
    team: team._id,
    assignedTo: assignedTo || req.user._id,
  });

  res.status(201).json(task);
});

// UPDATE task status (TEAM SCOPED)
router.put("/:teamId/:taskId", authMiddleware, async (req, res) => {
  const { teamId, taskId } = req.params;
  const { status } = req.body;

  const team = await Team.findOne({
    _id: teamId,
    members: req.user._id,
  });

  if (!team) {
    return res.status(403).json({ message: "Access denied" });
  }

  const task = await Task.findOne({
    _id: taskId,
    team: teamId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  await task.save();

  res.json(task);
});

// DELETE task (TEAM SCOPED)
router.delete("/:teamId/:taskId", authMiddleware, async (req, res) => {
  const { teamId, taskId } = req.params;

  const team = await Team.findOne({
    _id: teamId,
    members: req.user._id,
  });

  if (!team) {
    return res.status(403).json({ message: "Access denied" });
  }

  const task = await Task.findOneAndDelete({
    _id: taskId,
    team: teamId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
});


module.exports = router;
