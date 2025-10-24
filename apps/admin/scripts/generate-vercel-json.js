import fs from "fs";

const apiUrl = process.env.VITE_API_DOMAIN;

fs.writeFileSync("vercel.json", `{
  "rewrites": [
    { "source": "/api/:path*", "destination": "${apiUrl}/api/:path*" },
    { "source": "/api/:path*/", "destination": "${apiUrl}/api/:path*/" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`);
