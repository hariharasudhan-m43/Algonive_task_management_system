const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth.middleware");

// CREATE TEAM
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Team name required" });
  }

  const team = await Team.create({
    name,
    owner: req.user._id,
    members: [req.user._id],
  });

  res.status(201).json(team);
});

// GET MY TEAMS
router.get("/", authMiddleware, async (req, res) => {
  const teams = await Team.find({
    members: req.user._id,
  });

  res.json(teams);
});

// ADD MEMBER (OWNER ONLY)
router.post("/:teamId/invite", authMiddleware, async (req, res) => {
  const { email } = req.body;
  const team = await Team.findById(req.params.teamId);

  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  if (team.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only owner can invite" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!team.members.includes(user._id)) {
    team.members.push(user._id);
    await team.save();
  }

  res.json(team);
});

module.exports = router;
