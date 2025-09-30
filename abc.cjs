const http = require('http');
const { URL } = require('url');

// In-memory data store (for demonstration)
let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build an API', completed: false }
];
console.log("todos:",todos);

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log("Method:",method);
  console.log("URL:",url);
  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  console.log("Host:",req.headers.host);
  console.log("Parsed URL:",parsedUrl);
  const pathname = parsedUrl.pathname;
    console.log("Pathname:",pathname);

  // Set CORS headers (for development)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    console.log("OPTIONS request");
    res.writeHead(204);
    res.end();
    return;
  }

  // Route: GET /todos
  if (method === 'GET' && pathname === '/todos') {
    console.log("GET /todos request");
    console.log("todos inside GET:",todos);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(todos));
  }
  // Route: POST /todos
  else if (method === 'POST' && pathname === '/todos') {
    console.log("POST /todos request");
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      console.log("Chunk received:",chunk);
      console.log("Chunk received:",chunk.toString());
    });
    console.log("Body received:",body);

    req.on('end', () => {
      try {
        const newTodo = JSON.parse(body);
        console.log("New Todo:",newTodo);
        // Assign a new ID (simple increment logic) for demonstration       
        newTodo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        console.log("New Todo with ID:",newTodo);
        todos.push(newTodo);
        console.log("Todos after addition:",todos);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newTodo));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  // Route: PUT /todos/:id
  else if (method === 'PUT' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2]);
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const updatedTodo = JSON.parse(body);
        const index = todos.findIndex(t => t.id === id);

        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Todo not found' }));
        } else {
          todos[index] = { ...todos[index], ...updatedTodo };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(todos[index]));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }

  // Route: DELETE /todos/:id
  else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
    const id = parseInt(pathname.split('/')[2]);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Todo not found' }));
    } else {
      todos = todos.filter(t => t.id !== id);
      res.writeHead(204);
      res.end();
    }
  }

  // 404 Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});