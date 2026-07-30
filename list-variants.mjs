import fs from 'fs';
import path from 'path';

const GENERATIONS_DIR = 'src/data/generations';
const files = fs.readdirSync(GENERATIONS_DIR).filter(f => f.endsWith('.json'));

const allVariants = [];

for (const file of files) {
  const filePath = path.join(GENERATIONS_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  if (!data.coreVariants) continue;
  
  const cv = data.coreVariants;
  
  if (cv.dieselVariants && Array.isArray(cv.dieselVariants)) {
    for (const v of cv.dieselVariants) {
      const name = typeof v === 'string' ? v : (v?.name || JSON.stringify(v));
      allVariants.push({ file, type: 'diesel', variant: name });
    }
  }
  
  if (cv.petrolVariants && Array.isArray(cv.petrolVariants)) {
    for (const v of cv.petrolVariants) {
      const name = typeof v === 'string' ? v : (v?.name || JSON.stringify(v));
      allVariants.push({ file, type: 'petrol', variant: name });
    }
  }
}

// Output grouped by file
let currentFile = '';
for (const v of allVariants) {
  if (v.file !== currentFile) {
    currentFile = v.file;
    console.log(`\n=== ${v.file} ===`);
  }
  console.log(`  [${v.type}] ${v.variant}`);
}

console.log(`\nTotal: ${allVariants.length} variants across ${new Set(allVariants.map(v => v.file)).size} files`);
