# Pre-Deployment Checklist

Complete checklist to verify everything is ready for Vercel deployment.

---

## Phase 1: Code Preparation (30 minutes)

### Repository Setup

- [ ] GitHub repository created and initialized
- [ ] Code pushed to GitHub main branch
- [ ] `.gitignore` includes:
  - [ ] `node_modules/`
  - [ ] `.env.local`
  - [ ] `.DS_Store`
  - [ ] `dist/`
  - [ ] `build/`

### Git Configuration

```bash
# Verify
git log --oneline | head -5
git remote -v
```

- [ ] Remote is set to your GitHub repository
- [ ] Latest commit message describes the state
- [ ] No uncommitted changes: `git status`

---

## Phase 2: Frontend Verification (20 minutes)

### Package Configuration

- [ ] `frontend/package.json` exists
  ```bash
  cat frontend/package.json
  ```

- [ ] Required scripts present:
  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }
  }
  ```

- [ ] All dependencies installed:
  ```bash
  cd frontend
  npm install
  ```

### Build Verification

- [ ] Build runs successfully locally:
  ```bash
  cd frontend
  npm run build
  # Should complete without errors
  ```

- [ ] Output directory created:
  ```bash
  ls -la frontend/dist/
  # Should show index.html and assets folder
  ```

### Vite Configuration

- [ ] `frontend/vite.config.js` exists
  ```bash
  cat frontend/vite.config.js
  ```

- [ ] Configuration includes React plugin:
  ```javascript
  import react from '@vitejs/plugin-react'
  ```

### Vercel Configuration

- [ ] `frontend/vercel.json` exists:
  ```bash
  cat frontend/vercel.json
  ```

- [ ] Content should be:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "framework": "react"
  }
  ```

### Code Quality

- [ ] No console errors in development:
  ```bash
  npm run dev
  # Check browser console for errors
  ```

- [ ] Forms work correctly locally
- [ ] All links are functional
- [ ] Images load correctly
- [ ] Responsive design works (check mobile view)

---

## Phase 3: Backend Verification (20 minutes)

### Package Configuration

- [ ] `backend/package.json` exists
  ```bash
  cat backend/package.json
  ```

- [ ] Required dependencies present:
  ```json
  {
    "dependencies": {
      "express": "^4.x",
      "cors": "^2.x",
      "body-parser": "^1.x"
    }
  }
  ```

- [ ] All dependencies installed:
  ```bash
  cd backend
  npm install
  ```

### Server Setup

- [ ] `backend/server.js` exists:
  ```bash
  cat backend/server.js
  ```

- [ ] Server exports Express app:
  ```javascript
  module.exports = app
  ```

- [ ] CORS middleware configured:
  ```javascript
  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
  }))
  ```

- [ ] All API routes defined (check these work):
  ```bash
  - GET  /api/health
  - GET  /api/services
  - GET  /api/portfolio
  - POST /api/contact
  ```

### Server Testing

- [ ] Server runs locally without errors:
  ```bash
  cd backend
  npm start
  # or: node server.js
  ```

- [ ] Health check endpoint responds:
  ```bash
  curl http://localhost:3000/api/health
  # Should return JSON response
  ```

- [ ] API endpoints respond:
  ```bash
  curl http://localhost:3000/api/services
  curl http://localhost:3000/api/portfolio
  ```

- [ ] POST endpoint accepts data:
  ```bash
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","message":"Hi"}'
  ```

### Vercel Configuration

- [ ] `backend/vercel.json` exists:
  ```bash
  cat backend/vercel.json
  ```

- [ ] Content configured correctly:
  ```json
  {
    "version": 2,
    "builds": [{"src": "server.js", "use": "@vercel/node"}],
    "routes": [{"src": "/(.*)", "dest": "server.js"}]
  }
  ```

- [ ] No environment variables hardcoded in code
- [ ] No secrets committed to repository

---

## Phase 4: Frontend-Backend Connection (10 minutes)

### API URL Configuration

