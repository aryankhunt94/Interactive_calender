# How to Upload to GitHub

Here are the steps to put your code on GitHub.

## 1. Initialize Git (if not done)
Run these commands in your terminal (`c:\antigravity\calendar-app`):

```bash
git init
git add .
git commit -m "Initial commit: Calendar App with Drawing and Notes"
```

## 2. Create a Repository on GitHub
1.  Go to [github.com/new](https://github.com/new).
2.  **Repository name**: `calendar-app` (or whatever you like).
3.  **Public/Private**: Choose Public if you want to show it in your portfolio.
4.  **Initialize with README**: Leave this **unchecked** (empty).
5.  Click **Create repository**.

## 3. Connect and Push
GitHub will show you a page with commands. Look for the section **"…or push an existing repository from the command line"**.

Copy and run those commands. They will look something like this (replace `YOUR_USERNAME` with your actual GitHub username):

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calendar-app.git
git push -u origin main
```

## 4. Verify
Refresh your GitHub page, and you should see all your code!
