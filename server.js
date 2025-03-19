const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { email: "alice@example.com", password: "alice123" },
  { email: "bob@example.com", password: "bob123" },
  { email: "charlie@example.com", password: "charlie123" },
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.put('/users', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users[userIndex].password = password;
    res.send('User updated successfully');
  } else {
    res.status(404).send('Email not found');
  }
});

app.delete('/users', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  const userIndex = users.findIndex(user => user.email === email);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send('User deleted successfully');
  } else {
    res.status(404).send('Email not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});