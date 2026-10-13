# Miniature Studio website

All website files are in this folder. The design is a miniature painter’s workbench: ruled paper, paint samples, a numbered painting journal and iPhone/iPad frames.

## Add your pictures

Open `site-config.js`. Put raw screenshots in `assets/` and fill in the blank `src` values:

- `tablet.src: 'assets/ipad-finished.png'` — main iPad image.
- `phone.src: 'assets/iphone-painting.png'` — main iPhone image.
- Each `gallery` entry — six suggested stories, expandable to any number.

Use `device: 'iphone'` or `device: 'ipad'`. Borders are automatic. Screenshots retain their full aspect ratio; do not add a second frame yourself. Update each `alt` description and caption to match the actual image. Empty entries show labelled placeholders, with no broken images or fake buttons. Older screenshots remain in assets for reference but are not displayed.

Suggested gallery: finished miniature, close-up, paint library, drybrushing, STL preparation, saved projects.

## Add your video

Add an MP4 to assets, then set `video.src`, for example `assets/painting-demo.mp4`. Optional: `video.poster` (preview image), `video.captions` (English WebVTT file) and `video.transcript` (plain text). The player has controls and does not autoplay. Until you add a file, a clearly labelled film placeholder is shown. A useful 15–25 second sequence is basecoat → shade → drybrush → finished miniature.

## Launch settings: one place

Edit `site-config.js`, then run `node build.mjs` in this folder. This generates `index.html` and the launch calendar. It updates the banner, main button, price notes, release section and search/social descriptions together.

When Apple actually releases the app, add its real HTTPS link to `appleUrl` and set `appleReleased: true`. The build rejects “released” without a store link. Do the same for Android later with `androidUrl` and `androidReleased`. No date automatically claims the app is live. The current launch date is 23 October 2026 and UK price is £2.99.

For layout and wording, edit `page-template.html`, not generated `index.html`. CSS lives in `style.css`. Changes to pictures/config are loaded by the browser, but rerun the build for launch text.

## GitHub Pages

Recommended: in repository Settings → Pages, choose **GitHub Actions** as the Source. The included `.github/workflows/pages.yml` builds and publishes after a push to main. This means editing the release setting on GitHub triggers the build automatically. No packages, paid services or secrets are needed.

Alternatively, keep **Deploy from a branch** (main/root). Run `node build.mjs` locally and commit the generated index.html and launch.ics with your changes. Do not switch methods unless you want to. No remote settings have been changed.

The configured public URL is `https://14ellisj.github.io/MiniatureStudio/`, inferred from this repository’s remote. If your published address differs, update `siteUrl` and rebuild. It sets the canonical and social image URL; hosting was not independently verified.

## Social preview

`assets/social-preview.png` is a 1200 × 630 brand graphic. The page includes Open Graph and large-card metadata. It uses evergreen wording so launch changes do not require regenerating the graphic. `social-card.html` is the editable artwork source. Social networks may cache old previews after publishing.

Add your actual Instagram and TikTok profile URLs in site-config.js; blank links are hidden.

## Preview locally

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this folder, then visit `http://127.0.0.1:8765`. Stop with Ctrl+C.

## Support and privacy

Support and privacy pages are included. Review the policy against your actual practices before publication. Contact: jakeellis5000@icloud.com. Brand: EllisGaming.

No analytics, trackers, external fonts or embedded social media are included. Video and screenshots are hosted as ordinary files. Use pictures and recordings you have permission to publish.

## Paint brands and colour mixing

The paint-drawer swatches and interactive ratio study are original HTML/CSS website illustrations, not app screenshots or manufacturer artwork. They need no image downloads and scale to phone/tablet screens. The ratio study uses an approximate weighted sRGB blend and still shows a static recipe without JavaScript. It does not claim to predict physical pigment mixing.

The gallery now also includes an iPad-framed mixer screenshot placeholder. Add a real screenshot in its `site-config.js` entry when ready. Paint-brand names are references, not endorsements. Avoid claiming every archived or specialist product is included.
