import express from 'express';

const app = express();
const PORT = 3000;

// === In-memory user data ===
const users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching"
  }
];

// === Middleware to parse JSON ===
app.use(express.json());

// === Logging Middleware ===
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

// === Validation Middleware ===
function validateUser(req, res, next) {
  const { firstName, lastName, hobby } = req.body;
  if (!firstName || !lastName || !hobby) {
    return res.status(400).json({ error: 'Missing required fields: firstName, lastName, hobby' });
  }
  next();
}

// === Routes ===

// GET all users
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.status(200).json(user);
});

// POST new user
app.post('/user', validateUser, (req, res) => {
  const newUser = {
    id: (users.length + 1).toString(),
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/user/:id', validateUser, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.hobby = req.body.hobby;
  res.status(200).json(user);
});

// DELETE user
app.delete('/user/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(index, 1);
  res.status(200).json(deletedUser[0]);
});

// === Start the server ===
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
