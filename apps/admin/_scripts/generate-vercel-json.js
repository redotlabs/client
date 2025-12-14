import fs from 'fs';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

function createVercelJson(apiDomain) {
  return {
    "rewrites": [
      { "source": "/api/:path*", "destination": `${apiDomain}/api/:path*` },
      { "source": "/api/:path*/", "destination": `${apiDomain}/api/:path*/` },
      { "source": "/(.*)", "destination": "/index.html" },
    ],
  };
}

function generateVercelJson() {
  try {
    const API_DOMAIN = process.env.VITE_API_DOMAIN;

    if (!API_DOMAIN) {
      console.error('VITE_API_DOMAIN is not set');
      process.exit(1);
    }

    const vercelJson = createVercelJson(API_DOMAIN);
    fs.writeFileSync(path.join(__dirname, '../vercel.json'), JSON.stringify(vercelJson, null, 2));
    console.log('Vercel JSON generated successfully');
  } catch (error) {
    console.error('Failed to generate vercel.json', error);
    process.exit(1);
  }
}

generateVercelJson();