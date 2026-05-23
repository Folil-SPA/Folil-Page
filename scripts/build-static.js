const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'build');

const files = [
  'index.html',
  'robots.txt',
  'sitemap.xml',
  'google18f72cc9585251b0.html'
];

const dirs = [
  'logos'
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const source = path.join(root, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, path.join(outDir, file));
  }
}

for (const dir of dirs) {
  const source = path.join(root, dir);
  if (fs.existsSync(source)) {
    fs.cpSync(source, path.join(outDir, dir), { recursive: true });
  }
}

console.log('Static files copied to build/');
