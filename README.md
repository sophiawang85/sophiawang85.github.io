# sophiawang85.github.io

Sihan Wang — MIT mathematics and computer science portfolio. ML systems, multiplayer games, and Android projects.

Live at https://sophiawang85.github.io

## How this repo works

This repo holds the website's **source**. Every push to `main` triggers the
[`Build and deploy site`](.github/workflows/deploy.yml) workflow, which builds
the site and publishes it to GitHub Pages. There are no built files to edit by hand.

- Page content: `app/page.tsx`
- Styles: `app/globals.css`
- Images, résumé PDF, and other static files: `public/`

## Run it locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev     # live preview while editing
npm run build   # production build into dist/client
```

The site as deployed before this setup is preserved on the `built-site-backup` branch.
