# Environment Variables Configuration

Complete reference for all environment variables needed for deployment on Vercel.

---

## Quick Reference

| Service | File | Environment | Variables |
|---------|------|-------------|-----------|
| **Frontend** | `frontend/src/App.jsx` | Vite | `VITE_API_URL` |
| **Backend** | `backend/server.js` | Node.js/Express | `NODE_ENV`, `CORS_ORIGIN`, `DATABASE_URL` |

---

## Frontend Environment Variables

### Location in Vercel

**Vercel Dashboard → Frontend Project → Settings → Environment Variables**

### Available Variables

#### 1. API Base URL

```
Variable Name: VITE_API_URL
Value: https://pfitglobal-backend.vercel.app/api
Environment: Production
Required: Yes
```

**Usage in Code:**
```javascript
// frontend/src/App.jsx
const API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api'

// In fetch calls
const response = await fetch(`${API_URL}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

#### 2. Site Name

```
Variable Name: VITE_SITE_NAME
Value: PFit Global Solutions
Environment: Production
Required: No
```

**Usage in Code:**
```javascript
const siteName = process.env.VITE_SITE_NAME || 'PFit Global'
```

#### 3. Analytics Tracking ID

```
Variable Name: VITE_GA_ID
Value: G-XXXXXXXXXX
Environment: Production
Required: No (if using Google Analytics)
```

#### 4. Environment Flag

```
Variable Name: VITE_ENVIRONMENT
Value: production
Environment: Production
Required: No
Options: development | staging | production
```

### How to Set in Vercel UI

1. Go to **Vercel Dashboard**
2. Click on **Frontend Project** (`pfitglobal-frontend`)
3. Navigate to **Settings** → **Environment Variables**
4. Click **"Add New"** button
5. Enter:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://pfitglobal-backend.vercel.app/api`
   - **Select Environments:** `Production`
6. Click **"Save"**
7. **Important:** Go back to **Deployments** and click **"Redeploy"** to apply changes

### Production Deployment

```bash
# Set API URL before deployment
VITE_API_URL=https://pfitglobal-backend.vercel.app/api npm run build

# Or export environment variable
export VITE_API_URL=https://pfitglobal-backend.vercel.app/api
npm run build
```

---

## Backend Environment Variables

### Location in Vercel

**Vercel Dashboard → Backend Project → Settings → Environment Variables**

### Required Variables

#### 1. Node Environment

```
Variable Name: NODE_ENV
Value: production
Environment: Production
Required: Yes
Impact: Enables production optimizations
```

**Usage in Code:**
```javascript
if (process.env.NODE_ENV === 'production') {
  console.log = () => {} // Disable logging in production
  // Enable compression
  app.use(compression())
}
```

#### 2. CORS Origin

```
Variable Name: CORS_ORIGIN
Value: https://pfitglobal-frontend.vercel.app
Environment: Production
Required: Yes
Impact: Allows frontend to access backend
```

**Usage in Code:**
```javascript
// backend/server.js
const cors = require('cors')
const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
```

### Optional Variables

#### 3. Database Connection

```
Variable Name: DATABASE_URL
Value: postgresql://user:password@host:5432/dbname
Environment: Production
Required: Only if using database
```

**Usage in Code:**
```javascript
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost/pfit'
const db = await mongoose.connect(dbUrl)
```

#### 4. Email Service Configuration

If you want to send emails from contact form:

**Option A: Gmail SMTP**
```
Variable Name: MAIL_SERVICE
Value: gmail

Variable Name: MAIL_USER
Value: your-email@gmail.com

Variable Name: MAIL_PASS
Value: xxxx xxxx xxxx xxxx  (App password, NOT your regular password)
```

**To generate Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Use that as `MAIL_PASS`

**Usage in Code:**
```javascript
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})
```

