# Phantom Radio Chatter

The official website for the band Phantom Radio Chatter — <https://phantomradiochatter.com>.

A small single-page app built with [Vite](https://vite.dev), [React](https://react.dev),
[React Router](https://reactrouter.com) and TypeScript, hosted on [Vercel](https://vercel.com).

## Getting started

Requires Node.js 24.

```sh
npm install
npm run dev
```

## Scripts

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the dev server at <http://localhost:5173>    |
| `npm run build`     | Type-check and build the production site to `dist` |
| `npm run preview`   | Serve the production build locally                 |
| `npm run lint`      | Lint with ESLint                                   |
| `npm run typecheck` | Type-check without building                        |
| `npm test`          | Run the test suite once                            |

## Project layout

```
index.html            Page shell and link-preview (Open Graph) tags
public/               Files served as-is: favicon, robots.txt, og-cover.jpg
src/
  data/site.ts        All site content: nav, social links, photos, embed IDs
  routes.tsx          URL → page mapping
  components/         Layout, Page card, PhotoButton, Lightbox
  pages/              One component per page
  assets/photos/      Photos (fingerprinted and cached long-term when built)
  index.css           All styles; colours are variables at the top
vercel.json           Vercel build settings, SPA fallback, cache and security headers
```

## Common edits

- **Tour dates** — add shows in Bandsintown for Artists; the Tour Dates page shows them
  automatically, with no change to the site.
- **Videos** — add them to the YouTube playlist; the Watch page embeds it. To switch playlists,
  change `YOUTUBE_PLAYLIST_ID` in `src/data/site.ts`.
- **Social links, navigation, gallery photos** — edit `src/data/site.ts`.
- **Add a photo** — drop it in `src/assets/photos/`, import it in `src/data/site.ts` the same way
  as the existing ones (once as-is, once with the `?w=…&as=srcset` suffix that generates the small
  phone-sized versions) and add it to `GALLERY`.
- **Add a page** — create a component in `src/pages/`, register it in `src/routes.tsx` and add a
  link to `NAV_ITEMS`.
- **Link-preview image** — replace `public/photos/og-cover.jpg` (keep the file name; it is
  referenced by absolute URL in `index.html`) and update the `og:image:width`/`height` tags.

## Deployment

Pushing to `main` deploys to Vercel. `vercel.json` sets the framework to Vite and the output
directory to `dist`, so no dashboard configuration is needed.
