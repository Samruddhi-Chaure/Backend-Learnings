// const express = require('express');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(express.json());

// const SECRET_KEY = 'your_secret_key';

// // Route to generate JWT
// app.post('/login', (req, res) => {
//     // In a real app, validate user credentials from req.body
//     const user = { id: 1, username: 'testuser' }; // Example user
//     const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
// });

// // Middleware to verify JWT
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.sendStatus(401);

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

// // Protected route
// app.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'This is protected data.', user: req.user });
// });

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// });




const http = require('http')
const server = http.createServer((req, res) =>{

// EX-1 inspect the request details
const oreq = JSON.stringify(req);
res.end(oreq)
res.end('Welcome to CAP Node leaarning')
})
server.listen(3000, () => console.log("req")
)