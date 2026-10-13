'use strict';
const config=window.STUDIO||{};
const webUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}};
function deviceFrame(item){
 const frame=document.createElement('div');frame.className='device-frame '+(item.device==='iphone'?'device-iphone':'device-ipad');
 const screen=document.createElement('div');screen.className='device-screen';
 if(item.src){const img=document.createElement('img');img.src=item.src;img.alt=item.alt||'';img.loading='lazy';screen.append(img);}
 else{const slot=document.createElement('div');slot.className='image-placeholder';const title=document.createElement('strong');title.textContent=item.label||item.title;const note=document.createElement('span');note.textContent=(item.device==='iphone'?'iPhone':'iPad')+' screenshot goes here';slot.append(title,note);screen.append(slot);}
 frame.append(screen);return frame;
}
for(const[id,item]of[['hero-tablet',config.tablet],['hero-phone',config.phone]])if(item)document.getElementById(id)?.append(deviceFrame(item));
const gallery=document.getElementById('gallery-grid'),dialog=document.getElementById('lightbox');
if(gallery&&dialog){
 for(const item of config.gallery||[]){
  const figure=document.createElement('figure');figure.className='gallery-item';
  const stage=document.createElement('p');stage.className='gallery-stage';stage.textContent=item.stage||'FROM THE STUDIO';figure.append(stage);
  const frame=deviceFrame(item);
  if(item.src){const button=document.createElement('button');button.type='button';button.setAttribute('aria-label','Enlarge: '+item.title);button.append(frame);figure.append(button);button.addEventListener('click',()=>{const img=document.getElementById('lightbox-image');img.src=item.src;img.alt=item.alt||'';document.getElementById('lightbox-caption').textContent=item.title;dialog.showModal();});}
  else{const slot=document.createElement('div');slot.className='gallery-slot';slot.append(frame);figure.append(slot);}
  const caption=document.createElement('figcaption'),title=document.createElement('strong'),note=document.createElement('span');title.textContent=item.title;note.textContent=item.note||'';caption.append(title,note);figure.append(caption);gallery.append(figure);
 }
 dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 if((config.gallery||[]).every(item=>item.src))document.querySelector('#gallery .small').textContent='Actual app screenshots. Select a picture to explore the details.';
}
const area=document.getElementById('painting-video');
if(area){
 if(config.video?.src){const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='metadata';video.src=config.video.src;video.setAttribute('aria-label',config.video.title);if(config.video.poster)video.poster=config.video.poster;if(config.video.captions){const track=document.createElement('track');track.kind='captions';track.srclang='en';track.label='English';track.src=config.video.captions;track.default=true;video.append(track);}area.append(video);if(config.video.transcript){const p=document.createElement('p');p.className='video-transcript';p.textContent=config.video.transcript;area.append(p);}}
 else{const slot=document.createElement('div');slot.className='video-placeholder';const number=document.createElement('span'),title=document.createElement('strong'),note=document.createElement('p');number.textContent='STUDIO FILM / 01';title.textContent='A painting session, in miniature.';note.textContent='Your 15–25 second painting video goes here.';slot.append(number,title,note);area.append(slot);}
}
const socials=document.getElementById('social-links');
if(socials)for(const[label,url]of[['Instagram',config.instagramUrl],['TikTok',config.tiktokUrl]])if(webUrl(url)){const a=document.createElement('a');a.href=webUrl(url);a.textContent=label;socials.append(a);}

/* Small, clearly labelled website illustration using the app's weighted sRGB approach. */
const ratio=document.getElementById('mix-ratio');
if(ratio){
 document.getElementById('mix-demo-controls').hidden=false;
 const updateMix=()=>{
  const parts=Number(ratio.value), blue=[15,61,124];
  const hex='#'+blue.map(channel=>Math.round((channel*parts+255)/(parts+1)).toString(16).padStart(2,'0')).join('').toUpperCase();
  document.getElementById('blue-parts').textContent=parts+' '+(parts===1?'part':'parts');
  document.getElementById('mix-ratio-value').value=parts+' : 1';
  document.getElementById('mixed-swatch').style.setProperty('--mixed',hex);
  document.getElementById('mixed-hex').textContent=hex;
  ratio.setAttribute('aria-valuetext',parts+' parts Macragge Blue to 1 part Vallejo White');
 };
 ratio.addEventListener('input',updateMix);updateMix();
}
