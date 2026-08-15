import fs from 'fs';
import path from 'path';
import potrace from 'potrace';

const inputImagePath = path.resolve('public/images/hero_destination.jpg');
const outputLineArtPath = path.resolve('public/images/traced_lineart.svg');

console.log('Generating Line-Art SVG from:', inputImagePath);

// High-fidelity line-art extraction
const params = {
  threshold: 110,
  turdSize: 8,
  alphaMax: 0.8,
  optCurve: true,
  optTolerance: 0.3,
  color: '#1e293b',
  background: 'transparent'
};

potrace.trace(inputImagePath, params, function(err, svg) {
  if (err) {
    console.error('Error generating line-art:', err);
    process.exit(1);
  }
  fs.writeFileSync(outputLineArtPath, svg, 'utf-8');
  console.log('Line-art complete! Saved to:', outputLineArtPath);
  console.log('SVG length:', svg.length);
});
