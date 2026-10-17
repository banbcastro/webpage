# Esteban Castro — Personal Website

Static site (HTML + CSS + vanilla JS). No build step, no npm.

```
WEBPAGE/
├── index.html              Home: hero, video, section menu, contact
├── certificates.html       Certificates & Degrees
├── assets/
│   ├── css/  base.css (tokens, nav, footer) · home.css · certificates.css
│   ├── js/   main.js (effects) · certificates.js (renders cards)
│   │   └── data/certificates.js   ← EDIT YOUR CERTIFICATES HERE
│   └── img/                (empty for now)
├── .nojekyll               needed for GitHub Pages
└── .htaccess               ignored by GitHub Pages (only for Apache hosts)
```

## Publish on GitHub Pages
1. Create a repo, upload the *contents* of this folder to the root.
2. Settings → Pages → Deploy from branch → `main` / `(root)`.
3. After each change to CSS/JS, bump `?v=20261016` in the HTML files so browsers fetch the new version.

## Edit
- Colors, fonts: top of `assets/css/base.css` (`:root`).
- Videos: replace each `.ph` block in `index.html` with `<video>` or `<iframe>`.
- Entries marked `placeholder: true` show a “Sample” label until you remove that flag.
