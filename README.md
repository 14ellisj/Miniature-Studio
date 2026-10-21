# Miniature Studio website

All website files are in this folder. The October 2026 redesign uses an editorial field-journal layout: a charcoal typographic cover, annotated workspace, sequential painting notes, paint register and dark screenshot contact sheet. Mint, sage and warm paper retain the existing palette. Layout and copy are bespoke to Miniature Studio’s painting-on-the-train origin.

## Add your pictures

Open `site-config.js`. Put raw screenshots in `assets/` and fill in the blank `src` values:

- `tablet.src: 'assets/ipad-painting.mp4'` — first iPad frame, now a video. Add an MP4 screen recording; it plays inside the iPad border with controls and no autoplay. Optional `tablet.poster` accepts a still image and `tablet.captions` an English WebVTT file. Portrait and landscape recordings retain their natural proportions.
- `phone.src: 'assets/iphone-painting.png'` — main iPhone image.
- Each `gallery` entry — six suggested stories. The gallery follows the opening workspace, with two large pictures per row on desktop and one per row on phones.

Use `device: 'iphone'` or `device: 'ipad'`. Borders are automatic. Screenshots retain their full aspect ratio; do not add a second frame yourself. Update each `alt` description and caption to match the actual image. Empty entries show labelled placeholders, with no broken images or fake buttons. Older screenshots remain in assets for reference but are not displayed.

Suggested gallery: finished miniature, close-up, paint library, colour mixing, drybrushing and STL preparation.

## Add your video

Add an MP4 to assets, then set `video.src`, for example `assets/painting-demo.mp4`. Optional: `video.poster` (preview image), `video.captions` (English WebVTT file) and `video.transcript` (plain text). The player has controls and does not autoplay. Until you add a file, a clearly labelled film placeholder is shown. A useful 15–25 second sequence is basecoat → shade → drybrush → finished miniature.

## Launch settings: one place

The launch reminder appears immediately on each page visit and stays until the visitor closes it, chooses Maybe later or presses Escape. Downloading the calendar does not dismiss it. Set `launchReminder.enabled: false` to disable it. It uses no cookies or browser storage and is not offered on or after the launch date, or when `appleReleased` is true. Visitors must open the downloaded ICS file to add the event to their calendar.

Edit `site-config.js`, then run `node build.mjs` in this folder. This generates `index.html` and the launch calendar. It updates the banner, main button, price notes, release section and search/social descriptions together.

The Apple launch switch is automatic at `appleLaunchAt: '2026-10-23T00:00:00+01:00'`: midnight at the start of Friday 23 October 2026 in Europe/London (BST), equivalent to Thursday 22 October at 23:00 UTC. Keep `appleReleased: false` before then; setting it true is an immediate manual override. At launch, the browser updates the announcement, main/release buttons, heading, status, price note and description; it hides the calendar reminder and removes calendar-download behaviour. It checks every second and again when a page regains focus or becomes visible, so an already-open page also switches. Visitors' device clocks determine the change; suspended/offline pages update when resumed. No cookies, tracking, paid scheduler or midnight deployment is used. Without JavaScript, the page reflects the last build time until rebuilt.

The download destination is `https://apps.apple.com/app/id6821610088`. The automatic switch does not check Apple's release status: make sure the app is approved and scheduled to be available at that time. If release is delayed, change `appleLaunchAt` and redeploy before the deadline. Without a valid link, the calendar still disappears but a disabled “App Store link coming shortly” message replaces download buttons. Android timing is independent and remains unchanged. Run `node check-launch.mjs` to test the boundary and fallback without changing your computer clock. The current UK price is £2.99.

Upload/push these changes to GitHub Pages **before** launch. Updating the local folder alone does not update the public website. The included GitHub Actions workflow copies `launch-state.js` with the other site files. A build after launch also writes the released wording directly into HTML for non-JavaScript visitors and crawlers.

For layout and wording, edit `page-template.html`, not generated `index.html`. CSS lives in `style.css`. Changes to pictures/config are loaded by the browser, but rerun the build for launch text.

## GitHub Pages

