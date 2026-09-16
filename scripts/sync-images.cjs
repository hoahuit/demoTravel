const fs = require('fs');
const path = require('path');
const http = require('http');

const REMOTE_BASE = 'http://216.92.34.22:3001';
const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// 1. Scan mockData.ts for all /uploads/ paths
const mockDataContent = fs.readFileSync(path.join(__dirname, 'src', 'data', 'mockData.ts'), 'utf8');
const regex = /\/uploads\/([a-zA-Z0-9_\.\-]+)/g;
const imageSet = new Set();

let match;
while ((match = regex.exec(mockDataContent)) !== null) {
  if (match[1]) {
    imageSet.add(match[1]);
  }
}

console.log(`Found ${imageSet.size} unique upload files in mockData.ts`);

// 2. Fetch live tours & products from API to discover all images
function fetchJson(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

function downloadFile(filename) {
  return new Promise((resolve) => {
    const destPath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100) {
      console.log(`[EXISTS] ${filename}`);
      return resolve({ filename, success: true, cached: true });
    }

    const url = `${REMOTE_BASE}/uploads/${encodeURIComponent(filename)}`;
    const fileStream = fs.createWriteStream(destPath);

    const req = http.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const size = fs.statSync(destPath).size;
          console.log(`[DOWNLOADED] ${filename} (${Math.round(size / 1024)} KB)`);
          resolve({ filename, success: true, size });
        });
      } else {
        fileStream.close();
        fs.unlink(destPath, () => {});
        console.warn(`[HTTP ${res.statusCode}] Failed: ${filename}`);
        resolve({ filename, success: false, statusCode: res.statusCode });
      }
    });

    req.on('error', (err) => {
      fileStream.close();
      fs.unlink(destPath, () => {});
      console.error(`[ERROR] ${filename}: ${err.message}`);
      resolve({ filename, success: false, error: err.message });
    });
  });
}

async function run() {
  console.log(`Connecting to ${REMOTE_BASE} to scan live tours & products...`);
  const [tours, products] = await Promise.all([
    fetchJson(`${REMOTE_BASE}/tours`),
    fetchJson(`${REMOTE_BASE}/products`)
  ]);

  if (Array.isArray(tours)) {
    const jsonStr = JSON.stringify(tours);
    let m;
    while ((m = regex.exec(jsonStr)) !== null) {
      if (m[1]) imageSet.add(m[1]);
    }
  }

  if (Array.isArray(products)) {
    const jsonStr = JSON.stringify(products);
    let m;
    while ((m = regex.exec(jsonStr)) !== null) {
      if (m[1]) imageSet.add(m[1]);
    }
  }

  const allFiles = Array.from(imageSet);
  console.log(`Total unique files to download: ${allFiles.length}`);

  let successCount = 0;
  let failCount = 0;

  for (const file of allFiles) {
    const res = await downloadFile(file);
    if (res.success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n=== DOWNLOAD SUMMARY ===`);
  console.log(`Successfully saved: ${successCount}`);
  console.log(`Failed / Not Found on remote: ${failCount}`);
  console.log(`Saved into: ${UPLOAD_DIR}`);
}

run();
