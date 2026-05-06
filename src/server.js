// Demo Application — Intentionally Vulnerable Code for GHAS Demo
// WARNING: This code contains intentional security vulnerabilities for demonstration purposes.
// DO NOT use this code in production.

const express = require('express');
const sqlite3 = require('sqlite3');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vulnerability 1: Hardcoded credentials (CWE-798)
// CodeQL will flag this as "Hard-coded credentials"
const DB_PASSWORD = 'SuperSecret123!';
const API_KEY = 'sk-prod-a1b2c3d4e5f6g7h8i9j0';

const db = new sqlite3.Database(':memory:');

// Initialize demo database
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT, role TEXT)");
  db.run("INSERT INTO users VALUES (1, 'admin', 'admin123', 'admin@example.com', 'admin')");
  db.run("INSERT INTO users VALUES (2, 'user1', 'password', 'user1@example.com', 'user')");
  db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, description TEXT)");
  db.run("INSERT INTO products VALUES (1, 'Widget', 9.99, 'A useful widget')");
});

// Vulnerability 2: SQL Injection (CWE-89)
// CodeQL will flag this as "Database query built from user-controlled sources"
app.get('/api/users/search', (req, res) => {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Vulnerability 3: Cross-Site Scripting / Reflected XSS (CWE-79)
// CodeQL will flag this as "Reflected cross-site scripting"
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  res.send(`
    <html>
      <body>
        <h1>Search Results</h1>
        <p>You searched for: ${searchTerm}</p>
        <p>No results found.</p>
      </body>
    </html>
  `);
});

// Vulnerability 4: Path Traversal (CWE-22)
// CodeQL will flag this as "Uncontrolled data used in path expression"
app.get('/api/files', (req, res) => {
  const filename = req.query.name;
  const filePath = path.join('/uploads', filename);
  res.sendFile(filePath);
});

// Vulnerability 5: Missing authentication on sensitive endpoint (CWE-306)
// CodeQL may flag this as an endpoint without authentication
app.post('/api/admin/delete-user', (req, res) => {
  const userId = req.body.userId;
  const query = "DELETE FROM users WHERE id = " + userId;
  db.run(query, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'User deleted' });
  });
});

// Vulnerability 6: Insecure session configuration (CWE-614)
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: true
}));

// Vulnerability 7: Open Redirect (CWE-601)
// CodeQL will flag this as "Server-side URL redirect"
app.get('/redirect', (req, res) => {
  const target = req.query.url;
  res.redirect(target);
});

// Vulnerability 8: Log Injection (CWE-117)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for user: ' + username);

  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  db.get(query, (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Internal error' });
      return;
    }
    if (row) {
      res.json({ message: 'Login successful', user: row });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