Recommended: in repository Settings → Pages, choose **GitHub Actions** as the Source. The included `.github/workflows/pages.yml` builds and publishes after a push to main. This means editing the release setting on GitHub triggers the build automatically. No packages, paid services or secrets are needed.

Alternatively, keep **Deploy from a branch** (main/root). Run `node build.mjs` locally and commit the generated index.html and launch.ics with your changes. Do not switch methods unless you want to. No remote settings have been changed.

The configured public URL is `https://miniature-studio.co.uk/`. If your published address changes, update `siteUrl` and rebuild. It sets the canonical and social image URLs.

## Social preview

`assets/social-preview.png` is a 1200 × 630 brand graphic. The page includes Open Graph and large-card metadata. It uses evergreen wording so launch changes do not require regenerating the graphic. `social-card.html` is the editable artwork source. Social networks may cache old previews after publishing.

Add your actual Instagram and TikTok profile URLs in site-config.js; blank links are hidden.

## Preview locally

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this folder, then visit `http://127.0.0.1:8765`. Stop with Ctrl+C.

## Support and privacy

### Legal review still required before publishing these changes

Owner-confirmed identity: **Jake Ellis trading as EllisGaming**, sole trader. Intended distribution is worldwide wherever Apple allows, not verified worldwide compliance. The updated policy is not yet a complete legal sign-off: a publishable business address, support-email retention policy, documented lawful bases and relevant provider/transfer arrangements remain to be confirmed. Do not fill these with invented details. Obtain legal review for the actual business practices and intended territories, including applicable trader disclosures and privacy requirements.

The owner confirms model/promotional permissions exist, but the documents have not been reviewed. Check underlying rights and commercial redistribution, in-app export, printing and advertising permissions. Paint catalogue rights also need review; a non-affiliation statement does not establish permission. No licences, store settings or territory approvals have been certified or submitted by this work.

The new `/usage/` page explains model permissions, digital paint limitations, exports, backups and consumer rights. It links to Apple's standard EULA but is **not** a custom EULA or a blanket liability waiver. All three information pages use the existing site's shared design. The website now identifies the confirmed sole trader and adds privacy-rights/complaint guidance.

Edit `content/usage.html` for that page. Run `node build.mjs` and `node check-pages.mjs`. Include the generated `usage/` directory along with `help/` and `policy/` when uploading manually. GitHub Actions now includes it automatically. Changes are local until you deploy them. Verify `/help/`, `/policy/` and `/usage/` over HTTPS after deployment.

Help lives at `/help/` and the privacy policy at `/policy/`. GitHub Pages redirects `/help` and `/policy` to these directory pages. Both share the main site's typography and colours, with a linked contents list and mobile layout. Old `support.html` and `privacy.html` links redirect to the new pages.

The build embeds the current shared CSS in each help/privacy page. This prevents an older cached stylesheet from removing the new layout. After changing CSS, rerun the build and upload both generated directory pages as well. No separate stylesheet download is required for these two pages.

Edit the page text in `content/help.html` and `content/policy.html`, the shared layout in `information-template.html`, and run `node build.mjs`. The build generates both directory pages and the legacy redirects. GitHub Actions includes both directories in the published site. For manual upload or branch deployment, include the generated `help/` and `policy/` directories, updated homepage, CSS, config and redirects. Review the policy against your actual practices before publication. Contact: miniaturestudio4@gmail.com. Brand: EllisGaming.

No analytics, trackers, external fonts or embedded social media are included. Video and screenshots are hosted as ordinary files. Use pictures and recordings you have permission to publish.

## Paint brands and colour mixing

The paint register and interactive ratio study use original HTML/CSS, not manufacturer artwork. Both paint dropdowns include six sample colours across the three brands. They need no image downloads and scale to phone/tablet screens. The ratio study uses an approximate weighted sRGB blend and still shows a static recipe without JavaScript. It does not claim to predict physical pigment mixing.

The gallery now also includes an iPad-framed mixer screenshot placeholder. Add a real screenshot in its `site-config.js` entry when ready. Paint-brand names are references, not endorsements. Avoid claiming every archived or specialist product is included.
