# BB Sculpt Mobile Web App

This is a mobile-first static web app for BB Sculpt. It is designed to open cleanly on iPhone from a normal web link and can be added to the home screen like a lightweight app.

## What's included
- Mobile-first responsive front end
- Home, booking, plan, progress, therapy, messages, account, and photos screens
- Hash routing so screens can be linked directly
- PWA manifest and icons
- No build step required

## Fastest way to get a shareable link
### Option 1: Netlify
1. Go to Netlify
2. Drag the entire folder onto the deploy area
3. Netlify gives you a live URL immediately

### Option 2: Vercel
1. Create a new project in Vercel
2. Upload this folder
3. Deploy as a static site

## File structure
- index.html
- styles.css
- app.js
- manifest.json
- icons/

## Direct screen links after deployment
- /#home
- /#schedule
- /#plan
- /#progress
- /#therapy
- /#photos
- /#more
- /#messages

## Notes
This is a polished front-end MVP. It does not include a real backend for:
- authentication
- payment processing
- booking integrations
- messaging server
- photo uploads
- analytics

Those can be wired later without rebuilding the visual app shell.
