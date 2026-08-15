import fs from 'fs';
import path from 'path';
import potrace from 'potrace';

const inputImagePath = path.resolve('public/images/hero_destination.jpg');
const outputSvgPath = path.resolve('public/images/traced_landscape.svg');

console.log('Tracing image:', inputImagePath);

const params = {
  threshold: 128,
  steps: 4,
  optCurve: true,
  turnpolicy: potrace.Potrace.TURNPOLICY_MINORITY,
  turdSize: 10,
  alphaMax: 1.0,
  optTolerance: 0.2
};

potrace.posterize(inputImagePath, params, function(err, svg) {
  if (err) {
    console.error('Error tracing image:', err);
    process.exit(1);
  }
  fs.writeFileSync(outputSvgPath, svg, 'utf-8');
  console.log('Tracing complete! Saved to:', outputSvgPath);
  console.log('SVG length:', svg.length);
});
