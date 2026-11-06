import fs from 'node:fs';
import path from 'node:path';

// Static directory routes work with both GitHub Pages deployment methods.
export function buildInformation(root, siteUrl) {
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const pages = [
    {slug:'usage', TITLE:'Usage & licences',
      DESCRIPTION:'Model permissions, paint references, export guidance and consumer rights for Miniature Studio.',
      EYEBROW:'FIELD NOTES / USAGE & LICENCES', HEADING:'Make it yours.<br><em>Know the details.</em>',
      INTRO:'A few practical notes about models, paint references, exports and your rights.',
      SUBJECT:'Miniature Studio usage question', CONTACT_LABEL:'Ask a question',
      SIDE_NOTE:'Jake Ellis trading as EllisGaming. Check the terms supplied by the store where you obtain the app.',
      CONTACT_HEADING:'Something unclear?', CONTACT_COPY:'Ask about model permissions, exports or the licence accompanying your purchase.'},
    {slug:'help', old:'support.html', TITLE:'Help & painting guide',
      DESCRIPTION:'Learn painting controls, save locally and sync projects, export models and get help with Miniature Studio.',
      EYEBROW:'FIELD NOTES / HELP & SUPPORT', HEADING:'Back to<br><em>painting.</em>',
      INTRO:'Your first miniature, your next brushstroke, or a little help when something goes wrong. Start here.',
      SUBJECT:'Miniature Studio support', CONTACT_LABEL:'Email support',
      SIDE_NOTE:'For iPhone, iPad and the upcoming Android edition. Start with the instructions for your device.',
      CONTACT_HEADING:'Still stuck?', CONTACT_COPY:'Tell us your device, app version and what happened. An error message or screenshot helps. Only send models you have permission to share.'},
    {slug:'policy', old:'privacy.html', TITLE:'Privacy policy',
      DESCRIPTION:'How Miniature Studio handles local projects, optional project syncing, sharing and support correspondence.',
      EYEBROW:'FIELD NOTES / PRIVACY', HEADING:'Your models.<br><em>Your business.</em>',
      INTRO:'What stays on your device, how optional project syncing works, and what happens when you share or contact us.',
      SUBJECT:'Miniature Studio privacy', CONTACT_LABEL:'Ask a privacy question',
      SIDE_NOTE:'Miniature Studio is developed by EllisGaming. This policy covers the Apple app, the upcoming Android edition and this website.',
      CONTACT_HEADING:'Questions about privacy?', CONTACT_COPY:'Contact EllisGaming about this policy or to ask about your support correspondence, including requests for deletion.'}
  ];
  const template = fs.readFileSync(path.join(root,'information-template.html'),'utf8');
  for (const page of pages) {
    const headings = [];
    const body = fs.readFileSync(path.join(root,'content',page.slug+'.html'),'utf8').replace(/<h2(?: id="([^"]+)")?>([^<]+)<\/h2>/g, (_, given, title) => {
      const id = given || title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
      headings.push({id,title}); return `<h2 id="${id}">${title}</h2>`;
    });
    const canonical = new URL(page.slug+'/',siteUrl).href;
    const values = {...page, SITE_URL:siteUrl, CANONICAL:canonical};
    // Bundle the exact shared CSS into each page. New HTML must never depend
    // on a previously cached style.css from before these layouts existed.
    const raw = {BODY:body, HEADING:page.HEADING, PAGE_STYLES:fs.readFileSync(path.join(root,'style.css'),'utf8'),
      CONTENTS:headings.map(({id,title},i)=>`<a href="#${id}"><span>${String(i+1).padStart(2,'0')}</span>${escape(title)}</a>`).join(''),
      HELP_CURRENT:page.slug==='help'?'aria-current="page"':'', POLICY_CURRENT:page.slug==='policy'?'aria-current="page"':'', USAGE_CURRENT:page.slug==='usage'?'aria-current="page"':''};
    const html = template.replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=> {
      if(key in raw)return raw[key];
      if(!(key in values))throw Error('Unknown information template key '+key);
      return escape(values[key]);
    });
    fs.mkdirSync(path.join(root,page.slug),{recursive:true});
    fs.writeFileSync(path.join(root,page.slug,'index.html'),html);
    // Keep old bookmarks and App Store links working, including section anchors.
    if (!page.old) continue;
    fs.writeFileSync(path.join(root,page.old),`<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(page.TITLE)} — Miniature Studio</title><link rel="canonical" href="${escape(canonical)}"><meta http-equiv="refresh" content="0;url=${page.slug}/"><script>location.replace(${JSON.stringify(page.slug+'/')}+location.hash);</script></head><body><p>This page has moved. <a href="${page.slug}/">Continue to ${escape(page.TITLE)}</a>.</p></body></html>\n`);
  }
}
