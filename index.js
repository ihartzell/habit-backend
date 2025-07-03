const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const goalsRouter = require('./routes/goals');
app.use('/goals', goalsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Habit Tracker API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log(`Server running on port ${3000}`);
});
