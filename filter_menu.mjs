import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Read the file as a string
const filePath = path.resolve('./src/data/menuData.js');
let content = fs.readFileSync(filePath, 'utf-8');

// Use regex to extract all objects or just evaluate it
// The file is a module, so let's parse it carefully.
// Instead of evaluating, let's just do a simple line-by-line filter.
const lines = content.split('\n');
const newLines = [];
const seenImages = new Set();

for (let line of lines) {
  if (line.trim().startsWith('{ id:')) {
    const match = line.match(/image:\s*'([^']+)'/);
    if (match) {
      const imgUrl = match[1];
      if (seenImages.has(imgUrl)) {
        // Skip this duplicate line
        continue;
      } else {
        seenImages.add(imgUrl);
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  } else {
    newLines.push(line);
  }
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
console.log('Filtered ' + seenImages.size + ' unique images, removed duplicates.');
