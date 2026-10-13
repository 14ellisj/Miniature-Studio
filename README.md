# Miniature Studio — GitHub Pages website

A complete static site. No build, dependencies, account system or paid website hosting required. GitHub Pages can host this from a public repository on GitHub Free.

## Publish

1. Create a public GitHub repository, for example `miniature-studio`.
2. Upload the **contents of this folder**, including `assets`, to the repository root. `index.html` must be at the root, not inside another folder.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for the Pages deployment to finish. GitHub displays the website address on that page, usually `https://YOUR-USERNAME.github.io/miniature-studio/`.

Your support page is `/support.html`; your privacy page is `/privacy.html` under that website address. Check both while signed out before using them in App Store Connect.

## Pictures

The package includes three existing development screenshots. Replace them with your preferred release screenshots before public launch. Only use imagery you have permission to publish and advertise with.

- `assets/painting.png`: main hero and first gallery image.
- `assets/preparation.png`: conversion screenshot.
- `assets/primer.png`: demo model preview.
- `assets/icon.png`: app icon and favicon.

To add lots more images, put JPG, PNG or WebP files inside `assets`, then add entries to the `gallery` array in `site-config.js`. Each entry has `src`, `title`, and `alt`. There is no fixed gallery size; every image gets a click-to-enlarge view. Prefer descriptive filenames and compressed images around 1200–1800px wide. Keep alt descriptions meaningful.

## Links and launch

Edit `site-config.js` to add App Store, Google Play, Instagram and TikTok URLs. Blank social links are hidden. Before a store link exists, the Apple button downloads a launch calendar event. No broken App Store button or invented pre-order is shown.

The launch is **23 October 2026**. Android is described as **planned later in 2026**. There is no beta sign-up or mailing-list collection. Both phone and tablet audiences are featured equally.

On launch day, add the real Apple URL and set `appleReleased: true`. Also update the announcement, hero button, release heading and description/meta text in `index.html` from upcoming to available. The site deliberately does not claim release automatically based on the date. Do the equivalent when Android actually launches, and replace its future-tense paragraph. Update the £2.99 UK price if your price changes.

## Support and privacy

Support contact: jakeellis5000@icloud.com. Developer: EllisGaming.

The privacy page describes the current local-only iOS app and the static GitHub Pages website. It does not invent a support-email deletion schedule. Review the policy against actual practices before publication and update it for the Android release or any analytics/service changes.

## Edit the look

`style.css` controls colours, spacing and layout. All assets are local. No external fonts, tracking, cookies or embedded social players are used. The gallery needs JavaScript; the rest of the page and a fallback image link work without it.

## Local preview

From this folder run `python3 -m http.server 8765 --bind 127.0.0.1` and open `http://127.0.0.1:8765`. Stop the server with Ctrl+C. Or open index.html directly for a quick preview.
