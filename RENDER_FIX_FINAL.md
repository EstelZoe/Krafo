# Final Render.com Fix for Chromium Persistence

## Problem
Render's build cache (`/opt/render/.cache/`) is NOT available at runtime. Chromium installed during build disappears when the app starts.

## Solution
Install Chromium to the project directory (`/opt/render/project/.cache/`) which persists between build and runtime.

## Steps to Fix

### 1. Commit the Changes
```bash
git add krafo_api/package.json krafo_api/utils/pdfGenerator.js krafo_api/install-chromium.sh
git commit -m "fix: Use persistent cache for Chromium on Render"
git push
```

### 2. Update Render Settings

Go to Render Dashboard → Your Service → Settings:

#### A. Update Start Command
Change from:
```
node index.js
```

To:
```
bash install-chromium.sh
```

#### B. Add Environment Variable
Add this environment variable:
- **Key**: `PUPPETEER_CACHE_DIR`
- **Value**: `/opt/render/project/.cache/puppeteer`

### 3. Deploy

Click "Manual Deploy" → "Deploy latest commit"

## What This Does

1. **install-chromium.sh** checks if Chromium exists in the project directory
2. If not found, it installs Chromium using `npx puppeteer browsers install chrome`
3. The `PUPPETEER_CACHE_DIR` environment variable tells Puppeteer to use `/opt/render/project/.cache/`
4. This directory persists between deployments
5. Chromium only needs to be downloaded once

## Expected Logs

### First Deployment:
```
Chromium not found. Installing...
chrome@146.0.7680.153 /opt/render/project/.cache/puppeteer/chrome/linux-146.0.7680.153/chrome-linux64/chrome
Chromium installed successfully
Server is running on port 10000
```

### Subsequent Deployments:
```
Chromium already installed at /opt/render/project/.cache/puppeteer/chrome/linux-146.0.7680.153/chrome-linux64/chrome
Server is running on port 10000
```

## Alternative: Use @sparticuz/chromium

If this still doesn't work, we can use a pre-built Chromium package designed for serverless environments:

```bash
npm install @sparticuz/chromium puppeteer-core
```

Then update pdfGenerator.js to use it. This is a more reliable solution for platforms like Render.

## Cost Note

The project directory has limited space. Chromium is ~300MB. If you hit disk limits, consider:
1. Upgrading Render plan
2. Using @sparticuz/chromium (smaller, optimized)
3. Using an external PDF service

---

**Next Step**: Update the Start Command in Render settings to `bash install-chromium.sh`
