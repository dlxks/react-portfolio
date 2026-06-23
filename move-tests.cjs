const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const testDir = path.join(__dirname, 'tests');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.test.js') || file.endsWith('.test.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const testFiles = walk(srcDir);

testFiles.forEach(file => {
  const relativePath = path.relative(srcDir, file);
  const targetPath = path.join(testDir, relativePath);
  
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let content = fs.readFileSync(file, 'utf8');

  // Rewrite imports
  content = content.replace(/from\s+['"](\.[^'"]+)['"]/g, (match, importPath) => {
    const originalDir = path.dirname(file);
    const resolvedImport = path.resolve(originalDir, importPath);
    let newImportPath = path.relative(targetDir, resolvedImport);
    newImportPath = newImportPath.replace(/\\/g, '/');
    if (!newImportPath.startsWith('.')) {
      newImportPath = './' + newImportPath;
    }
    return `from '${newImportPath}'`;
  });

  content = content.replace(/import\s+['"](\.[^'"]+)['"]/g, (match, importPath) => {
    const originalDir = path.dirname(file);
    const resolvedImport = path.resolve(originalDir, importPath);
    let newImportPath = path.relative(targetDir, resolvedImport);
    newImportPath = newImportPath.replace(/\\/g, '/');
    if (!newImportPath.startsWith('.')) {
      newImportPath = './' + newImportPath;
    }
    return `import '${newImportPath}'`;
  });

  content = content.replace(/vi\.mock\(['"](\.[^'"]+)['"]/g, (match, importPath) => {
    const originalDir = path.dirname(file);
    const resolvedImport = path.resolve(originalDir, importPath);
    let newImportPath = path.relative(targetDir, resolvedImport);
    newImportPath = newImportPath.replace(/\\/g, '/');
    if (!newImportPath.startsWith('.')) {
      newImportPath = './' + newImportPath;
    }
    return `vi.mock('${newImportPath}'`;
  });

  fs.writeFileSync(targetPath, content);
  fs.unlinkSync(file);
});

// Move setupTests.js
const setupSrc = path.join(srcDir, 'setupTests.js');
const setupDest = path.join(testDir, 'setupTests.js');
if (fs.existsSync(setupSrc)) {
  fs.copyFileSync(setupSrc, setupDest);
  fs.unlinkSync(setupSrc);
}
