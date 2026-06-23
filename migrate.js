/* eslint-env node */
import sqlite3 from 'sqlite3';
import fs from 'fs';
import process from 'process';

const db = new sqlite3.Database('./server/database.sqlite', (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
    process.exit(1);
  }
});

let sqlOutput = `-- Seeding data from sqlite\n\n`;

const generateInserts = (tableName, mapRow = (row) => row) => {
  return new Promise((resolve) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) {
        console.error(`Error reading ${tableName}:`, err.message);
        return resolve();
      }

      if (rows.length === 0) {
        return resolve();
      }

      sqlOutput += `-- Data for ${tableName}\n`;
      
      rows.forEach(row => {
        const mapped = mapRow(row);
        const columns = Object.keys(mapped).join(', ');
        const values = Object.values(mapped).map(v => {
          if (v === null || v === undefined) return 'NULL';
          if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
          if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
          return v;
        }).join(', ');
        
        sqlOutput += `INSERT INTO ${tableName} (${columns}) VALUES (${values});\n`;
      });
      sqlOutput += '\n';
      resolve();
    });
  });
};

const runMigration = async () => {
  try {
    sqlOutput += `DELETE FROM personal_info;\n`;
    sqlOutput += `DELETE FROM experience;\n`;
    sqlOutput += `DELETE FROM education;\n`;
    sqlOutput += `DELETE FROM certificates;\n`;
    sqlOutput += `DELETE FROM projects;\n`;
    sqlOutput += `DELETE FROM social_links;\n\n`;

    await generateInserts('personal_info', (row) => {
      const { ...rest } = row;
      delete rest.id;
      return rest;
    });

    await generateInserts('experience', (row) => {
      const { ...rest } = row;
      delete rest.id;
      try { rest.description = JSON.parse(rest.description); } catch { /* ignore */ }
      return rest;
    });

    await generateInserts('education', (row) => {
      const { ...rest } = row;
      delete rest.id;
      return rest;
    });

    await generateInserts('certificates', (row) => {
      const { ...rest } = row;
      delete rest.id;
      return rest;
    });

    await generateInserts('projects', (row) => {
      const { ...rest } = row;
      delete rest.id;
      try { rest.description = JSON.parse(rest.description); } catch { /* ignore */ }
      return rest;
    });

    await generateInserts('social_links', (row) => {
      const { ...rest } = row;
      delete rest.id;
      return rest;
    });

    fs.writeFileSync('seed.sql', sqlOutput);
    console.log("Generated seed.sql successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    db.close();
  }
};

runMigration();