- [ ] Frontend has API endpoint variable:
  ```bash
  grep "API_URL\|api/" frontend/src/App.jsx
  ```

- [ ] Variable uses environment variable:
  ```javascript
  const API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api'
  ```

### Form Integration

- [ ] Contact form submits to backend:
  ```javascript
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  ```

- [ ] Form validation works locally
- [ ] Success/error messages display correctly
- [ ] Form clears after successful submission

### Local Testing

- [ ] Start backend: `npm start` (from backend folder)
- [ ] Start frontend: `npm run dev` (from frontend folder)
- [ ] Test form submission in browser
- [ ] Check backend received data
- [ ] No CORS errors in console

---

## Phase 5: Environment Variables (10 minutes)

### Frontend Variables Needed

- [ ] `VITE_API_URL` - Backend API endpoint
  - Value after deployment: `https://pfitglobal-backend.vercel.app/api`

- [ ] Optional: `VITE_SITE_NAME` - Website name
  - Value: `PFit Global Solutions`

### Backend Variables Needed

- [ ] `NODE_ENV` - Environment type
  - Value: `production`

- [ ] `CORS_ORIGIN` - Frontend URL for CORS
  - Value after deployment: `https://pfitglobal-frontend.vercel.app`

- [ ] Optional: Email configuration
  - `MAIL_SERVICE` (if sending emails)
  - `MAIL_USER` (if sending emails)
  - `MAIL_PASS` (if sending emails)

### Variables Checklist

- [ ] No sensitive data hardcoded in code
- [ ] No API keys in repository
- [ ] `.env.local` files NOT committed to Git
- [ ] `.gitignore` includes `*.local`

---

## Phase 6: Git Final Push (5 minutes)

### Before Pushing

- [ ] All code changes saved
- [ ] No uncommitted changes:
  ```bash
  git status
  # Should show "working tree clean"
  ```

- [ ] No debugging code left:
  - [ ] No `console.log` statements (or minimal)
  - [ ] No `debugger;` statements
  - [ ] No commented-out code blocks

- [ ] Meaningful commit messages:
  ```bash
  git log --oneline | head -5
  ```

### Final Push

```bash
# Commit all changes
git add .
git commit -m "Prepare for Vercel deployment"

# Push to GitHub
git push origin main
```

- [ ] Push completed successfully
- [ ] No errors shown
- [ ] Code appears on GitHub: check your repo

---

## Phase 7: Vercel Deployment (10 minutes)

### Frontend Deployment

- [ ] Go to [vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] Click **"New Project"**
- [ ] Select your GitHub repository
- [ ] Configure:
  - [ ] Project Name: `pfitglobal-frontend`
  - [ ] Root Directory: `/frontend`
  - [ ] Framework: `React`
- [ ] Click **"Deploy"**
- [ ] Wait for build (usually 1-2 minutes)
- [ ] Verify: Green checkmark and URL provided
- [ ] Note frontend URL: `https://pfitglobal-frontend.vercel.app`

### Backend Deployment

- [ ] Go to Vercel Dashboard
- [ ] Click **"New Project"**
- [ ] Select same GitHub repository
- [ ] Configure:
  - [ ] Project Name: `pfitglobal-backend`
  - [ ] Root Directory: `/backend`
  - [ ] Framework: `Other` or `Node.js`
- [ ] Add Environment Variables:
  - [ ] `NODE_ENV` = `production`
  - [ ] `CORS_ORIGIN` = `https://pfitglobal-frontend.vercel.app`
- [ ] Click **"Deploy"**
- [ ] Wait for build (usually 1-2 minutes)
- [ ] Verify: Green checkmark and URL provided
- [ ] Note backend URL: `https://pfitglobal-backend.vercel.app`

---

## Phase 8: Post-Deployment Verification (15 minutes)

### Frontend Testing

- [ ] Frontend URL loads in browser
- [ ] Page displays without errors
- [ ] All sections visible (Hero, About, Services, etc.)
- [ ] Images load correctly
- [ ] No console errors (F12 → Console)
- [ ] Responsive design works (test on mobile)

