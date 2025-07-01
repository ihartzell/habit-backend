const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Isaac! Backend is working.');
});

app.post('/goals', (req, res) => {
  const { name, completed } = req.body;

  const newGoal = {
    id: Date.now(),
    name,
    completed: completed || false,
  };

  console.log('New goal created:', newGoal);

  res.status(201).json(newGoal);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

