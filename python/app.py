"""
Demo Application — Intentionally Vulnerable Python Code for GHAS Demo
WARNING: This code contains intentional security vulnerabilities for demonstration purposes.
DO NOT use this code in production.
"""

import os
import pickle
import subprocess
import sqlite3
import hashlib
from flask import Flask, request, redirect, render_template_string, send_file

app = Flask(__name__)

# Vulnerability 1: Hardcoded secret key (CWE-798)
app.secret_key = 'super-secret-key-12345'

DB_PATH = 'demo.db'


def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT)''')
    c.execute("INSERT OR IGNORE INTO users VALUES (1, 'admin', 'admin123', 'admin@example.com')")
    conn.commit()
    conn.close()


# Vulnerability 2: SQL Injection (CWE-89)
@app.route('/api/users')
def get_user():
    username = request.args.get('username', '')
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}'"
    c.execute(query)
    results = c.fetchall()
    conn.close()
    return {'users': results}


# Vulnerability 3: Command Injection (CWE-78)
@app.route('/api/ping')
def ping():
    host = request.args.get('host', '')
    result = os.popen(f'ping -c 1 {host}').read()
    return {'output': result}


# Vulnerability 4: Server-Side Template Injection (CWE-1336)
@app.route('/greet')
def greet():
    name = request.args.get('name', 'World')
    template = f'<h1>Hello {name}!</h1>'
    return render_template_string(template)


# Vulnerability 5: Insecure Deserialization (CWE-502)
@app.route('/api/load-config', methods=['POST'])
def load_config():
    data = request.get_data()
    config = pickle.loads(data)
    return {'config': str(config)}


# Vulnerability 6: Path Traversal (CWE-22)
@app.route('/api/download')
def download_file():
    filename = request.args.get('file', '')
    filepath = os.path.join('/var/uploads', filename)
    return send_file(filepath)


# Vulnerability 7: Weak Hashing (CWE-328)
@app.route('/api/register', methods=['POST'])
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    hashed = hashlib.md5(password.encode()).hexdigest()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(f"INSERT INTO users (username, password) VALUES ('{username}', '{hashed}')")
    conn.commit()
    conn.close()
    return {'message': 'User registered'}


# Vulnerability 8: Open Redirect (CWE-601)
@app.route('/redirect')
def unsafe_redirect():
    target = request.args.get('url', '/')
    return redirect(target)


# Vulnerability 9: Arbitrary Code Execution via subprocess (CWE-78)
@app.route('/api/run-report')
def run_report():
    report_name = request.args.get('name', '')
    result = subprocess.run(
        ['python', 'generate_report.py', report_name],
        capture_output=True,
        text=True
    )
    return {'output': result.stdout}


if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0')
