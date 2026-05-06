// Pre-prepared fix for the SQL Injection vulnerability in src/server.js
// This file shows what the FIXED version looks like — for use in demo-fix branches

const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
app.use(express.json());

const db = new sqlite3.Database(':memory:');

// FIXED: SQL Injection — use parameterized queries
app.get('/api/users/search', (req, res) => {
  const username = req.query.username;
  const query = "SELECT * FROM users WHERE username = ?";
  db.all(query, [username], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(rows);
  });
});

// FIXED: XSS — use proper encoding / templating
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  // Encode HTML entities to prevent XSS
  const encoded = String(searchTerm)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  res.send(`
    <html>
      <body>
        <h1>Search Results</h1>
        <p>You searched for: ${encoded}</p>
        <p>No results found.</p>
      </body>
    </html>
  `);
});

// FIXED: Path Traversal — validate and restrict file paths
app.get('/api/files', (req, res) => {
  const filename = req.query.name;
  const uploadsDir = path.resolve('/uploads');
  const filePath = path.resolve(uploadsDir, filename);

  // Ensure the resolved path is within the uploads directory
  if (!filePath.startsWith(uploadsDir)) {
    res.status(400).json({ error: 'Invalid file path' });
    return;
  }

  res.sendFile(filePath);
});

// FIXED: Open Redirect — validate redirect targets
app.get('/redirect', (req, res) => {
  const target = req.query.url;
  const allowedHosts = ['example.com', 'www.example.com'];

  try {
    const url = new URL(target, `http://${req.headers.host}`);
    if (!allowedHosts.includes(url.hostname) && url.hostname !== req.headers.host) {
      res.status(400).json({ error: 'Redirect target not allowed' });
      return;
    }
    res.redirect(url.pathname + url.search);
  } catch {
    res.status(400).json({ error: 'Invalid URL' });
  }
});

// FIXED: Command Injection — avoid shell execution, use safe APIs
const { execFile } = require('child_process');

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  execFile('grep', ['-r', searchTerm, '/var/data/'], (error, stdout) => {
    if (error) {
      res.status(500).json({ error: 'Search failed' });
      return;
    }
    res.json({ results: stdout.split('\n').filter(Boolean) });
  });
});
