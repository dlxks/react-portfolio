import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

export const initDb = () => {
  return new Promise((resolve) => {
    db.serialize(() => {
      // Create tables
      db.run(`
        CREATE TABLE IF NOT EXISTS personal_info (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          birthday TEXT,
          address TEXT,
          age INTEGER,
          degree TEXT,
          contact TEXT,
          email TEXT,
          linkedin TEXT,
          github TEXT,
          facebook TEXT,
          instagram TEXT,
          resume_url TEXT
        )
      `);

      // Migration: add resume_url to pre-existing databases (ignores error if it already exists)
      db.run(`ALTER TABLE personal_info ADD COLUMN resume_url TEXT`, () => {});

      db.run(`
        CREATE TABLE IF NOT EXISTS experience (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          company TEXT,
          position TEXT,
          duration TEXT,
          description TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS education (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          school TEXT,
          location TEXT,
          level TEXT,
          degree TEXT,
          duration TEXT,
          grade REAL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS certificates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          provider TEXT,
          date TEXT,
          file_url TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS projects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          technology TEXT,
          link TEXT,
          description TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS social_links (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          platform TEXT,
          url TEXT,
          icon TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        )
      `, () => {
        resolve();
      });
    });
  });
};

export const seedDb = async () => {
  // Add an admin user if not exists
  const hashedPassword = await bcrypt.hash('admin123', 10);
  db.get("SELECT * FROM users WHERE username = 'admin'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', hashedPassword]);
    }
  });

  // Check if data exists, if not seed it
  db.get("SELECT COUNT(*) as count FROM personal_info", (err, row) => {
    if (row.count === 0) {
      console.log('Seeding database...');
      
      const profileData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/profile.json')));
      const p = profileData.profile;
      db.run(`
        INSERT INTO personal_info (name, birthday, address, age, degree, contact, email, linkedin, github, facebook, instagram)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [p.name, p.birthday, p.address, p.age, p.degree, p.contact, p.email, p.linkedin, p.github, p.facebook, p.instagram]);

      const resumeData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/resume.json')));
      resumeData.forEach(item => {
        if (item.category === 'experience') {
          db.run("INSERT INTO experience (company, position, duration, description) VALUES (?, ?, ?, ?)",
            [item.company, item.position, item.duration, JSON.stringify(item.description)]);
        } else if (item.category === 'education') {
          db.run("INSERT INTO education (school, location, level, degree, duration, grade) VALUES (?, ?, ?, ?, ?, ?)",
            [item.school, item.location, item.level, item.degree, item.duration, item.grade]);
        }
      });

      const certsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/certificates.json')));
      certsData.forEach(item => {
        db.run("INSERT INTO certificates (title, provider, date, file_url) VALUES (?, ?, ?, ?)",
          [item.title, item.provider, item.date, item.file_url]);
      });

      const projectsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/projects.json')));
      projectsData.forEach(item => {
        db.run("INSERT INTO projects (title, technology, link, description) VALUES (?, ?, ?, ?)",
          [item.title, item.technology, item.link, JSON.stringify(item.description)]);
      });

      console.log('Seeding complete.');
    }
  });

  // Seed social links if empty
  db.get("SELECT COUNT(*) as count FROM social_links", (err, row) => {
    if (row && row.count === 0) {
      db.get("SELECT linkedin, github, facebook, instagram FROM personal_info LIMIT 1", (err, p) => {
        if (p) {
          const links = [
            { platform: 'LinkedIn', url: p.linkedin, icon: 'bi:linkedin' },
            { platform: 'GitHub', url: p.github, icon: 'bi:github' },
            { platform: 'Facebook', url: p.facebook, icon: 'bi:facebook' },
            { platform: 'Instagram', url: p.instagram, icon: 'bi:instagram' }
          ];
          links.forEach(l => {
            if (l.url) {
              db.run("INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)", [l.platform, l.url, l.icon]);
            }
          });
        }
      });
    }
  });
};

export default db;
