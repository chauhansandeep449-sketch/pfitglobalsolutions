# Deployment Guide for Vercel

This project consists of two separate applications deployed on Vercel:
- **Frontend**: React/Vite app (Single Page Application)
- **Backend**: Node.js/Express API (Serverless Functions)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start (Recommended)](#quick-start-recommended)
3. [Detailed Deployment Steps](#detailed-deployment-steps)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Monitoring & Logs](#monitoring--logs)
7. [Troubleshooting](#troubleshooting)
8. [Rollback Procedures](#rollback-procedures)
9. [Alternative Deployment Options](#alternative-deployment-options)

---i ch

## Prerequisites

Before deploying, ensure you have:

- ✅ **GitHub Account** - Repository must be on GitHub
- ✅ **Vercel Account** - Sign up free at [vercel.com](https://vercel.com)
- ✅ **Git Installed** - For version control
- ✅ **Code Pushed to GitHub** - Main branch should have your latest code
- ✅ **Node.js 18+** - For local testing

### Setup Checklist

```bash
# 1. Verify Git is configured
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Push latest code to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main

# 3. Verify both package.json files exist
ls backend/package.json frontend/package.json
```

---

## Quick Start (Recommended)

### Step 1: Deploy Frontend (2 minutes)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"** → Select your GitHub repository
3. Set **Root Directory** to `/frontend`
4. Click **"Deploy"** → Wait for build completion
5. Note the URL: `https://pfitglobal-frontend.vercel.app` (or your custom domain)

### Step 2: Deploy Backend (2 minutes)

1. From Vercel Dashboard, click **"New Project"** → Same repository
2. Set **Root Directory** to `/backend`
3. Configure **Environment Variables** (see section below)
4. Click **"Deploy"** → Wait for build completion
5. Note the URL: `https://pfitglobal-backend.vercel.app`

### Step 3: Connect Frontend to Backend (1 minute)

Update the API URL in your frontend code:

**File:** `frontend/src/App.jsx`

```javascript
// Replace API endpoint with your deployed backend
const API_URL = process.env.REACT_APP_API_URL || 'https://pfitglobal-backend.vercel.app/api'
```

Or for Vite (frontend/vite.config.js):

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://pfitglobal-backend.vercel.app/api')
  }
})
```

Then commit and push:

```bash
git add .
git commit -m "Update API endpoint for production"
git push origin main
```

Vercel will **auto-deploy** on push.

---

## Detailed Deployment Steps

### Frontend Deployment

**Configuration File:** `frontend/vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
```

**Build Process:**
1. Vercel reads `frontend/package.json`
2. Runs `npm run build` (Vite builds to `/dist`)
3. Deploys static files to CDN
4. Configures routing for React SPA

**Expected Build Time:** 30-60 seconds

---

### Backend Deployment

**Configuration File:** `backend/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

**Build Process:**
1. Vercel deploys Node.js as serverless functions
2. All routes forward to `server.js`
3. Express handles routing
4. Automatically scales with traffic

**Expected Build Time:** 20-40 seconds

---

## Environment Variables

### Backend Environment Variables

Set these in **Vercel Project Settings → Environment Variables**:

| Variable | Value | Required | Purpose |
|----------|-------|----------|---------|
| `NODE_ENV` | `production` | ✅ Yes | Enable production optimizations |
| `DATABASE_URL` | `your-db-connection-string` | Optional | If using database |
| `API_PORT` | `3000` | Optional | Port for local testing |
| `CORS_ORIGIN` | `https://pfitglobal-frontend.vercel.app` | Optional | Frontend URL for CORS |
| `MAIL_SERVICE` | `gmail` or `sendgrid` | Optional | Email service for contact form |
| `MAIL_USER` | `your-email@gmail.com` | Optional | Email account |
| `MAIL_PASS` | `app-specific-password` | Optional | Email password/token |

### Frontend Environment Variables

Set in **Vercel Frontend Project Settings**:

| Variable | Value | Purpose |
|----------|-------|---------|
| `VITE_API_URL` | `https://pfitglobal-backend.vercel.app/api` | Backend API endpoint |
| `VITE_SITE_NAME` | `PFit Global Solutions` | Site name |

---

## Custom Domain Setup

### Option 1: Vercel Domain

1. Go to **Project Settings → Domains**
2. Click **"Add Custom Domain"**
3. Enter domain (e.g., `pfitglobal.com`)
4. Vercel auto-adds DNS records
5. Wait 1-2 minutes for verification

### Option 2: External Domain Provider

1. Buy domain from **Namecheap**, **GoDaddy**, or **Google Domains**
2. In Vercel: **Project Settings → Domains → Add Custom Domain**
3. Add your domain (e.g., `pfitglobal.com`)
4. Copy Vercel's nameservers or DNS records
5. Update domain provider's nameserver settings:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
6. Wait 24-48 hours for DNS propagation

### Option 3: Subdomain for Backend

1. In Vercel Backend Project: **Settings → Domains**
2. Add subdomain: `api.yourdomain.com`
3. Update frontend API URL:
   ```javascript
   const API_URL = 'https://api.yourdomain.com'
   ```

### Setup HTTPS (Automatic)

- ✅ Vercel automatically provisions **free SSL certificate** via Let's Encrypt
- ✅ Auto-renewal every 90 days
- ✅ Automatic HTTP → HTTPS redirect

---

## Monitoring & Logs

### View Deployment Logs

1. Go to **Vercel Dashboard → Project → Deployments**
2. Click on a deployment to view:
   - Build logs
   - Output directory
   - Build duration
   - Environment variables (censored)

### Monitor Backend Logs

```bash
# View real-time logs (requires Vercel CLI)
vercel logs --follow

# Or in Vercel Dashboard:
# Project → Settings → Functions → Logs
```

### Performance Monitoring

1. **Vercel Analytics** → View Core Web Vitals
2. **Speed Insights** → Analyze performance
3. **Error Tracking** → Monitor failures

---

## Troubleshooting

### Issue: Frontend Build Fails

**Error:** `npm ERR! ERR! code ENOENT`

**Solution:**
```bash
# 1. Check frontend/package.json exists
cat frontend/package.json

# 2. Ensure build script exists
grep "\"build\"" frontend/package.json

# 3. If missing, add to package.json:
{
  "scripts": {
    "build": "vite build"
  }
}

# 4. Push changes and redeploy
git add . && git commit -m "Fix build script" && git push
```

### Issue: Backend Routes Return 404

**Error:** `GET /api/contact → 404 Not Found`

**Solution:**
```bash
# 1. Verify server.js exists
ls -la backend/server.js

# 2. Check vercel.json routes config
cat backend/vercel.json

# 3. Ensure all routes forward to server.js:
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}

# 4. Rebuild and deploy
git push origin main
```

### Issue: CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** In `backend/server.js`:

```javascript
const express = require('express')
const cors = require('cors')
const app = express()

// Allow frontend to access backend
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://pfitglobal-frontend.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

module.exports = app
```

### Issue: Environment Variables Not Loading

**Solution:**
1. Redeploy after adding environment variables (they don't auto-apply)
2. Check **Project Settings → Environment Variables → Redeploy**
3. Verify variable names match in code
4. Use `process.env.VARIABLE_NAME` in Node.js

### Issue: Frontend Cannot Reach Backend

**Check:**
1. Backend URL is correct in frontend code
2. Backend is deployed and showing green status
3. CORS is properly configured
4. Try accessing backend URL directly in browser

**Debug:**
```bash
# Test backend directly
curl https://pfitglobal-backend.vercel.app/api/health

# Should return success response
```

---

## Rollback Procedures

### Rollback Frontend to Previous Version

1. Go to **Project → Deployments**
2. Find the previous successful deployment
3. Click **"..." → Promote to Production"**
4. Confirm the rollback

### Rollback via Git

```bash
# Revert to previous commit
git log --oneline | head -10
git revert <commit-hash>
git push origin main

# Vercel auto-deploys the reverted code
```

### Cancel Ongoing Deployment

1. During deployment, click **"Cancel Deployment"**
2. Previous version remains live
3. No downtime occurs

---

## Alternative Deployment Options

### Option 1: Frontend Only (Backend as Serverless)

Convert Express routes to Vercel serverless functions in `frontend/api/`:

```bash
# Create serverless functions
frontend/
├── api/
│   ├── contact.js      # Handles POST /api/contact
│   ├── services.js     # Handles GET /api/services
│   └── portfolio.js    # Handles GET /api/portfolio
└── src/
```

**Advantages:** Single deployment, simpler setup
**Disadvantages:** Limited backend features

### Option 2: Alternative Platforms

**Frontend Alternatives:**
- **Netlify** - Similar to Vercel, great for React
- **GitHub Pages** - Free but limited features
- **AWS Amplify** - More control, steeper learning curve
- **CloudFlare Pages** - Global CDN, excellent performance

**Backend Alternatives:**
- **Railway.app** - Easy deployment, generous free tier
- **Render.com** - Fast, reliable, auto-scaling
- **Fly.io** - Global edge network
- **AWS Lambda + API Gateway** - Most scalable, complex setup

---

## Post-Deployment Checklist

- ✅ Frontend loads without errors
- ✅ Contact form submits successfully
- ✅ All images load correctly
- ✅ HTTPS works on custom domain
- ✅ Mobile responsive design works
- ✅ Analytics tracking active
- ✅ Error monitoring configured
- ✅ Backup plan documented
- ✅ Team has deployment access
- ✅ Logs monitored for errors

---

## Support & Documentation

- **Vercel Docs:** https://vercel.com/docs
- **React Vite Guide:** https://vitejs.dev/guide/ssr.html
- **Express.js Docs:** https://expressjs.com/
- **Vercel GitHub Integration:** https://vercel.com/docs/deployments/git

---

## Quick Commands Reference

```bash
# Deploy frontend only
vercel --scope=your-team deploy --prod --cwd=frontend

# Deploy backend only
vercel --scope=your-team deploy --prod --cwd=backend

# View deployments
vercel list

# Remove deployment
vercel remove <deployment-id>

# Check project status
vercel status
```

---

## Version History

| Date | Status | Notes |
|------|--------|-------|
| 2024 | Active | Initial deployment |
| - | - | - |

---

## Environment Variables (if needed)

Create `.env` files in each folder (not committed to Git):

### Backend `.env`
```
NODE_ENV=production
PORT=5000
```

### Frontend `.env`
```
VITE_API_URL=https://api.yourdomain.com
```

---

## Troubleshooting

### CORS Issues
Backend may need CORS headers updated when deployed. Update `backend/server.js`:

```javascript
app.use(cors({
  origin: ['https://yourdomain.vercel.app', 'https://yourdomain.com'],
  credentials: true
}))
```

### API Not Responding
1. Check backend deployment status in Vercel
2. Verify API URL in frontend code
3. Check browser console for errors

### Build Failing
1. Ensure `vercel.json` is correct
2. Check `package.json` build scripts
3. Review Vercel build logs

---

## After Deployment

- Update README with live URLs
- Test all features on live site
- Set up monitoring/analytics
- Consider adding CI/CD pipeline
- Set up automatic deploys on Git push

---

## Quick Deployment Command

If you have Vercel CLI installed:

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

**Need help? Visit [Vercel Documentation](https://vercel.com/docs)**
