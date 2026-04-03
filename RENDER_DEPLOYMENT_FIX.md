# Render.com Deployment Fix for PDF Generation

## Problem
Chromium is not installed on Render.com's servers, causing PDF generation to fail with:
```
Could not find Chrome (ver. 146.0.7680.153)
```

## Solution Applied

### 1. Added Postinstall Script
**File**: `krafo_api/package.json`

Added `"postinstall": "npx puppeteer browsers install chrome"` to automatically install Chromium after npm install.

### 2. Updated PDF Generator
**File**: `krafo_api/utils/pdfGenerator.js`

Added support for `PUPPETEER_EXECUTABLE_PATH` environment variable to allow manual Chromium path configuration.

## Deployment Steps for Render.com

### Option A: Automatic Installation (Recommended)

1. **Commit and push the changes**:
   ```bash
   git add krafo_api/package.json krafo_api/utils/pdfGenerator.js
   git commit -m "fix: Add Chromium installation for Render deployment"
   git push
   ```

2. **Render will automatically**:
   - Run `npm install`
   - Trigger the `postinstall` script
   - Install Chromium to `/opt/render/.cache/puppeteer/`

3. **Verify in Render logs**:
   Look for: `chrome@146.0.7680.153 downloaded to /opt/render/.cache/puppeteer/chrome/linux-146.0.7680.153`

### Option B: Manual Configuration (If Option A Fails)

If the postinstall script doesn't work, you can use a custom build command:

1. **Go to Render Dashboard** → Your Service → Settings

2. **Update Build Command**:
   ```bash
   npm install && npx puppeteer browsers install chrome
   ```

3. **Save and redeploy**

### Option C: Use Chromium from System (Advanced)

If Render has system Chromium installed:

1. **Add Environment Variable** in Render Dashboard:
   - Key: `PUPPETEER_EXECUTABLE_PATH`
   - Value: `/usr/bin/chromium-browser` or `/usr/bin/google-chrome`

2. **Or install via apt** (requires Dockerfile):
   ```dockerfile
   RUN apt-get update && apt-get install -y chromium
   ```

## Verification

After deployment, check the logs when PDF generation is attempted:

### Success Indicators:
```
✅ PDF generated successfully
✅ PDF size: XXXXX bytes
```

### Failure Indicators:
```
❌ [PDFGenerator] Failed to generate PDF
❌ Could not find Chrome
```

## Testing Locally

To test the fix locally (simulating Render environment):

1. **Delete local Chromium cache**:
   ```bash
   # Windows
   rmdir /s /q "%USERPROFILE%\.cache\puppeteer"
   
   # Linux/Mac
   rm -rf ~/.cache/puppeteer
   ```

2. **Run postinstall script**:
   ```bash
   cd krafo_api
   npm run postinstall
   ```

3. **Verify Chromium is installed**:
   ```bash
   # Windows
   dir "%USERPROFILE%\.cache\puppeteer\chrome"
   
   # Linux/Mac
   ls ~/.cache/puppeteer/chrome
   ```

4. **Test PDF generation**:
   ```bash
   node ../debug-pdf-generation.js
   ```

## Troubleshooting

### Issue: Postinstall script times out
**Solution**: Increase build timeout in Render settings or use Option B (manual build command)

### Issue: Permission denied
**Solution**: Render should have write access to `/opt/render/.cache/`. If not, contact Render support.

### Issue: Out of memory during Chromium download
**Solution**: Upgrade Render plan or use a lighter alternative like `puppeteer-core` with system Chromium

### Issue: Chromium crashes on launch
**Solution**: The launch args we added should handle this:
- `--no-sandbox` - Required for containerized environments
- `--disable-setuid-sandbox` - Disables sandboxing
- `--disable-dev-shm-usage` - Uses /tmp instead of /dev/shm

If still crashing, add these args:
```javascript
'--disable-gpu',
'--disable-dev-shm-usage',
'--disable-software-rasterizer',
'--disable-extensions'
```

## Alternative: Use a PDF Generation Service

If Puppeteer continues to be problematic on Render, consider:

1. **PDFShift** (https://pdfshift.io/) - API-based PDF generation
2. **DocRaptor** (https://docraptor.com/) - HTML to PDF API
3. **Cloudinary** (already in use) - Can generate PDFs from HTML
4. **AWS Lambda** - Separate serverless function for PDF generation

## Cost Considerations

- Chromium adds ~300MB to deployment size
- May require upgrading Render plan for sufficient disk space
- Consider using a separate service for PDF generation if cost is a concern

## Next Steps

1. ✅ Commit and push changes
2. ⏳ Wait for Render to redeploy
3. ✅ Test PDF download from production
4. ✅ Monitor logs for any errors
5. ✅ Update this document with any additional findings

---

**Last Updated**: March 27, 2026
**Status**: Ready for deployment
