import fs from 'fs';
import path from 'path';
import https from 'https';

const imageUrl = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&auto=format&fit=crop';
const outputPath = path.resolve('public/images/hero_destination.jpg');

console.log('Downloading Sapa Mường Hoa hero image from:', imageUrl);

const file = fs.createWriteStream(outputPath);

https.get(imageUrl, function(response) {
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
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
  console.error('Error downloading image:', err.message);
  process.exit(1);
});
