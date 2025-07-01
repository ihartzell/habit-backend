const express = require("express");
const router = express.Router();

const goals = [];

router.get("/", (req, res) => {
  res.json(goals);
});

router.post("/", (req, res) => {
  const data = req.body;

  // Normalize input: make it always an array
  const goalsArray = Array.isArray(data) ? data : [data];

  const newGoals = [];

  for (const goal of goalsArray) {
    const { name, completed } = goal;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Goal name is required and must be a non-empty string.",
      });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "Completed must be a boolean value." });
    }

    const newGoal = {
      id: Date.now() + Math.floor(Math.random() * 1000), 
      name: name.trim(),
      completed: completed || false,
    };

    goals.push(newGoal);
    newGoals.push(newGoal);
  }

 
  res.status(201).json(Array.isArray(data) ? newGoals : newGoals[0]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const goal = goals.find((goal) => goal.id === Number(id));

  if (!goal) {
    return res.status(404).json({ error: "Goal not found" });
  }

  res.json(goal);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const goalIndex = goals.findIndex((goal) => goal.id === Number(id));

  if (goalIndex === -1) {
    return res.status(404).json({ error: "Goal not found" });
  }

  const invalidName =
    name !== undefined && (typeof name !== "string" || name.trim() === "");
  const invalidCompleted =
    completed !== undefined && typeof completed !== "boolean";

  if (invalidName) {
    return res
      .status(400)
      .json({ error: "Name must be a non-empty string if provided." });
  }
  if (invalidCompleted) {
    return res
      .status(400)
      .json({ error: "Completed must be a boolean if provided." });
  }

  if (name !== undefined) goals[goalIndex].name = name.trim();
  if (completed !== undefined) goals[goalIndex].completed = completed;

  res.json(goals[goalIndex]);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const goalIndex = goals.findIndex((goal) => goal.id === Number(id));

  if (goalIndex === -1) {
    return res.status(404).json({ error: "Goal not found" });
  }

  const deletedGoal = goals.splice(goalIndex, 1)[0];
  res.json({ message: "Goal deleted", goal: deletedGoal });
});

module.exports = router;
