"""
Pre-prepared fix for the Python vulnerabilities in python/app.py
This file shows what the FIXED version looks like — for use in demo-fix branches
"""

import os
import json
import subprocess
import sqlite3
import hashlib
from urllib.parse import urlparse
from flask import Flask, request, redirect, render_template, send_from_directory
from markupsafe import escape

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', os.urandom(32).hex())

DB_PATH = 'demo.db'
ALLOWED_REDIRECT_HOSTS = {'example.com', 'www.example.com'}
UPLOADS_DIR = os.path.abspath('/var/uploads')


# FIXED: SQL Injection — use parameterized queries
@app.route('/api/users')
def get_user():
    username = request.args.get('username', '')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username = ?", (username,))
    results = c.fetchall()
    conn.close()
    return {'users': results}


# FIXED: Command Injection — use subprocess with argument list, no shell
@app.route('/api/ping')
def ping():
    host = request.args.get('host', '')
    # Validate host is a simple hostname/IP
    if not all(c.isalnum() or c in '.-' for c in host):
        return {'error': 'Invalid host'}, 400

    result = subprocess.run(
        ['ping', '-c', '1', host],
        capture_output=True,
        text=True,
        timeout=10
    )
    return {'output': result.stdout}


# FIXED: Template Injection — use escape() for user input
@app.route('/greet')
def greet():
    name = escape(request.args.get('name', 'World'))
    return f'<h1>Hello {name}!</h1>'


# FIXED: Insecure Deserialization — use JSON instead of pickle
@app.route('/api/load-config', methods=['POST'])
def load_config():
    data = request.get_data()
    config = json.loads(data)
    return {'config': config}


# FIXED: Path Traversal — validate path stays within uploads directory
@app.route('/api/download')
def download_file():
    filename = request.args.get('file', '')
    # Prevent directory traversal
    safe_path = os.path.abspath(os.path.join(UPLOADS_DIR, filename))
    if not safe_path.startswith(UPLOADS_DIR):
        return {'error': 'Invalid file path'}, 400
    return send_from_directory(UPLOADS_DIR, filename)


# FIXED: Weak Hashing — use bcrypt or at minimum SHA-256 with salt
@app.route('/api/register', methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    salt = os.urandom(16).hex()
    hashed = hashlib.sha256((salt + password).encode()).hexdigest()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, salt + ':' + hashed))
    conn.commit()
    conn.close()
    return {'message': 'User registered'}


# FIXED: Open Redirect — validate redirect targets
@app.route('/redirect')
def safe_redirect():
    target = request.args.get('url', '/')
    parsed = urlparse(target)
    # Only allow relative redirects or known hosts
    if parsed.netloc and parsed.netloc not in ALLOWED_REDIRECT_HOSTS:
        return {'error': 'Redirect target not allowed'}, 400
    return redirect(target)


if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1')
