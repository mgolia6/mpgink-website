# Deploy mpgink.com — Quick Checklist

## Step 1: Push to GitHub

```bash
# In your terminal, navigate to the mpgink-website folder
cd /path/to/mpgink-website

# Add your GitHub repo as remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/mpgink-website.git

# Push to GitHub
git push -u origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings**
3. Click **Pages** (in left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**

GitHub will give you a URL like: `https://YOUR_USERNAME.github.io/mpgink-website`

## Step 3: Point Your Domain

In your domain registrar (wherever you bought mpgink.com):

### For www.mpgink.com:
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: Automatic or 3600
```

### For mpgink.com (root/apex domain):
```
Type: A Records (add all 4)
Name: @ (or leave blank)
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
TTL: Automatic or 3600
```

## Step 4: Configure Custom Domain in GitHub

Back in GitHub Pages settings:

1. Under "Custom domain", enter: `mpgink.com`
2. Click **Save**
3. Wait a few minutes
4. Check the **Enforce HTTPS** box once it becomes available

## Step 5: Wait for DNS Propagation

- Can take 5 minutes to 48 hours
- Usually happens within 1-2 hours
- Test by visiting mpgink.com

## Done

Your site is live. Changes you push to the repo auto-deploy.

---

## Alternative: Quick Upload (No GitHub)

If you just want it live RIGHT NOW without GitHub:

1. Download `index.html` from this folder
2. Log into your web hosting control panel
3. Upload `index.html` to your public_html or www folder
4. Rename it to `index.html` if not already
5. Visit mpgink.com

Done. No version control, but it's live.
