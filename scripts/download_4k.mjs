import fs from 'fs';
import path from 'path';
import https from 'https';

// 4K Ultra-Crisp Full HD Resolution (3840px width at q=95)
const imageUrl = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=3840&q=95';
const outputPath = path.resolve('public/images/hero_destination.jpg');

console.log('Downloading 4K Full HD Sapa hero image from:', imageUrl);

const file = fs.createWriteStream(outputPath);

https.get(imageUrl, function(response) {
  if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
    https.get(response.headers.location, function(redirectResponse) {
      redirectResponse.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        console.log('4K Download completed! Size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
      });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      const stats = fs.statSync(outputPath);
      console.log('4K Download completed! Size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
    });
  }
}).on('error', function(err) {
  console.error('Error downloading 4K image:', err.message);
  process.exit(1);
});
