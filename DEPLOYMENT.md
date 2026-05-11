# Deployment Guide

This project consists of two separate applications that can be deployed to Vercel:
- **Frontend**: React/Vite app
- **Backend**: Node.js/Express API

## Option 1: Deploy Both on Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Push your code to GitHub

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit: PFit Global Solutions website"
git push origin main
```

### Step 2: Deploy Frontend

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Select your GitHub repository
4. In **"Root Directory"**, select `/frontend`
5. Click **"Deploy"**
6. Your frontend will be live at a URL like `https://pfitglobal-frontend.vercel.app`

### Step 3: Deploy Backend

1. In Vercel Dashboard, click **"New Project"**
2. Select the same GitHub repository
3. In **"Root Directory"**, select `/backend`
4. Under **"Environment Variables"**, add:
   - `NODE_ENV` = `production`
5. Click **"Deploy"**
6. Your backend will be at `https://pfitglobal-backend.vercel.app`

### Step 4: Connect Frontend to Backend

Update `frontend/src/App.jsx` to use the deployed backend URL:

```javascript
const API_URL = 'https://pfitglobal-backend.vercel.app/api'
```

Then update the form submission:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const result = await response.json()
    alert(result.message)
    setFormData({ name: '', email: '', message: '' })
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## Option 2: Deploy Frontend Only (Backend as Serverless Functions)

Convert your Express routes to Vercel serverless functions in `frontend/api/` directory.

---

## Option 3: Deploy on Alternative Platforms

### Frontend Alternatives
- Netlify
- GitHub Pages
- AWS Amplify

### Backend Alternatives
- Railway
- Render
- Heroku
- AWS Lambda

---

## Domain Setup

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel Project Settings → Domains
3. Add your custom domain and follow DNS instructions
4. Point backend to subdomain: `api.yourdomain.com`

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
