# Harry Nguyen Portfolio

Static portfolio website for Harry (Minh Tien) Nguyen.

## Tech stack

- HTML
- CSS
- JavaScript

## Project structure

- `index.html`: Main page content and SEO metadata
- `static/css/theme.css`: Design tokens and global base styles
- `static/css/layout.css`: Page layout and responsive grid structure
- `static/css/components.css`: Reusable UI components and accessibility states
- `static/js/main.js`: Mobile navigation, binary background, and contact form logic
- `images/`: Icons, social-preview image, and section placeholders

## Local preview

Because this is a static website, you can open `index.html` directly in a browser or serve the folder with any static file server.

## Deployment notes (GitHub Pages)

1. Push changes to the repository default branch.
2. In GitHub repository settings, enable GitHub Pages for the root of the selected branch.
3. Keep all asset paths relative (already configured) so the site works in Pages hosting.

## Content maintenance checklist

- Replace placeholder SVG files in `images/` with your real project screenshots and profile photo.
- Update project links and role descriptions as your portfolio evolves.
- Verify `canonical`, `og:url`, and social metadata in `index.html` if your final domain changes.