### Backend Testing

```bash
# Test health endpoint
curl https://pfitglobal-backend.vercel.app/api/health
# Should return: {"status":"Server running successfully"}

# Test services endpoint
curl https://pfitglobal-backend.vercel.app/api/services
# Should return JSON array of services

# Test portfolio endpoint
curl https://pfitglobal-backend.vercel.app/api/portfolio
# Should return JSON array of projects
```

- [ ] All health checks pass
- [ ] No 404 or 502 errors
- [ ] Response times reasonable (< 5 seconds)

### Connection Testing

- [ ] Visit frontend URL
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Verify success message appears
- [ ] No CORS errors in console
- [ ] Backend received submission (check logs if available)

### Performance Check

- [ ] Frontend loads in < 3 seconds
- [ ] Form submission responds in < 5 seconds
- [ ] No broken images or assets
- [ ] All pages load correctly

---

## Phase 9: Monitoring Setup (Optional but Recommended)

### Enable Vercel Analytics

- [ ] Go to Frontend Project → **"Analytics"**
- [ ] Verify data starts collecting
- [ ] Bookmark for regular checks

### Enable Error Tracking

- [ ] Go to **"Settings"** → **"Error Tracking"**
- [ ] Enable notifications (email or Slack)
- [ ] Note the webhook URL for alerts

### Set Up Monitoring

- [ ] Check deployment logs daily for first week
- [ ] Monitor response times
- [ ] Monitor error rates

---

## Phase 10: Domain Setup (Optional)

### If Using Custom Domain

- [ ] Purchase domain from registrar (Namecheap, GoDaddy, etc.)
- [ ] Go to Frontend Project → **"Settings"** → **"Domains"**
- [ ] Add domain: `yourdomain.com`
- [ ] Configure DNS:
  - [ ] Use Vercel DNS (automatic), OR
  - [ ] Update nameservers at registrar
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Test: `curl https://yourdomain.com`
- [ ] Add backend subdomain: `api.yourdomain.com`
- [ ] Update frontend API URL to custom domain

### If Using Vercel Subdomains (Default)

- [ ] Use provided URLs:
  - [ ] Frontend: `https://pfitglobal-frontend.vercel.app`
  - [ ] Backend: `https://pfitglobal-backend.vercel.app`
- [ ] These are always available and working

---

## Final Verification Checklist

Before considering deployment complete:

- ✅ Frontend URL works and loads quickly
- ✅ Backend health endpoint responds
- ✅ Contact form submits successfully
- ✅ No console errors on frontend
- ✅ No CORS errors shown
- ✅ Responsive design works on mobile
- ✅ Images and assets load correctly
- ✅ All API endpoints respond correctly
- ✅ Deployment logs show no errors
- ✅ No secrets in code or logs

---

## Troubleshooting Quick Reference

If something fails during deployment:

1. **Build Failed?** → Check build logs in Vercel dashboard
2. **Page Blank?** → Check browser console for errors
3. **404 errors?** → Verify routes in server.js or vercel.json
4. **CORS errors?** → Check CORS_ORIGIN environment variable
5. **Can't reach backend?** → Verify backend URL in frontend code
6. **Slow loading?** → Optimize images and reduce bundle size
7. **Still stuck?** → See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## Documents Reference

After successful deployment:

- 📄 [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- 📄 [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Step-by-step Vercel setup
- 📄 [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md) - Environment variable configuration
- 📄 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

---

## Support

Need help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **GitHub Discussions:** https://github.com/orgs/vercel/discussions

---

## Deployment Summary

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ⭕ Pending | `https://pfitglobal-frontend.vercel.app` |
| Backend | ⭕ Pending | `https://pfitglobal-backend.vercel.app` |
| Domain | ⭕ Optional | `yourdomain.com` |

*Update status after each phase completion*

---

**Good luck with your deployment! 🚀**
