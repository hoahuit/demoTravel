import fs from 'fs';
import path from 'path';
import https from 'https';

const imageUrl = 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const outputPath = path.resolve('public/images/hero_destination.jpg');

console.log('Downloading new hero image from:', imageUrl);

const file = fs.createWriteStream(outputPath);

https.get(imageUrl, function(response) {
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
    // Follow redirect
    https.get(response.headers.location, function(redirectResponse) {
      redirectResponse.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Download completed! Saved to:', outputPath);
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Download completed! Saved to:', outputPath);
    });
  }
}).on('error', function(err) {
  fs.unlink(outputPath, () => {});
  console.error('Error downloading image:', err.message);
  process.exit(1);
});
