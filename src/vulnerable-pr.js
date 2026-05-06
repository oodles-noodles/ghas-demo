// Vulnerable code for PR demo — this file is meant to be added in a feature branch
// to show code scanning catching issues during pull request review.
// WARNING: Intentionally vulnerable for demo purposes.

const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// Vulnerability: Command Injection (CWE-78)
// CodeQL will flag this as "Uncontrolled command line"
router.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  exec('grep -r "' + searchTerm + '" /var/data/', (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ error: 'Search failed' });
      return;
    }
    res.json({ results: stdout.split('\n') });
  });
});

// Vulnerability: Server-Side Request Forgery (CWE-918)
// CodeQL will flag this as "Uncontrolled data used in network request"
router.get('/api/fetch-url', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await fetch(url);
    const data = await response.text();
    res.json({ content: data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch URL' });
  }
});

// Vulnerability: Prototype Pollution (CWE-1321)
router.post('/api/config', (req, res) => {
  const config = {};
  const userInput = req.body;

  for (const key in userInput) {
    const keys = key.split('.');
    let obj = config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = userInput[key];
  }

  res.json({ config });
});

// Vulnerability: Regex Denial of Service (CWE-1333)
router.post('/api/validate-email', (req, res) => {
  const email = req.body.email;
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const isValid = emailRegex.test(email);
  res.json({ valid: isValid });
});

module.exports = router;
