import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db, { initDb, seedDb } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key_change_in_production';

// Configure Multer for file uploads (resumes, certificates, etc.)
const UPLOAD_DIR = path.join(__dirname, '../public/uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Initialize and seed database
await initDb();
await seedDb();

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Auth Routes ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  });
});

// --- Profile Routes ---
app.get('/api/profile', (req, res) => {
  db.get("SELECT * FROM personal_info LIMIT 1", (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row || {});
  });
});

app.put('/api/profile', authenticateToken, (req, res) => {
  const { name, birthday, address, age, degree, contact, email, linkedin, github, facebook, instagram, resume_url, id } = req.body;
  db.run(`
    UPDATE personal_info
    SET name = ?, birthday = ?, address = ?, age = ?, degree = ?, contact = ?, email = ?, linkedin = ?, github = ?, facebook = ?, instagram = ?, resume_url = ?
    WHERE id = ?
  `, [name, birthday, address, age, degree, contact, email, linkedin, github, facebook, instagram, resume_url, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

// File Upload Endpoint
app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the public URL path
  res.json({ url: `/uploads/${req.file.filename}` });
});

// --- Generic CRUD Helper ---
const createCrudRoutes = (tableName) => {
  // GET all
  app.get(`/api/${tableName}`, (req, res) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      // Parse JSON fields if necessary
      const parsedRows = rows.map(row => {
        if (row.description && typeof row.description === 'string') {
          try { row.description = JSON.parse(row.description); } catch { /* not JSON, leave as-is */ }
        }
        return row;
      });
      res.json(parsedRows);
    });
  });

  // POST
  app.post(`/api/${tableName}`, authenticateToken, (req, res) => {
    const keys = Object.keys(req.body);
    const values = Object.values(req.body).map(v => typeof v === 'object' ? JSON.stringify(v) : v);
    const placeholders = keys.map(() => '?').join(',');
    
    db.run(`INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${placeholders})`, values, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
  });

  // PUT
  app.put(`/api/${tableName}/:id`, authenticateToken, (req, res) => {
    const id = req.params.id;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body).map(v => typeof v === 'object' ? JSON.stringify(v) : v);
    
    const setClause = keys.map(k => `${k} = ?`).join(',');
    values.push(id);
    
    db.run(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`, values, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    });
  });

  // DELETE
  app.delete(`/api/${tableName}/:id`, authenticateToken, (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM ${tableName} WHERE id = ?`, [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    });
  });
};

createCrudRoutes('experience');
createCrudRoutes('education');
createCrudRoutes('certificates');
createCrudRoutes('projects');
createCrudRoutes('social_links');

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
