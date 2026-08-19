This project wraps an existing static site into a Next.js app while preserving all HTML, CSS, JS, fonts and assets exactly as they are.

How it works:
- The original static site has been extracted into the `public/` folder unchanged.
- next.config.js programmatically creates rewrites that map each route (e.g. `/about`) to its corresponding `public/<dir>/index.html` so route behavior and assets are identical.

To run locally:
1. npm install
2. npm run dev

To deploy to Vercel:
- Push repository to Git, connect to Vercel. Vercel will run `npm install` and `npm run build` automatically.

Notes:
- All CSS, fonts and JS are served from `public/assets` and other files under `public/` without modification.
- If any route is missing, add an `index.html` under the respective path in `public/` or adjust rewrites in next.config.js.
# noc247
# noc247
