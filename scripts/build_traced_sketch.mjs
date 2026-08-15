import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/images/traced_lineart.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Match path d attribute
const pathMatch = svgContent.match(/<path[^>]*d="([^"]+)"/);
if (!pathMatch) {
  console.error('No path found in SVG');
  process.exit(1);
}

const fullD = pathMatch[1];

// Split by 'M' or 'm' commands to get individual subpath contours
const subpaths = fullD.split(/(?=[Mm])/).filter(p => p.trim().length > 0);
console.log('Total subpaths found:', subpaths.length);

// Analyze coordinate bounds of each subpath
const categorized = {
  leftCliff: [],
  rightCliff: [],
  bgMountains: [],
  housesAndTrees: [],
  waterAndReflection: [],
  generalDetails: []
};

subpaths.forEach((subpath) => {
  // Extract all numbers to estimate bounding box
  const nums = subpath.match(/-?\d+(\.\d+)?/g);
  if (!nums || nums.length < 2) return;

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (let i = 0; i < nums.length - 1; i += 2) {
    const x = parseFloat(nums[i]);
    const y = parseFloat(nums[i + 1]);
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const avgX = (minX + maxX) / 2;
  const avgY = (minY + maxY) / 2;

  // Categorize based on photo geometry for 5952x3968 6K Pexels image
  if (avgY > 2400) {
    categorized.waterAndReflection.push(subpath);
  } else if (avgX < 1800) {
    categorized.leftCliff.push(subpath);
  } else if (avgX > 3900) {
    categorized.rightCliff.push(subpath);
  } else if (avgY < 1750) {
    categorized.bgMountains.push(subpath);
  } else {
    categorized.housesAndTrees.push(subpath);
  }
});

console.log('Categorized counts:');
console.log('- Left Cliff:', categorized.leftCliff.length);
console.log('- Right Cliff:', categorized.rightCliff.length);
console.log('- Background Mountains:', categorized.bgMountains.length);
console.log('- Houses & Trees:', categorized.housesAndTrees.length);
console.log('- Water & Reflection:', categorized.waterAndReflection.length);

// Write categorized paths to a JSON file for HeroSvgSketch.tsx
const outputJson = {
  leftCliff: categorized.leftCliff.join(' '),
  rightCliff: categorized.rightCliff.join(' '),
  bgMountains: categorized.bgMountains.join(' '),
  housesAndTrees: categorized.housesAndTrees.join(' '),
  waterAndReflection: categorized.waterAndReflection.join(' ')
};

fs.writeFileSync(
  path.resolve('src/data/tracedPaths.json'),
  JSON.stringify(outputJson),
  'utf-8'
);

console.log('Successfully saved traced paths to src/data/tracedPaths.json');
