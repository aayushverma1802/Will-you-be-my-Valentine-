# Deploy to Render.com (FREE)

## Quick Steps:

1. **Go to Render.com** - https://render.com
   - Sign up for free account (use GitHub)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select this repository

3. **Configure Settings:**
   - **Name:** valentine-app (or any name)
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
   - **Plan:** Free

4. **Deploy!**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Your app will be live at: `https://your-app-name.onrender.com`

## Notes:
- Free tier spins down after 15 min inactivity (takes ~30 seconds to wake up)
- Static files work automatically - Flask serves them from `static/` folder
- Auto-deploys on every git push to main branch

## Alternative: Railway.app (Also FREE)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Flask - just click "Deploy"
6. Done! Your app is live.
