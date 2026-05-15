# Vercel Deployment Setup Guide - Step by Step

Complete visual walkthrough for deploying to Vercel with screenshots descriptions.

---

## Table of Contents
1. [Initial GitHub Setup](#initial-github-setup)
2. [Create Vercel Account](#create-vercel-account)
3. [Deploy Frontend](#deploy-frontend)
4. [Deploy Backend](#deploy-backend)
5. [Configure Domains](#configure-domains)
6. [Test Deployment](#test-deployment)

---

## Initial GitHub Setup

### Step 1: Push Code to GitHub

```bash
# Navigate to project directory
cd /workspaces/pfitglobalsolutions

# Initialize git (if not already done)
git init

# Configure git user
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: PFit Global Solutions"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/pfitglobalsolutions.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Verify GitHub Repository

- Go to [github.com](https://github.com)
- Login to your account
- Verify your repository shows all files:
  - ✅ `frontend/` folder with `vite.config.js`
  - ✅ `backend/` folder with `server.js`
  - ✅ `package.json` files in both folders
  - ✅ `vercel.json` files in both folders

---

## Create Vercel Account

### Step 1: Sign Up

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Select **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Grant permission to repositories

### Step 2: Configure Git Integration

1. After signup, you'll see **"Import Project"**
2. Click **"Select a Git Repository"**
3. Choose your GitHub repository
4. Skip for now (we'll set up separately for frontend and backend)

### Step 3: Verify Account

- ✅ Email confirmed
- ✅ GitHub connected
- ✅ Can see your repositories

---

## Deploy Frontend

### Step 1: Create Frontend Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select **"pfitglobalsolutions"** repository
4. Click **"Import"**

### Step 2: Configure Frontend Settings

On the **"Configure Project"** page:

1. **Project Name:** `pfitglobal-frontend` (or your choice)
2. **Framework Preset:** Select **"Vite"**
3. **Root Directory:** Click **"Edit"** and select `/frontend`
4. **Build Command:** Keep default `npm run build`
5. **Output Directory:** Keep default `dist`
6. **Install Command:** Keep default `npm install`

### Step 3: Environment Variables (Frontend)

Add these if needed:

```
VITE_API_URL = https://your-backend-url.vercel.app/api
VITE_SITE_NAME = PFit Global Solutions
```

*Note: You can add backend URL after backend is deployed*

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. See **"Congratulations!"** message
4. Copy the URL: `https://pfitglobal-frontend.vercel.app`

### Step 5: Test Frontend

- ✅ Visit the URL in browser
- ✅ Verify all pages load
- ✅ Check responsive design (mobile view)
- ✅ Verify images load correctly

---

## Deploy Backend

### Step 1: Create Backend Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select **"pfitglobalsolutions"** repository again
4. Click **"Import"**

### Step 2: Configure Backend Settings

On the **"Configure Project"** page:

1. **Project Name:** `pfitglobal-backend` (or your choice)
2. **Framework Preset:** Select **"Other"** or **"Node.js"**
3. **Root Directory:** Click **"Edit"** and select `/backend`
4. **Build Command:** Leave empty (or use `npm install`)
5. **Output Directory:** Leave empty

### Step 3: Environment Variables (Backend)

Click **"Environment Variables"** and add:

| Key | Value | Recommended |
|-----|-------|-------------|
| `NODE_ENV` | `production` | ✅ Yes |
| `CORS_ORIGIN` | `https://pfitglobal-frontend.vercel.app` | ✅ Yes |
| `DATABASE_URL` | `your-database-url` | Optional |
| `MAIL_SERVICE` | `gmail` or `sendgrid` | Optional |
| `MAIL_USER` | `your-email@gmail.com` | Optional |
| `MAIL_PASS` | `your-app-password` | Optional |

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for build to complete
3. See **"Congratulations!"** message
4. Copy the URL: `https://pfitglobal-backend.vercel.app`

### Step 5: Test Backend

```bash
# Test backend API
curl https://pfitglobal-backend.vercel.app/api/health

# Expected response:
# {"status":"Server running successfully"}
```

Or open in browser: `https://pfitglobal-backend.vercel.app/api/services`

---

## Connect Frontend to Backend

### Step 1: Update Frontend Code

**File:** `frontend/src/App.jsx` (or where API calls are made)

```javascript
// Replace this:
// const API_URL = 'http://localhost:3000/api'

// With this:
const API_URL = 'https://pfitglobal-backend.vercel.app/api'

// Or use environment variable:
const API_URL = process.env.VITE_API_URL || 'https://pfitglobal-backend.vercel.app/api'
```

### Step 2: Update Environment Variables (Frontend)

1. Go to Frontend Project → **"Settings"** → **"Environment Variables"**
2. Add:
   ```
   VITE_API_URL = https://pfitglobal-backend.vercel.app/api
   ```
3. Click **"Save"**
4. Go to **"Deployments"** tab
5. Click **"..." on latest deployment → "Redeploy"**

### Step 3: Verify Connection

1. Visit frontend URL
2. Fill out contact form
3. Submit form
4. Verify backend receives the data:
   - Check backend logs in Vercel
   - Or add email notification to see submissions

---

## Configure Domains

### Option 1: Use Vercel Subdomain (Free)

Already done! Your URLs are:
- Frontend: `https://pfitglobal-frontend.vercel.app`
- Backend: `https://pfitglobal-backend.vercel.app`

### Option 2: Add Custom Domain (Paid)

#### Step 1: Buy Domain

1. Go to [namecheap.com](https://namecheap.com) or similar
2. Search for domain: `yourdomain.com`
3. Complete purchase
4. Note the domain registrar (Namecheap, GoDaddy, etc.)

#### Step 2: Connect Domain to Frontend

1. Go to Frontend Project → **"Settings"** → **"Domains"**
2. Click **"Add Custom Domain"**
3. Enter your domain: `yourdomain.com`
4. Click **"Add"**
5. Choose option:
   - **Option A:** Use Vercel DNS (easiest) - Vercel updates DNS automatically
   - **Option B:** Use external DNS - Update nameservers at domain registrar

#### Step 3: Configure Nameservers (if using external DNS)

If you chose external DNS:

1. Copy Vercel's nameservers
2. Go to your domain registrar (Namecheap, etc.)
3. Find **"Nameservers"** or **"DNS Settings"**
4. Replace with Vercel nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
5. Save changes
6. Wait 24-48 hours for DNS propagation

#### Step 4: Configure Backend Subdomain

1. Go to Backend Project → **"Settings"** → **"Domains"**
2. Click **"Add Custom Domain"**
3. Enter: `api.yourdomain.com`
4. Verify pointing correctly

#### Step 5: SSL Certificate (Automatic)

- ✅ Vercel automatically provisions free SSL certificate
- ✅ Works for both `yourdomain.com` and `api.yourdomain.com`
- ✅ Auto-renews every 90 days
- ✅ HTTPS is mandatory (HTTP redirects to HTTPS)

---

## Test Deployment

### Frontend Testing

- [ ] Visit frontend URL in browser
- [ ] Page loads without errors
- [ ] All sections visible (Hero, About, Services, Portfolio, etc.)
- [ ] Images load correctly
- [ ] Responsive on mobile (test with DevTools)
- [ ] Smooth scrolling works
- [ ] Links navigate properly

### Backend Testing

Test each endpoint:

```bash
# 1. Health check
curl https://pfitglobal-backend.vercel.app/api/health

# 2. Get services
curl https://pfitglobal-backend.vercel.app/api/services

# 3. Get portfolio
curl https://pfitglobal-backend.vercel.app/api/portfolio

# 4. Test contact form (POST request)
curl -X POST https://pfitglobal-backend.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Test"}'
```

### Form Testing

1. Fill out contact form on frontend
2. Submit
3. Verify:
   - Success message displays
   - Form clears
   - Backend received data (check logs)
   - Email sent (if configured)

### CORS Testing

If forms fail to submit:

1. Open browser DevTools (F12)
2. Go to **"Console"** tab
3. Look for CORS errors
4. Check backend `vercel.json` includes CORS origin

---

## Monitoring After Deployment

### Vercel Dashboard

1. **Deployments** → See deployment history
2. **Functions** → Monitor backend function invocations
3. **Analytics** → View website traffic and performance
4. **Logs** → View real-time backend logs

### Performance Monitoring

1. Click on project
2. Go to **"Analytics"**
3. View:
   - Page views
   - Core Web Vitals
   - Geographic distribution
   - Device types

### Error Tracking

1. Go to **"Settings"** → **"Error Tracking"**
2. Enable error notifications
3. Connect Slack or email for alerts

---

## Rollback If Issues Occur

### Revert to Previous Deployment

1. Go to **"Deployments"** tab
2. Find working deployment (green checkmark)
3. Click **"..."** → **"Promote to Production"**
4. Confirm
5. Site immediately reverts to previous version

### Redeploy Latest

```bash
# Push new commit
git add .
git commit -m "Fix: deployment issue"
git push origin main

# Vercel auto-deploys (usually within 1-2 minutes)
```

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Frontend won't build | Check `frontend/package.json` has build script |
| Backend returns 404 | Verify `backend/vercel.json` routes config |
| CORS errors | Check `CORS_ORIGIN` env var matches frontend URL |
| Frontend can't reach backend | Verify `VITE_API_URL` in frontend code and env vars |
| Domain not working | Wait 48 hours or check DNS propagation tools |
| SSL certificate issues | Wait 30 minutes, refresh page, check domain settings |

---

## Next Steps

1. ✅ Set up monitoring alerts
2. ✅ Configure domain email (if applicable)
3. ✅ Add analytics (Google Analytics)
4. ✅ Set up error tracking (Sentry)
5. ✅ Create deployment checklist for team
6. ✅ Document rollback procedures
7. ✅ Schedule regular backups

---
