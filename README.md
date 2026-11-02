# DIGITAL SHADOW: From Online Threats to Informed Action

## 1. Overview
A privacy-first, mobile-first PWA that helps women **Recognise**, **Protect**, **Preserve** and **Act** on online threats. Early-stage concept prototype for the SDG 5 Gender Equality Ideathon (SRM KTR).

## 2. Problem
Women may face online harassment, impersonation, suspicious messages and privacy violations, often unsure what to do next.

## 3. Solution
One user-controlled app combining warning-sign recognition, privacy checklists, safe documentation guidance and reporting information. It never claims to identify criminals, trace attackers, or guarantee safety.

## 4. Stack
React 18, Vite, JavaScript, React Router (HashRouter), Lucide icons, CSS3, service worker + web manifest. No backend, APIs, keys, login, analytics.

## 5. Features
Welcome and Home dashboard, Recognise (rule-based, not AI), Protect checklist (saved locally), Preserve evidence summary (copy/TXT download), Act (reporting guidance, cybercrime.gov.in, 112), Demo Mode (4 stages), About, Clear All Local Data, offline app shell.

## 6. Structure
```
index.html  vite.config.js  package.json
public/  manifest.webmanifest  sw.js  icon.svg  icon-192.png  icon-512.png
src/  main.jsx  App.jsx  ui.jsx  pages.jsx  data.js  styles.css
```

## 7-9. Install, run, build
```
npm install
npm run dev        # local dev server
npm run build      # outputs dist/
npm run preview    # test the production build (PWA works here)
```
Requires Node 18+.

## Git
```
git init
git add .
git commit -m "Initial Digital Shadow prototype"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## 10. Deploy on Vercel (recommended)
1. Create a free account at vercel.com (sign in with GitHub).
2. Click **Add New > Project** and import your repository.
3. Framework preset: **Vite**. Build command `npm run build`, output `dist`. Leave defaults.
4. Click **Deploy**. Your HTTPS URL (e.g. `https://your-project.vercel.app`) appears when finished.

## 11. Deploy on GitHub Pages
1. `npm install -D gh-pages`, then add scripts `"predeploy": "npm run build"` and `"deploy": "gh-pages -d dist"` to package.json.
2. Run `npm run deploy`.
3. In the repo: **Settings > Pages**, source branch `gh-pages`. Your URL is `https://USERNAME.github.io/REPO/`.
The app uses relative paths and hash routing, so it works under a sub-path.

## 12. Install on Android
1. Open the HTTPS URL in **Chrome** on your phone and let it load once.
2. Tap the **⋮** menu, then **Install app** (or **Add to Home screen**).
3. Launch from the home screen. It opens full-screen. Turn on airplane mode to confirm offline use.

## Steps from zero
A. Download and unzip the project. B. Create an empty repo on github.com. C. Run the Git commands above (or use **Upload files** on GitHub, excluding `node_modules`). D-F. Follow Vercel steps. G-H. Follow Android steps.

## 13. Limitations
Analysis is simple keyword/pattern matching with false positives and negatives. Not legal advice, not a verified evidence system. Reporting links and the offline first load need internet. The checklist is saved in browser storage; incident notes are never stored. Contacts and resources should be rechecked before the event.

## 14. Future development
Multilingual support (Tamil, Hindi), campus-specific support contacts (verified with SRM), better pattern libraries reviewed by experts, user testing with students, accessibility audit, optional on-device ML, partnership with women's safety organisations.

## Judge demo script (about 3 minutes)
1. **Welcome (20s):** problem, four stages, privacy statement: everything runs on-device.
2. **Demo Mode (60s):** tap through the fictional student scenario, Recognise to Act.
3. **Recognise (40s):** load "Account suspension", Analyse. Point out limitations text.
4. **Protect/Preserve (40s):** tick a few items, show the percentage; generate and download a summary.
5. **Act + install (20s):** show official resources, then the installed home-screen app working offline.
Close: "A concept prototype; next step is user testing with students."
