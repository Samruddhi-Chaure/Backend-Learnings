import express from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory "database"
let users = [
  { id: 1, name: "Samruddhi", role: "Frontend Dev" },
  { id: 2, name: "Atharv", role: "Backend Learner" }
];

// 👉 CREATE (POST)
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 👉 READ ALL (GET)
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/", (req,res)=>{
    console.log(req);
    res.send("Hello in the Express World");
});

// 👉 READ ONE (GET by id)
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// 👉 UPDATE (PUT)
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.role = req.body.role || user.role;

  res.json(user);
});

// 👉 DELETE
app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
