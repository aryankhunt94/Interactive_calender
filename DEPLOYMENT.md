# Deployment Guide

You can deploy this project to Vercel for free in just a few minutes.

## Option 1: Deploy via Vercel CLI (Recommended)

You don't need to install anything permanently. Just use `npx`:

1.  **Run the deploy command**:
    Run this in your terminal inside the `calendar-app` folder:
    ```bash
    npx vercel
    ```
    - If asked to install `vercel`, type `y` and press Enter.
    - **No Account?** When it opens your browser to log in, you can **Sign Up** for free right there (using GitHub, GitLab, Bitbucket, or Email).
    - Follow the prompts (say "Y" to everything).
    - It will give you a "Production" link (e.g., `https://calendar-app-xyz.vercel.app`).

## Option 2: Deploy via GitHub

1.  Push this code to a new GitHub repository.
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click "Add New..." -> "Project".
4.  Import your GitHub repository.
5.  Click "Deploy".

## Local Development

To run the app locally:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
