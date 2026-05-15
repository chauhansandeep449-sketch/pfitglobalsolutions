# Vercel Deployment Troubleshooting Guide

Solutions for common issues encountered during and after Vercel deployment.

---

## Table of Contents

1. [Build & Deployment Issues](#build--deployment-issues)
2. [Frontend Issues](#frontend-issues)
3. [Backend Issues](#backend-issues)
4. [CORS & Connection Issues](#cors--connection-issues)
5. [Performance Issues](#performance-issues)
6. [Domain & SSL Issues](#domain--ssl-issues)
7. [Rollback & Recovery](#rollback--recovery)

---

## Build & Deployment Issues

### ❌ Error: "Cannot find module 'package.json'"

**Symptoms:**
```
Build FAILED: Cannot find module '@vitejs/plugin-react'
npm ERR! code ENOENT
```

**Cause:** Missing `package.json` in the configured root directory

**Solution:**

1. Verify file exists:
   ```bash
   cat frontend/package.json  # or backend/package.json
   ```

2. Check Vercel project settings:
   - Go to **Settings → General**
   - Verify **"Root Directory"** is set correctly:
     - Frontend: `/frontend`
     - Backend: `/backend`

3. Commit and push:
   ```bash
   git add .
   git commit -m "Ensure package.json exists"
   git push origin main
   ```

4. Manually trigger redeploy in Vercel:
   - Go to **Deployments**
   - Click **"..."** → **"Redeploy"**

---

### ❌ Error: "Build command returned non-zero exit code"

**Symptoms:**
```
error: Build failed with exit code 1
npm ERR! code ELIFECYCLE
```

**Cause:** Build script failed (missing dependencies, syntax errors, etc.)

**Solution:**

1. Check build script in package.json:
   ```bash
   grep '"build"' frontend/package.json
   # Output should be: "build": "vite build"
   ```

2. Run build locally to see exact error:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. Fix the error shown locally
4. Commit and push:
   ```bash
   git add .
   git commit -m "Fix build error"
   git push origin main
   ```

---

### ❌ Error: "Cannot find module 'express'"

**Symptoms:**
```
Error: Cannot find module 'express'
at Function.Module._load (internal/modules/loader.js:...)
```

**Cause:** Dependencies not installed or missing in `package.json`

**Solution:**

1. Check backend/package.json has required packages:
   ```bash
   cat backend/package.json
   # Should include:
   # "express", "cors", "body-parser", etc.
   ```

2. Install missing packages:
   ```bash
   cd backend
   npm install express cors body-parser dotenv
   ```

3. Update package.json:
   ```bash
   git add backend/package.json backend/package-lock.json
   git commit -m "Add missing dependencies"
   git push origin main
   ```

---

### ❌ Error: "Deployment crashed - no output from function"

**Symptoms:**
- Deployment shows "Build successful" but function returns 502 Bad Gateway
- Backend returns error when accessed

**Cause:** Server.js not exporting correctly or throwing error on startup

**Solution:**

1. Check backend/server.js exports:
   ```javascript
   // Should have module.exports at the end
   module.exports = app
   ```

2. Check for errors on startup:
   ```javascript
   // Add error handling
   const server = app.listen(process.env.PORT || 3000, () => {
     console.log('Server started successfully')
   })

   server.on('error', (err) => {
     console.error('Server error:', err)
     process.exit(1)
   })
   ```

3. Test locally:
   ```bash
   cd backend
   npm start
   curl http://localhost:3000/api/health
   ```

4. Check Vercel logs:
   - Go to **Deployments**
   - Click on failed deployment
   - Click **"Function Logs"** to see error details

---

## Frontend Issues

### ❌ Error: "Cannot GET /"

**Symptoms:**
- Frontend URL returns "Cannot GET /"
- Page appears blank or shows 404

**Cause:** React routing misconfigured or build output directory wrong

**Solution:**

1. Check vercel.json configuration:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "react"
   }
   ```

2. Verify build produces `/dist` folder:
   ```bash
   cd frontend
   npm run build
   ls -la dist/
   # Should show: index.html, assets/, etc.
   ```

3. Add routing configuration to vercel.json:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "react",
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

4. Commit and redeploy:
   ```bash
   git add frontend/vercel.json
   git commit -m "Fix React routing"
   git push origin main
   ```

---

### ❌ Error: "Blank page or 'undefined' displayed"

**Symptoms:**
- Page loads but shows nothing or shows "undefined"
- JavaScript console shows errors

**Cause:** Frontend environment variable not set

**Solution:**

1. Check if using environment variables:
   ```javascript
   // frontend/src/App.jsx
   const API_URL = process.env.VITE_API_URL
   console.log('API URL:', API_URL)  // Check if undefined
   ```

2. Set environment variable in Vercel:
   - Go to **Frontend Project → Settings → Environment Variables**
   - Click **"Add New"**
   - Name: `VITE_API_URL`
   - Value: `https://pfitglobal-backend.vercel.app/api`
   - Scope: `Production`
   - Click **"Save"**

3. Redeploy:
   - Go to **Deployments**
   - Click **"..."** → **"Redeploy"**

4. Check in browser:
   - Open DevTools (F12)
   - Console tab
   - Type: `console.log(import.meta.env.VITE_API_URL)`

---

### ❌ Error: "Images not loading / 404 on assets"

**Symptoms:**
- Page loads but images missing
- Console shows: `GET /images/logo.png 404 (Not Found)`

**Cause:** Image paths incorrect or assets not included in build

**Solution:**

1. Place images in `frontend/public/` directory:
   ```bash
   mkdir -p frontend/public/images
   mv your-images.png frontend/public/images/
   ```

2. Reference in code:
   ```javascript
   // ✅ Correct
   <img src="/images/logo.png" alt="Logo" />
   
   // ❌ Wrong
   <img src="./images/logo.png" alt="Logo" />
   <img src="images/logo.png" alt="Logo" />
   ```

3. Or use import:
   ```javascript
   import logo from '../public/images/logo.png'
   
   <img src={logo} alt="Logo" />
   ```

4. Commit and deploy:
   ```bash
   git add frontend/public/
   git commit -m "Add public assets"
   git push origin main
   ```

---

## Backend Issues

### ❌ Error: "Cannot POST /api/contact"

**Symptoms:**
- Form submission returns 404
- Endpoint not found

**Cause:** Routes not configured correctly in server.js

**Solution:**

1. Check backend/server.js has route:
   ```javascript
   app.post('/api/contact', (req, res) => {
     // Handle contact form
   })
   ```

2. Check backend/vercel.json routes all requests to server.js:
   ```json
   {
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. Test route locally:
   ```bash
   cd backend
   npm start
   
   # In another terminal
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
   ```

4. Redeploy backend:
   ```bash
   git add .
   git commit -m "Verify backend routes"
   git push origin main
   ```

---

### ❌ Error: "502 Bad Gateway"

**Symptoms:**
- Backend URL returns "502 Bad Gateway"
- Or shows "Error 502: Service Temporarily Unavailable"

**Cause:** Backend crashed or timed out

**Solution:**

1. Check Vercel Function Logs:
   - Go to **Backend Project → Deployments**
   - Click on deployment
   - Go to **"Functions"** tab
   - Look for errors

2. Check server.js for infinite loops or hangs:
   ```javascript
   // ❌ Bad - will hang
   while(true) {
     // infinite loop
   }
   
   // ✅ Good - async operation with timeout
   setTimeout(() => {
     console.log('Task completed')
   }, 5000)
   ```

3. Add timeout handling:
   ```javascript
   app.use((req, res, next) => {
     res.setTimeout(25000, () => {
       res.status(408).json({ error: 'Request timeout' })
     })
     next()
   })
   ```

4. Check for memory leaks:
   - Look for unclosed database connections
   - Ensure file streams are closed
   - Clear timers and intervals

5. Redeploy:
   ```bash
   git add .
   git commit -m "Fix backend timeout issues"
   git push origin main
   ```

---

### ❌ Error: "Request timeout (30+ seconds)"

**Symptoms:**
- Request takes forever to complete
- Eventually returns timeout error

**Cause:** Backend operation taking too long

**Solution:**

1. Optimize database queries:
   ```javascript
   // ❌ Slow - fetches all data
   const data = await Collection.find({})
   
   // ✅ Fast - fetches limited data
   const data = await Collection.find({}).limit(100)
   ```

2. Add indexes to database:
   ```javascript
   db.collection.createIndex({ email: 1 })
   ```

3. Use caching for static data:
   ```javascript
   const cache = {}
   
   app.get('/api/services', (req, res) => {
     if (cache.services) {
       return res.json(cache.services)
     }
     // ... fetch from database
   })
   ```

---

## CORS & Connection Issues

### ❌ Error: "Access to XMLHttpRequest blocked by CORS policy"

**Symptoms:**
```
Access to XMLHttpRequest at 'https://pfitglobal-backend.vercel.app/api/contact'
from origin 'https://pfitglobal-frontend.vercel.app' has been blocked by CORS policy
```

**Cause:** CORS headers not configured correctly

**Solution:**

1. Check backend/server.js has CORS configured:
   ```javascript
   const cors = require('cors')
   
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }))
   ```

2. Verify `CORS_ORIGIN` environment variable:
   - Go to **Backend Project → Settings → Environment Variables**
   - Check `CORS_ORIGIN` = `https://pfitglobal-frontend.vercel.app`
   - Not `localhost` or other URL

3. Redeploy backend:
   - Go to **Deployments**
   - Click **"..."** → **"Redeploy"**
   - Wait 2-3 minutes

4. Test CORS headers:
   ```bash
   curl -i -X OPTIONS https://pfitglobal-backend.vercel.app/api/health \
     -H "Origin: https://pfitglobal-frontend.vercel.app" \
     -H "Access-Control-Request-Method: POST"
   
   # Should see CORS headers:
   # Access-Control-Allow-Origin: https://pfitglobal-frontend.vercel.app
   ```

---

### ❌ Error: "Frontend cannot connect to backend"

**Symptoms:**
- Form submission silently fails
- Network request shows pending then fails
- Console shows connection refused or timeout

**Cause:** Wrong backend URL or backend not running

**Solution:**

1. Verify backend URL is correct:
   ```javascript
   // frontend/src/App.jsx
   console.log('API URL:', process.env.VITE_API_URL)
   ```

2. Test backend is running:
   ```bash
   # Try accessing directly
   curl https://pfitglobal-backend.vercel.app/api/health
   
   # Should return successful response
   ```

3. Check network tab in DevTools:
   - F12 → Network tab
   - Submit form
   - Look for failed request to backend
   - Click request to see URL and error details

4. Update frontend API URL:
   - Go to **Frontend Project → Settings → Environment Variables**
   - Set `VITE_API_URL` to correct backend URL
   - Redeploy

---

## Performance Issues

### ❌ Issue: "Website loads slowly (> 5 seconds)"

**Symptoms:**
- Page takes long time to load
- Users see blank page initially

**Cause:** Large bundle size, unoptimized images, or slow API

**Solution:**

1. Analyze bundle size:
   ```bash
   cd frontend
   npm install vite-plugin-visualizer --save-dev
   ```

   Update vite.config.js:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import visualizer from 'vite-plugin-visualizer'
   
   export default defineConfig({
     plugins: [react(), visualizer()],
   })
   ```

   Run build:
   ```bash
   npm run build
   # Will generate stats.html to analyze
   ```

2. Optimize images:
   ```bash
   # Install image optimizer
   npm install --save-dev @squoosh/cli
   
   # Optimize images
   squoosh-cli --webp ./frontend/public/images/*
   ```

3. Enable compression:
   ```javascript
   // backend/server.js
   const compression = require('compression')
   app.use(compression())
   ```

4. Use Vercel Analytics:
   - Go to **Frontend Project → Analytics**
   - View Core Web Vitals
   - Check which pages are slow

---

### ❌ Issue: "Form submission is slow"

**Symptoms:**
- Users wait 5+ seconds after clicking submit
- No feedback given

**Solution:**

1. Add loading state to form:
   ```javascript
   const [isLoading, setIsLoading] = useState(false)
   
   const handleSubmit = async (e) => {
     e.preventDefault()
     setIsLoading(true)
     try {
       const response = await fetch(`${API_URL}/contact`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       })
       setIsLoading(false)
       alert(response.status === 200 ? 'Success!' : 'Error')
     } catch (error) {
       setIsLoading(false)
       alert('Connection error')
     }
   }
   
   // Show loading state
   <button disabled={isLoading}>
     {isLoading ? 'Sending...' : 'Submit'}
   </button>
   ```

2. Check backend response time:
   ```bash
   time curl https://pfitglobal-backend.vercel.app/api/contact
   ```

3. Optimize backend:
   - Move slow operations to background jobs
   - Add caching
   - Optimize database queries

---

## Domain & SSL Issues

### ❌ Error: "Domain verification failed"

**Symptoms:**
- Domain not accessible
- Shows "Domain not found" or DNS error

**Cause:** DNS records not configured correctly

**Solution:**

1. Check DNS propagation:
   - Go to [dnschecker.org](https://dnschecker.org)
   - Enter your domain
   - Should show correct Vercel nameservers

2. For Vercel DNS (easiest):
   - Go to **Project Settings → Domains**
   - Click on domain
   - Should show "Verified ✓"
   - If not, wait 24-48 hours

3. For external DNS:
   - Copy nameservers from Vercel
   - Go to domain registrar (Namecheap, etc.)
   - Update nameservers
   - Wait 24-48 hours for propagation

4. Force DNS update:
   ```bash
   # Clear DNS cache (macOS)
   sudo dscacheutil -flushcache
   
   # Check DNS resolution
   nslookup yourdomain.com
   ```

---

### ❌ Error: "SSL certificate issue / Insecure connection"

**Symptoms:**
- Browser shows red warning
- HTTPS not working
- Shows "Your connection is not private"

**Cause:** SSL certificate not provisioned or expired

**Solution:**

1. Wait for SSL auto-provisioning:
   - Vercel automatically provisions SSL certificates
   - Can take 15-30 minutes after domain setup
   - If still waiting after 1 hour, try step 2

2. Force SSL renewal:
   - Go to **Project Settings → Domains**
   - Click domain
   - Look for "Refresh" or similar button
   - Wait 10-15 minutes

3. Check DNS is correctly set:
   - For Vercel DNS: should be auto-managed
   - For external DNS: verify A records match Vercel's

4. Verify in browser:
   ```bash
   # Check SSL certificate
   curl -I https://yourdomain.com
   
   # Should return 200 OK without warnings
   ```

---

### ❌ Error: "Domain works with www but not without (or vice versa)"

**Symptoms:**
- `www.yourdomain.com` works
- `yourdomain.com` doesn't work (or vice versa)

**Cause:** Domain redirect not configured

**Solution:**

1. In Vercel **Project Settings → Domains**:
   - Add both `yourdomain.com` and `www.yourdomain.com`
   - Set one as primary

2. Configure redirect:
   - Go to domain settings
   - Find "Redirect to www" or similar option
   - Enable if you want both to work

3. Test both URLs:
   ```bash
   curl -I https://yourdomain.com
   curl -I https://www.yourdomain.com
   
   # Both should return 200 or redirect correctly
   ```

---

## Rollback & Recovery

### 🔄 Need to Rollback to Previous Version?

**Steps:**

1. Go to **Vercel Dashboard → Project**
2. Click on **"Deployments"** tab
3. Find the previous working deployment (green checkmark)
4. Click **"..."** on that deployment
5. Select **"Promote to Production"**
6. Confirm
7. Site is now back to previous version

**Time to apply:** 1-2 minutes

---

### 🔄 Want to Rollback Using Git?

**Steps:**

```bash
# Find previous working commit
git log --oneline | head -10

# Revert to previous commit
git revert <commit-hash>

# Or reset if you want to completely undo
git reset --hard <commit-hash>

# Push changes
git push origin main

# Vercel auto-deploys
```

**Wait:** 2-5 minutes for deployment

---

### 📋 Emergency Recovery Checklist

If deployment is completely broken:

- [ ] Check Vercel status page: [status.vercel.com](https://status.vercel.com)
- [ ] Review deployment logs for errors
- [ ] Check environment variables are set correctly
- [ ] Verify backend is running (check function logs)
- [ ] Test backend directly: `curl https://your-backend.vercel.app/api/health`
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Rollback to previous deployment
- [ ] Contact Vercel support if still broken

---

## Getting Help

### Debug Information to Collect

Before asking for help, gather:

1. **Deployment ID**
   - Vercel Dashboard → Deployments → Click deployment
   - Copy URL (contains deployment ID)

2. **Build Logs**
   - Go to failed deployment
   - Screenshot or copy build log output

3. **Error Message**
   - Full error message including stack trace
   - Screenshot if possible

4. **Reproduction Steps**
   - What did you do before error occurred?
   - Can you reproduce it consistently?

### Useful Links

- **Vercel Status:** https://status.vercel.com
- **Vercel Docs:** https://vercel.com/docs
- **Vercel Community:** https://github.com/vercel/vercel/discussions
- **Vercel Support:** https://vercel.com/support

---

## Quick Reference: Common Fixes

| Issue | Quick Fix |
|-------|-----------|
| Blank page | Redeploy, check env vars |
| 404 errors | Check routing config, rebuild |
| CORS error | Verify CORS_ORIGIN env var, redeploy backend |
| Can't reach backend | Check backend URL in frontend, verify backend running |
| Slow loading | Optimize images, reduce bundle size |
| Domain not working | Check DNS, wait 24-48 hours |
| SSL warning | Wait 30 minutes, refresh DNS |
| Deployment stuck | Cancel and redeploy |
| Out of memory | Optimize code, reduce dataset size |

---
