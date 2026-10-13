'use strict';
const config = window.STUDIO || {};
const webUrl = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : null; } catch { return null; } };
const hero = document.getElementById('hero-image');
if (hero && config.heroImage) { hero.src = config.heroImage; hero.alt = config.heroAlt || ''; }
const gallery = document.getElementById('gallery-grid');
const dialog = document.getElementById('lightbox');
if (gallery && dialog) {
  for (const item of config.gallery || []) {
    const figure = document.createElement('figure'); figure.className = 'gallery-item';
    const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', 'Enlarge: ' + item.title);
    const img = document.createElement('img'); img.src = item.src; img.alt = item.alt; img.loading = 'lazy';
    const caption = document.createElement('figcaption'); caption.textContent = item.title;
    button.append(img); figure.append(button, caption); gallery.append(figure);
    button.addEventListener('click', () => { const enlarged = document.getElementById('lightbox-image'); enlarged.src = item.src; enlarged.alt = item.alt; document.getElementById('lightbox-caption').textContent = item.title; dialog.showModal(); });
  }
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
}
const apple = document.getElementById('apple-link');
if (apple && webUrl(config.appleUrl)) { apple.href = webUrl(config.appleUrl); apple.removeAttribute('download'); apple.textContent = config.appleReleased ? 'View on the App Store ↗' : 'View App Store listing ↗'; }
if (config.appleReleased && webUrl(config.appleUrl)) document.getElementById('apple-status').textContent = 'Available now';
const android = document.getElementById('android-link');
if (android && webUrl(config.androidUrl)) { android.href = webUrl(config.androidUrl); android.textContent = 'View on Google Play ↗'; }
if (config.androidReleased && webUrl(config.androidUrl)) { document.getElementById('android-status').textContent = 'Available now'; document.getElementById('android-note').textContent = 'Explore Miniature Studio on Android.'; }
const socials = document.getElementById('social-links');
if (socials) for (const [label, url] of [['Instagram', config.instagramUrl], ['TikTok', config.tiktokUrl]]) { if (webUrl(url)) { const a = document.createElement('a'); a.href = webUrl(url); a.textContent = label; socials.append(a); } }