**Option B: SendGrid**
```
Variable Name: SENDGRID_API_KEY
Value: SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 5. API Port

```
Variable Name: API_PORT
Value: 3000
Environment: Production
Required: No (Vercel auto-assigns)
```

#### 6. API Key for Admin Routes

```
Variable Name: ADMIN_API_KEY
Value: your-secret-admin-key-here
Environment: Production
Required: Only if using admin routes
Security: Keep this secret, never commit to Git
```

**Usage in Code:**
```javascript
// Protect admin routes
app.get('/api/admin/submissions', (req, res) => {
  const key = req.headers['x-api-key']
  if (key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  // Return data
})
```

---

## Setting Environment Variables in Vercel

### Method 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on **Backend Project** → **Settings**
3. Click **"Environment Variables"**
4. Click **"Add New"**
5. Fill in:
   - **Name:** `NODE_ENV`
   - **Value:** `production`
   - **Scope:** Check `Production`
6. Click **"Add to Environment"**
7. Repeat for each variable
8. Go to **Deployments** → Click **"..."** on latest → **"Redeploy"**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variable
vercel env add NODE_ENV

# When prompted, enter:
# ? What's the value? production
# ? Add to which Environments? (Production)

# Verify
vercel env ls
```

### Method 3: `.env.local` File (Local Development Only)

**File:** `backend/.env.local`

```
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=mongodb://localhost/pfit
MAIL_SERVICE=gmail
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
```

**Usage in Code:**
```javascript
require('dotenv').config()
// Now process.env variables are available
```

**⚠️ WARNING:** Never commit `.env.local` to Git!

Add to `.gitignore`:
```
.env.local
.env*.local
node_modules/
```

---

## Environment-Specific Configuration

### Development Environment

```
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=mongodb://localhost/pfit
API_PORT=3000
LOG_LEVEL=debug
```

### Staging Environment

```
NODE_ENV=staging
CORS_ORIGIN=https://staging-frontend.vercel.app
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/pfit-staging
API_PORT=3000
LOG_LEVEL=info
```

### Production Environment

```
NODE_ENV=production
CORS_ORIGIN=https://pfitglobal-frontend.vercel.app
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/pfit-prod
API_PORT=3000
LOG_LEVEL=error
```

---

## Environment Variables Checklist

### Before Deploying Frontend

- [ ] `VITE_API_URL` set to backend URL
- [ ] `VITE_SITE_NAME` set (optional)
- [ ] All variables saved in Vercel
- [ ] Project redeployed after adding variables

### Before Deploying Backend

- [ ] `NODE_ENV` set to `production`
- [ ] `CORS_ORIGIN` set to frontend URL
- [ ] Email variables set (if using emails)
- [ ] Database URL configured (if using database)
- [ ] API key set (if using authentication)
- [ ] All variables saved in Vercel
- [ ] Project redeployed after adding variables

### Common Mistakes to Avoid

❌ **Don't commit `.env` files to Git**
✅ Do set variables in Vercel Dashboard

❌ **Don't use localhost URLs in production**
✅ Do use full Vercel URLs

❌ **Don't forget to redeploy after adding variables**
✅ Do redeploy to apply environment changes

❌ **Don't share secret keys in documentation**
✅ Do store secrets in Vercel environment variables

---

## Verification Commands

### Check if Backend is Reading Environment Variables

```bash
# In backend/server.js, add temporary logging
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN)
console.log('MAIL_SERVICE:', process.env.MAIL_SERVICE)

# Check Vercel logs to verify values are loaded
```

### Test Frontend Environment Variables

```javascript
// In browser console
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_SITE_NAME)
```

### Verify CORS Configuration

```bash
# Test from frontend to backend
curl -H "Origin: https://pfitglobal-frontend.vercel.app" \
  https://pfitglobal-backend.vercel.app/api/health

# Should see CORS headers in response
```

---

## Variable Reference by Use Case

### Email Notifications Setup

```
MAIL_SERVICE = gmail
MAIL_USER = notifications@company.com
MAIL_PASS = xxxx xxxx xxxx xxxx
MAIL_TO = owner@company.com
```

### Database Setup (MongoDB)

```
DATABASE_URL = mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true
DB_NAME = pfit-production
```

### Analytics Setup

```
VITE_GA_ID = G-XXXXXXXXXX
SENTRY_DSN = https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### Authentication Setup

```
ADMIN_API_KEY = your-secret-key-here-min-32-chars
JWT_SECRET = your-jwt-secret-here
STRIPE_KEY = sk_live_xxxxx
```

---

## Updating Environment Variables

### Change API URL After Backend URL Changes

1. Get new backend URL from Vercel
2. Update frontend environment variable:
   - **Name:** `VITE_API_URL`
   - **New Value:** `https://new-backend-url.vercel.app/api`
3. Save in Vercel
4. Redeploy frontend
5. Wait 2-5 minutes for changes to propagate

### Rotate Secrets

1. Generate new secret/key
2. Add new variable with temporary name (e.g., `NEW_API_KEY`)
3. Update code to use new variable
4. Deploy and verify working
5. Remove old variable
6. Delete old secret from external service

---

## Security Best Practices

### ✅ DO

- Store all secrets in Vercel environment variables
- Use strong, unique keys (minimum 32 characters)
- Rotate keys monthly
- Use different keys for different environments
- Log which env var is being used (but not the value)
- Use API keys with minimal required permissions

### ❌ DON'T

- Commit `.env` files to Git
- Share environment variable values in Slack or email
- Use same key across multiple environments
- Use weak or simple passwords
- Log environment variable values in production
- Commit API keys to repository

---

## Troubleshooting Variables

### Variable Not Loading

**Check:**
1. Variable is saved in Vercel Dashboard
2. Project has been redeployed after adding variable
3. Variable name matches exactly (case-sensitive)
4. Using correct syntax to access: `process.env.VARIABLE_NAME`

### CORS Origin Causing Issues

**Check:**
1. `CORS_ORIGIN` exactly matches frontend URL
2. URL includes `https://` (not just domain name)
3. No trailing slash at end
4. Correct project redeploy after updating

### Email Not Sending

**Check:**
1. All mail variables set: `MAIL_SERVICE`, `MAIL_USER`, `MAIL_PASS`
2. Gmail App Password is correct (not regular password)
3. Backend redeployed after adding variables
4. Check Vercel Function logs for errors

---

## Contact & Support

- **Vercel Docs:** https://vercel.com/docs/environment-variables
- **Google App Passwords:** https://myaccount.google.com/apppasswords
- **MongoDB Connection String:** https://docs.mongodb.com/manual/reference/connection-string/
- **SendGrid API Key:** https://sendgrid.com/docs/api-reference/

---
