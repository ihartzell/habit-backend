const express = require('express');
const router = express.Router();

const goals = [];

router.get('/', (req, res) => {
  res.json(goals);
});

router.post('/', (req, res) => {
  const { name, completed } = req.body;
  const newGoal = {
    id: Date.now(),
    name,
    completed: completed || false,
  };
  goals.push(newGoal);
  res.status(201).json(newGoal);
});

module.exports = router;
