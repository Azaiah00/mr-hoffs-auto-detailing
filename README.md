# Mr. Hoff's Auto Detailing — spec website

A finished, static spec website for **Mr. Hoff's Auto Detailing** (4843 Waller Rd, Richmond, VA 23230), built by
Couture House Co. as a sales concept for the owner, Dean Hoffman. No build step, no frameworks, no external requests.

## Pages
- `index.html` — home (hero, trust strip, services, ceramic explainer, press feature, why people come back, quick facts, FAQ)
- `services.html` — full detail, interior, exterior, ceramic coating (prep and care), restoration, new-vehicle protection, FAQ
- `about.html` — Dean Hoffman and the shop
- `contact.html` — Netlify quote form plus call card
- `thank-you.html` — form fallback confirmation (noindex)
- `404.html` — custom not-found page (root-absolute paths)

## Structure
```
assets/css/fonts.css   self-hosted @font-face (Fraunces, Inter via Fontsource, OFL)
assets/css/site.css    the single site stylesheet
assets/js/site.js      menu, reveals, counters, scroll-linked sheen and water-beading effect, form validation
assets/fonts/          woff2 files (latin subset)
assets/img/            optimized webp photos (+ -800 versions), og.jpg, favicons
robots.txt, sitemap.xml, llms.txt, site.webmanifest, netlify.toml
```

## Preview locally
Double-click `index.html`, or for fonts/preloads to behave exactly as in production:
```
cd mr-hoffs-auto-detailing
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy on Netlify
1. Drag this folder onto https://app.netlify.com/drop (or connect a Git repo; publish directory is `.`, no build command).
2. In Site settings > Forms, confirm the `quote` form is detected and add an email notification to the owner.
3. Add the custom domain and enable HTTPS.

`netlify.toml` sets security headers (CSP, HSTS, etc.), cache headers for `/assets`, and the pretty 404.
The CSP allows one inline script by hash (the tiny `js` class toggle in each page head). If you change that line, update the hash.

## Domain
Proposed: **mrhoffsdetailing.com** (used in canonical, Open Graph, sitemap and JSON-LD URLs). If a different domain is
registered, find-and-replace `mrhoffsdetailing.com` across the folder.

See `LAUNCH-NOTES.md` for everything to confirm with the owner before launch.
