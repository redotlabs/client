import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = fileURLToPath(new URL('../', import.meta.url));

const isProduction = process.env.VERCEL_ENV === "production";
const envFile = isProduction ? ".env.production" : ".env.development";

dotenv.config({ path: path.resolve(__dirname, envFile) });

const apiUrl = process.env.VITE_API_DOMAIN;

console.log("Generating vercel.json for:", __dirname, envFile, '->', apiUrl);

if (!apiUrl) {
  console.warn("VITE_API_DOMAIN is not set");
  process.exit(1);
}

fs.writeFileSync("vercel.json", `{
  "rewrites": [
    { "source": "/api/:path*", "destination": "${apiUrl}/api/:path*" },
    { "source": "/api/:path*/", "destination": "${apiUrl}/api/:path*/" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`);

const vercelJson = fs.readFileSync("vercel.json", "utf8");

console.log(vercelJson);
console.log("vercel.json generated");
