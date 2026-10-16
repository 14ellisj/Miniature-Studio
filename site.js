'use strict';
const config=window.STUDIO||{};

/* Show immediately before launch and remain until explicitly dismissed. */
const launchReminder=document.getElementById('launch-reminder');
if(launchReminder&&config.launchReminder?.enabled!==false&&!config.appleReleased){
 const launchDay=new Date(config.appleLaunchDate+'T00:00:00');
 const beforeLaunch=()=>Number.isFinite(+launchDay)&&Date.now()<+launchDay;
 if(beforeLaunch()){
  document.getElementById('reminder-date').textContent=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric'}).format(launchDay);
  launchReminder.hidden=false;
  const dismiss=()=>{launchReminder.hidden=true;};
  launchReminder.querySelector('.reminder-close').addEventListener('click',dismiss);
  launchReminder.querySelector('.reminder-later').addEventListener('click',dismiss);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!launchReminder.hidden)dismiss();});
 }
}
const webUrl=value=>{try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}};
const deviceNames={iphone:'iPhone',ipad:'iPad',duo:'Duo'};
function deviceFrame(item){
 const device=deviceNames[item.device]?item.device:'ipad';
 const frame=document.createElement('div');frame.className='device-frame device-'+device;
 const screen=document.createElement('div');screen.className='device-screen';
 if(item.type==='video'&&item.src){
  const video=document.createElement('video');video.src=item.src;video.controls=true;video.playsInline=true;video.preload='metadata';video.setAttribute('aria-label',item.alt||item.label||'Painting demonstration');
  if(item.poster)video.poster=item.poster;
  if(item.captions){const track=document.createElement('track');track.kind='captions';track.srclang='en';track.label='English';track.src=item.captions;video.append(track);}
  const fallback=document.createElement('a');fallback.href=item.src;fallback.textContent='Open the painting video';video.append(fallback);
  video.addEventListener('error',()=>{if(!screen.querySelector('.video-error')){const message=document.createElement('p');message.className='video-error';message.textContent='This video could not load. ';const link=document.createElement('a');link.href=item.src;link.textContent='Try opening the recording';message.append(link);screen.append(message);}});
  screen.append(video);
 }
 else if(item.src||item.poster){const img=document.createElement('img');img.src=item.src||item.poster;img.alt=(item.alt||'App screenshot')+' — '+deviceNames[device];img.loading=item.eager?'eager':'lazy';img.decoding='async';if(item.eager)img.fetchPriority='high';const sizes={iphone:[1206,2622],ipad:[1640,2360],duo:[2007,2853]};[img.width,img.height]=sizes[device];screen.append(img);}
 else{const slot=document.createElement('div');slot.className='image-placeholder'+(item.type==='video'?' recording-placeholder':'');const title=document.createElement('strong');title.textContent=item.label||item.title;const note=document.createElement('span');note.textContent=(item.device==='iphone'?'iPhone':'iPad')+(item.type==='video'?' screen recording goes here':' screenshot goes here');slot.append(title,note);screen.append(slot);}
 frame.append(screen);return frame;
}
for(const[id,item]of[['hero-tablet',config.tablet],['hero-phone',config.phone]])if(item)document.getElementById(id)?.append(deviceFrame({...item,eager:true}));
const gallery=document.getElementById('gallery-grid'),dialog=document.getElementById('lightbox');
if(gallery&&dialog){
 for(const item of config.gallery||[]){
  const figure=document.createElement('figure');figure.className='gallery-item';
  const stage=document.createElement('p');stage.className='gallery-stage';stage.textContent=item.stage||'FROM THE STUDIO';figure.append(stage);
  const variants=item.variants?.length?item.variants:[item];
  let selected={...item,...variants[0]};
  const button=document.createElement('button');button.type='button';button.className='screenshot-open';
  const switches=document.createElement('div');switches.className='device-switch';switches.setAttribute('role','group');switches.setAttribute('aria-label','Choose device for '+item.title);
  const render=()=>{
   button.replaceChildren(deviceFrame(selected));
   button.setAttribute('aria-label','Enlarge: '+item.title+' on '+deviceNames[selected.device]);
   for(const control of switches.children)control.setAttribute('aria-pressed',String(control.dataset.device===selected.device));
  };
  for(const variant of variants){const control=document.createElement('button');control.type='button';control.dataset.device=variant.device;control.textContent=deviceNames[variant.device];control.addEventListener('click',()=>{selected={...item,...variant};render();});switches.append(control);}
  if(variants.length>1)figure.append(switches);
  render();figure.append(button);
  button.addEventListener('click',()=>{if(!selected.src)return;document.getElementById('lightbox-media').replaceChildren(deviceFrame(selected));document.getElementById('lightbox-caption').textContent=item.title+' · '+deviceNames[selected.device];dialog.showModal();});
  const caption=document.createElement('figcaption'),title=document.createElement('strong'),note=document.createElement('span');title.textContent=item.title;note.textContent=item.note||'';caption.append(title,note);figure.append(caption);gallery.append(figure);
 }
 dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 if((config.gallery||[]).every(item=>item.src||item.variants?.length))document.querySelector('#gallery .small').textContent='Actual app screenshots. Switch devices to compare, or tap a picture for a closer look.';
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
 const paints=[
  {name:'Macragge Blue',brand:'Citadel',range:'Base',hex:'#0F3D7C'},
  {name:'Mephiston Red',brand:'Citadel',range:'Base',hex:'#960C09'},
  {name:'Daemonic Yellow',brand:'The Army Painter',range:'Warpaints Fanatic',hex:'#FECD29'},
  {name:'Mid DAK Green',brand:'The Army Painter',range:'Historical',hex:'#454C1C'},
  {name:'White',brand:'Vallejo',range:'Model Color',hex:'#FFFFFF'},
  {name:'Black',brand:'Vallejo',range:'Model Color',hex:'#231C1D'}
 ];
 const first=document.getElementById('mix-paint-a'),second=document.getElementById('mix-paint-b');
 for(const select of [first,second]){
  for(const brand of [...new Set(paints.map(paint=>paint.brand))]){
   const group=document.createElement('optgroup');group.label=brand;
   paints.forEach((paint,index)=>{if(paint.brand===brand){const option=document.createElement('option');option.value=String(index);option.textContent=paint.name;group.append(option);}});
   select.append(group);
  }
 }
 first.value='0';second.value='4';
 document.getElementById('mix-demo-controls').hidden=false;
 const updateMix=()=>{
  const parts=Number(ratio.value),a=paints[Number(first.value)],b=paints[Number(second.value)];
  const rgb=paint=>paint.hex.slice(1).match(/../g).map(channel=>parseInt(channel,16));
  const secondRGB=rgb(b);
  const hex='#'+rgb(a).map((channel,index)=>Math.round((channel*parts+secondRGB[index])/(parts+1)).toString(16).padStart(2,'0')).join('').toUpperCase();
  for(const [id,paint]of [['a',a],['b',b]]){
   document.getElementById('paint-'+id+'-swatch').style.setProperty('--swatch',paint.hex);
   document.getElementById('paint-'+id+'-name').textContent=paint.name;
   document.getElementById('paint-'+id+'-range').textContent=paint.brand+' · '+paint.range;
  }
  document.getElementById('blue-parts').textContent=parts+' '+(parts===1?'part':'parts');
  document.getElementById('mix-ratio-value').value=parts+' : 1';
  document.getElementById('mixed-swatch').style.setProperty('--mixed',hex);
  document.getElementById('mixed-hex').textContent=hex;
  ratio.setAttribute('aria-valuetext',parts+' parts '+a.brand+' '+a.name+' to 1 part '+b.brand+' '+b.name);
 };
 first.addEventListener('change',updateMix);second.addEventListener('change',updateMix);
 ratio.addEventListener('input',updateMix);updateMix();
}
